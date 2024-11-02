// App.tsx
import { BudgetProvider } from "./context/BudgetContext"; // Ensure this import is correct
import Dashboard from "./components/Dashboard"; // Import your components
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import { useTheme } from "./hooks/useTheme"; // Import the useTheme hook
import { Moon, Sun, Wallet } from "lucide-react"; // Import icons

function App() {
  const { theme, setTheme } = useTheme(); // Using the useTheme hook

  return (
    <BudgetProvider>
      {" "}
      {/* Wrap your application with BudgetProvider */}
      <div className={`min-h-screen bg-gray-100 ${theme}`}>
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
                {theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
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

export default App; // Exporting the App component
