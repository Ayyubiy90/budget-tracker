import React from "react"; // Importing React library to use its features
import { BudgetProvider } from "./context/BudgetContext"; // Importing BudgetProvider to manage budget state
import Dashboard from "./components/Dashboard"; // Importing Dashboard component to display budget overview
import TransactionForm from "./components/TransactionForm"; // Importing TransactionForm to add new transactions
import TransactionList from "./components/TransactionList"; // Importing TransactionList to display recent transactions
import { Wallet } from "lucide-react"; // Importing Wallet icon from lucide-react for UI
import { useTheme } from "./hooks/useTheme"; // Importing the useTheme hook

// Main App component
function App() {
  const { theme, setTheme } = useTheme(); // Using the useTheme hook

  return (
    // Wrapping the entire application in BudgetProvider to provide budget context to all components
    <BudgetProvider>
      <div className={`min-h-screen bg-gray-100 ${theme}`}>
        {" "}
        {/* Apply the theme class */}
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <Wallet className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  Personal Budget Tracker
                </span>
              </div>
              {/* Theme toggle button */}
              <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="ml-4 p-2 bg-gray-200 rounded">
                Toggle Theme
              </button>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            <Dashboard />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <h2 className="text-lg font-semibold mb-4">Add Transaction</h2>
                <TransactionForm />
              </div>
              <div className="lg:col-span-2">
                <h2 className="text-lg font-semibold mb-4">
                  Recent Transactions
                </h2>
                <TransactionList />
              </div>
            </div>
          </div>
        </main>
      </div>
    </BudgetProvider>
  );
}

export default App; // Exporting the App component for use in other parts of the application
