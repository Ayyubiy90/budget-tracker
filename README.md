# 📊 Personal Budget Tracker

A modern, feature-rich budget tracking application built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- ➕ Add/edit/delete income and expense transactions
- 🗂️ Categorize transactions
- 💰 Real-time balance calculation
- 📈 Interactive charts
- 🌙 Dark/light theme support
- 📤 Export data to CSV
- ☁️ Firebase cloud sync
- 💱 Multiple currency support
- 🔄 Recurring transactions
- ⚠️ Budget alerts/notifications

## 🛠️ Running the Application

1. Clone the repository:
   ```bash
   git clone https://github.com/Ayyubiy90/budget-tracker.git

   cd personal-budget-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Firebase:
   - Create a Firebase project at https://console.firebase.google.com/
   - Enable Authentication and Firestore
   - Copy your Firebase config from Project Settings
   - Update `src/config/firebase.ts` with your config

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## 🌍 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 🛠️ Technologies Used

- React
- TypeScript
- Tailwind CSS
- Firebase
- Recharts
- React Hook Form
- Currency.js

## 📁 Project Structure
```
src/
├── components/
│   ├── dashboard.tsx
│   ├── TransactionForm.tsx
│   └── TransactionList.tsx
├── config/
│   └── firebase.ts
├── context/
│   ├── BudgetContext.tsx
│   └── useBudget.ts
├── hooks/
│   └── useTheme.ts
├── types/
│   └── budgets.ts
├── utils/
│   ├── currency.ts
│   └── export.ts
├── .env (not pushed to repo)
├── .gitignore
├── eslint.config.js
├── index.html
├── LICENSE
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

📜 License

MIT