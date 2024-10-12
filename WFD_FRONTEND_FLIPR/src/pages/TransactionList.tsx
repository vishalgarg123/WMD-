// // TransactionList.tsx
// import React from 'react';
// import { Transaction } from './TransactionForm';

// interface TransactionListProps {
//   transactions: Transaction[];
//   onEdit: (transaction: Transaction) => void;
//   onDelete: (id: number) => void;
// }

// const TransactionList: React.FC<TransactionListProps> = ({ transactions, onEdit, onDelete }) => {
//   return (
//     <ul style={styles.list}>
//       {transactions.length === 0 ? (
//         <li>No transactions available.</li>
//       ) : (
//         transactions.map((transaction) => (
//           <li key={transaction.id} style={styles.listItem}>
//             <span>{transaction.amount} - {transaction.date} - {transaction.category}</span>
//             <button onClick={() => onEdit(transaction)} style={styles.editButton}>Edit</button>
//             <button onClick={() => onDelete(transaction.id)} style={styles.deleteButton}>Delete</button>
//           </li>
//         ))
//       )}
//     </ul>
//   );
// };

// const styles = {
//   list: {
//     listStyleType: 'none' as 'none',
//     padding: 0,
//   },
//   listItem: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: '10px',
//     borderBottom: '1px solid #ccc',
//   },
//   editButton: {
//     marginLeft: '10px',
//     padding: '5px',
//     backgroundColor: '#ffc107',
//     color: '#fff',
//     border: 'none',
//     cursor: 'pointer',
//   },
//   deleteButton: {
//     marginLeft: '10px',
//     padding: '5px',
//     backgroundColor: '#dc3545',
//     color: '#fff',
//     border: 'none',
//     cursor: 'pointer',
//   },
// };

// export default TransactionList;
