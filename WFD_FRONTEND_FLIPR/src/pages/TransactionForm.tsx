// // TransactionForm.tsx
// import React, { useState } from 'react';

// export interface Transaction {
//   id: number;
//   amount: number;
//   date: string;
//   category: string;
//   notes: string;
// }

// interface TransactionFormProps {
//   onSubmit: (transaction: Transaction) => void;
// }

// const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit }) => {
//   const [amount, setAmount] = useState<number>(0);
//   const [date, setDate] = useState<string>('');
//   const [category, setCategory] = useState<string>('');
//   const [notes, setNotes] = useState<string>('');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Form submission logic will go here later
//     console.log('Transaction added:', { amount, date, category, notes });
//   };

//   return (
//     <form onSubmit={handleSubmit} style={styles.form}>
//       <input
//         type="number"
//         value={amount}
//         onChange={(e) => setAmount(Number(e.target.value))}
//         placeholder="Amount"
//         required
//         style={styles.input}
//       />
//       <input
//         type="date"
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//         required
//         style={styles.input}
//       />
//       <input
//         type="text"
//         value={category}
//         onChange={(e) => setCategory(e.target.value)}
//         placeholder="Category"
//         required
//         style={styles.input}
//       />
//       <textarea
//         value={notes}
//         onChange={(e) => setNotes(e.target.value)}
//         placeholder="Notes"
//         style={styles.textarea}
//       />
//       <button type="submit" style={styles.button}>Add Transaction</button>
//     </form>
//   );
// };

// const styles = {
//   form: {
//     display: 'flex',
//     flexDirection: 'column' as 'column',
//     gap: '10px',
//   },
//   input: {
//     padding: '8px',
//     borderRadius: '4px',
//     border: '1px solid #ccc',
//   },
//   textarea: {
//     padding: '8px',
//     borderRadius: '4px',
//     border: '1px solid #ccc',
//     resize: 'none',
//   },
//   button: {
//     padding: '10px',
//     borderRadius: '4px',
//     border: 'none',
//     backgroundColor: '#007BFF',
//     color: '#fff',
//     cursor: 'pointer',
//   },
// };

// export default TransactionForm;
