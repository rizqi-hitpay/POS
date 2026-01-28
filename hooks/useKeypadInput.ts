import { useState, useCallback, useMemo } from 'react';

export type Operator = '+' | '-' | '*' | '/';

interface CalculatorState {
  firstOperand: number;
  operator: Operator | null;
  secondOperand: number;
  isEnteringSecond: boolean;
  hasCompletedOperation: boolean; // Track if user finished entering second operand
}

interface UseKeypadInputReturn {
  cents: number;
  expression: string | null;
  currentOperator: Operator | null;
  handleDigit: (digit: string) => void;
  handleClear: () => void;
  handleBackspace: () => void;
  handleCalc: () => void;
  handleSelectOperator: (operator: Operator) => void;
}

// Map operators to display symbols
const operatorSymbols: Record<Operator, string> = {
  '+': '+',
  '-': '−',
  '*': '×',
  '/': '÷',
};

// Helper function to calculate result
function calculateResult(first: number, operator: Operator, second: number): number {
  switch (operator) {
    case '+':
      return first + second;
    case '-':
      return Math.max(0, first - second);
    case '*':
      // For multiplication: $5.00 * 2.00 = $10.00
      // 500 cents * 200 cents / 100 = 1000 cents
      return Math.round((first * second) / 100);
    case '/':
      // For division: $10.00 / 2.00 = $5.00
      // 1000 cents * 100 / 200 cents = 500 cents
      if (second === 0) return first;
      return Math.round((first * 100) / second);
    default:
      return first;
  }
}

export default function useKeypadInput(): UseKeypadInputReturn {
  const [calcState, setCalcState] = useState<CalculatorState>({
    firstOperand: 0,
    operator: null,
    secondOperand: 0,
    isEnteringSecond: false,
    hasCompletedOperation: false,
  });

  // Calculate the total cents based on the operation
  const cents = useMemo(() => {
    const { firstOperand, operator, secondOperand } = calcState;
    if (!operator) {
      return firstOperand;
    }
    return calculateResult(firstOperand, operator, secondOperand);
  }, [calcState]);

  // Generate the expression string (e.g., "5+1")
  const expression = useMemo(() => {
    const { firstOperand, operator, secondOperand, isEnteringSecond } = calcState;
    if (!operator) {
      return null;
    }
    const first = (firstOperand / 100).toFixed(2).replace(/\.?0+$/, '') || '0';
    const second = isEnteringSecond
      ? (secondOperand / 100).toFixed(2).replace(/\.?0+$/, '') || '0'
      : '0';
    const symbol = operatorSymbols[operator];
    return `${first}${symbol}${second}`;
  }, [calcState]);

  const handleDigit = useCallback((digit: string) => {
    setCalcState((prev) => {
      const digitValue = parseInt(digit, 10);

      if (prev.isEnteringSecond) {
        // Entering second operand
        const newSecond = prev.secondOperand * 10 + digitValue;
        if (newSecond > 99999999) return prev;
        return {
          ...prev,
          secondOperand: newSecond,
          hasCompletedOperation: true, // Mark that user has entered digits for second operand
        };
      } else {
        // Entering first operand
        const newFirst = prev.firstOperand * 10 + digitValue;
        if (newFirst > 99999999) return prev;
        return { ...prev, firstOperand: newFirst };
      }
    });
  }, []);

  const handleClear = useCallback(() => {
    setCalcState({
      firstOperand: 0,
      operator: null,
      secondOperand: 0,
      isEnteringSecond: false,
      hasCompletedOperation: false,
    });
  }, []);

  const handleBackspace = useCallback(() => {
    setCalcState((prev) => {
      if (prev.isEnteringSecond) {
        const newSecond = Math.floor(prev.secondOperand / 10);
        // If second operand becomes 0 and we backspace, remove operator
        if (newSecond === 0 && prev.secondOperand < 10) {
          return {
            ...prev,
            operator: null,
            secondOperand: 0,
            isEnteringSecond: false,
            hasCompletedOperation: false,
          };
        }
        return { ...prev, secondOperand: newSecond };
      } else {
        return { ...prev, firstOperand: Math.floor(prev.firstOperand / 10) };
      }
    });
  }, []);

  // Helper to apply operator with chaining support
  const applyOperator = useCallback((prev: CalculatorState, newOperator: Operator): CalculatorState => {
    // If no first operand and no existing operation, do nothing
    if (prev.firstOperand === 0 && !prev.operator) {
      return prev;
    }

    // If there's a completed operation, calculate the result and chain
    if (prev.operator && prev.hasCompletedOperation) {
      const result = calculateResult(prev.firstOperand, prev.operator, prev.secondOperand);
      return {
        firstOperand: result,
        operator: newOperator,
        secondOperand: 0,
        isEnteringSecond: true,
        hasCompletedOperation: false,
      };
    }

    // No existing operation or not completed, just set/change the operator
    return {
      ...prev,
      operator: newOperator,
      isEnteringSecond: true,
    };
  }, []);

  // Toggle between + and - operations (short press)
  const handleCalc = useCallback(() => {
    setCalcState((prev) => {
      // If no first operand, do nothing
      if (prev.firstOperand === 0 && !prev.operator) {
        return prev;
      }

      // If there's a completed operation, chain with + operator
      if (prev.operator && prev.hasCompletedOperation) {
        return applyOperator(prev, '+');
      }

      if (!prev.operator) {
        // Start with + operator
        return {
          ...prev,
          operator: '+',
          isEnteringSecond: true,
        };
      } else {
        // Toggle between + and -
        return {
          ...prev,
          operator: prev.operator === '+' ? '-' : '+',
        };
      }
    });
  }, [applyOperator]);

  // Select a specific operator (from action sheet)
  const handleSelectOperator = useCallback((operator: Operator) => {
    setCalcState((prev) => applyOperator(prev, operator));
  }, [applyOperator]);

  return {
    cents,
    expression,
    currentOperator: calcState.operator,
    handleDigit,
    handleClear,
    handleBackspace,
    handleCalc,
    handleSelectOperator,
  };
}
