// Import the Transaction type from the budget types module
import { Transaction } from '../types/budgets';
// Import the format function from the date-fns library for date formatting
import { format } from 'date-fns';

// Define a function named exportToCSV that takes an array of Transaction objects as input
export function exportToCSV(transactions: Transaction[]): void {
  // Check if there are any transactions to export
  if (transactions.length === 0) {
    alert("No transactions available to export."); // Alert the user if there are no transactions
    return; // Exit the function early
  }

  // Define the headers for the CSV file
  const headers = ['Date', 'Type', 'Category', 'Amount', 'Description'];

  // Create the CSV content by combining headers and formatted transaction data
  const csvContent = [
    headers.join(','), // Join the headers array into a single string, separated by commas
    ...transactions.map(t => [
      format(new Date(t.date), 'yyyy-MM-dd'), // Format the transaction date to 'yyyy-MM-dd' format
      t.type, // Include the transaction type
      t.category, // Include the transaction category
      t.amount, // Include the transaction amount
      `"${t.description}"` // Include the transaction description, wrapped in quotes to handle commas in text
    ].join(',')) // Join the individual transaction fields into a single CSV row
  ].join('\n'); // Join all rows with a newline character to create the final CSV content

  // Create a new Blob object containing the CSV content, specifying the MIME type
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  // Create a new anchor (<a>) element to facilitate the download
  const link = document.createElement('a');
  // Create a URL for the Blob object
  const url = URL.createObjectURL(blob);
  // Set the href attribute of the link to the Blob URL
  link.setAttribute('href', url);
  // Set the download attribute of the link with a filename that includes the current date
  link.setAttribute('download', `transactions-${format(new Date(), 'yyyy-MM-dd')}.csv`);
  // Append the link to the document body (required for the link to work)
  document.body.appendChild(link);
  // Programmatically click the link to trigger the download
  link.click();
  // Remove the link from the document body after the download is triggered
  document.body.removeChild(link);
}