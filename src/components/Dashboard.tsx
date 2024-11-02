// Importing React library for building the user interface
import React from "react";

// Importing the useBudget hook from the context to access budget-related data
import { useBudget } from "../context/useBudget";

// Importing a utility function to format currency amounts
import { formatAmount } from "../utils/currency";

// Importing necessary components from the recharts library to create a pie chart
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

// Importing icons from the lucide-react library for visual representation of financial data
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";

// Defining an array of colors to be used for pie chart slices
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Defining the Dashboard component as a functional React component
const Dashboard: React.FC = () => {
  // Using the useBudget hook to get the summary of the budget
  const { summary } = useBudget();

  // Preparing chart data by filtering budgets that have been spent
  const chartData = summary.budgets
    .filter((budget) => budget.spent > 0) // Only include budgets with spent amounts greater than 0
    .map((budget) => ({
      // Mapping to create an object for each budget with a capitalized category name and spent value
      name: budget.category.charAt(0).toUpperCase() + budget.category.slice(1), // Capitalizing the first letter of the category
      value: budget.spent, // Setting the spent amount as the value
    }));

  // Function to handle exporting data
  const handleExport = () => {
    const csvRows = [];
    // Create header row
    csvRows.push(["Category", "Spent", "Limit", "Alert Threshold"]);

    // Create data rows
    summary.budgets.forEach((budget) => {
      csvRows.push([
        budget.category,
        budget.spent,
        budget.limit,
        budget.alertThreshold,
      ]);
    });

    // Create a CSV string
    const csvString = csvRows.map((row) => row.join(",")).join("\n");

    // Create a blob and download it
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "budget_summary.csv");
    a.click();
    URL.revokeObjectURL(url);
  };

  // Returning the JSX for rendering the dashboard
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="col-span-1 md:col-span-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Balance Card */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Balance
              </h3>
              <Wallet className="text-primary-500" />
            </div>
            <p className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">
              {formatAmount(summary.balance, summary.currency)}
            </p>
          </div>
          {/* Income Card */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Income
              </h3>
              <TrendingUp className="text-green-500" />
            </div>
            <p className="text-2xl font-bold mt-2 text-green-600 dark:text-green-400">
              {formatAmount(summary.totalIncome, summary.currency)}
            </p>
          </div>
          {/* Expenses Card */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Expenses
              </h3>
              <TrendingDown className="text-red-500" />
            </div>
            <p className="text-2xl font-bold mt-2 text-red-600 dark:text-red-400">
              {formatAmount(summary.totalExpenses, summary.currency)}
            </p>
          </div>
        </div>
      </div>
      {/* Spending Distribution Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
          Spending Distribution
        </h3>
        <div className="h-64">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value">
                  {chartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) =>
                    formatAmount(value as number, summary.currency)
                  }
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
              No spending data to display
            </div>
          )}
        </div>
      </div>
      {/* Budget Overview */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
          Budget Overview
        </h3>
        <div className="space-y-4">
          {summary.budgets.map((budget) => (
            <div key={budget.category} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300 capitalize">
                  {budget.category}
                </span>
                <span className="text-gray-900 dark:text-white">
                  {formatAmount(budget.spent, budget.currency)} /{" "}
                  {formatAmount(budget.limit, budget.currency)}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    (budget.spent / budget.limit) * 100 > budget.alertThreshold
                      ? "bg-red-500"
                      : "bg-primary-500"
                  }`}
                  style={{
                    width: `${Math.min(
                      (budget.spent / budget.limit) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Export Button */}
      <button
        onClick={handleExport}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
        Export
      </button>
    </div>
  );
};

// Exporting the Dashboard component
export default Dashboard;
