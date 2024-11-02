// useBudget.ts
import { useContext } from "react";
import BudgetContext from "./BudgetContext"; // Adjust the path as necessary

// Hook to access the budget context
export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (context === undefined) {
    throw new Error("useBudget must be used within a BudgetProvider");
  }
  return context;
};