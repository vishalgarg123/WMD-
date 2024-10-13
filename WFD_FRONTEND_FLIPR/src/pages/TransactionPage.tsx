import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import moment from "moment";

// Define the structure for a transaction
interface Transaction {
  _id: string;
  amount: number;
  type: string;
  category: string;
  date: string;
  notes: string;
}

// Define the structure for form data
interface FormData {
  amount: string;
  type: string;
  category: string;
  date: string;
  notes: string;
}

const TransactionPage: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [allTransaction, setAllTransaction] = useState<Transaction[]>([]);
  const [frequency, setFrequency] = useState<string>("7");
  const [type, setType] = useState<string>("all");
  const [editTable, setEditTable] = useState<Transaction | null>(null);
  const [formData, setFormData] = useState<FormData>({
    amount: '',
    type: '',
    category: '',
    date: '',
    notes: '',
  });

  const getAuthToken = () => {
    const user = JSON.parse(localStorage.getItem("user") || '{}');
    return user?.token;
  };

  const getAllTransactions = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/api/transactions", {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
        params: {
          frequency,
          type,
        },
      });
      setAllTransaction(res.data.transactions); // Adjusted to access transactions directly
    } catch (error) {
      console.error("Fetch issue with transaction", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllTransactions();
  }, [frequency, type]);

  const handleDelete = async (record: Transaction) => {
    try {
      setLoading(true);
      await axios.delete("http://localhost:3000/api/transactions", {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
        data: { transactionId: record._id },
      });
      await getAllTransactions();
    } catch (error) {
      console.error("Delete issue", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const userId = JSON.parse(localStorage.getItem("user") || '{}')._id;

      const requestData = {
        ...formData,
        userId,
      };

      if (editTable) {
        await axios.put(
          "http://localhost:3000/api/transactions",
          {
            transactionId: editTable._id,
            payload: requestData,
          },
          {
            headers: {
              Authorization: `Bearer ${getAuthToken()}`,
            },
          }
        );
      } else {
        await axios.post(
          "http://localhost:3000/api/transactions",
          requestData,
          {
            headers: {
              Authorization: `Bearer ${getAuthToken()}`,
            },
          }
        );
      }

      setShowModal(false);
      setEditTable(null);
      setFormData({
        amount: '',
        type: '',
        category: '',
        date: '',
        notes: '',
      });
      await getAllTransactions();
    } catch (error) {
      console.error("Failed to add/update transaction", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (record: Transaction) => {
    setEditTable(record);
    setFormData({
      amount: record.amount.toString(),
      type: record.type,
      category: record.category,
      date: moment(record.date).format("YYYY-MM-DD"),
      notes: record.notes || "",
    });
    setShowModal(true);
  };

  return (
    <Box p={2}>
      {loading && <CircularProgress />}
      <Box display="flex" justifyContent="space-between" flexWrap="wrap" mb={2}>
        <FormControl variant="outlined" sx={{ minWidth: 120, mb: 1 }}>
          <InputLabel>Frequency</InputLabel>
          <Select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            label="Frequency"
          >
            <MenuItem value="7">Last 1 week</MenuItem>
            <MenuItem value="30">Last 1 month</MenuItem>
            <MenuItem value="365">Last 1 year</MenuItem>
            <MenuItem value="custom">Custom</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" sx={{ minWidth: 120, mb: 1 }}>
          <InputLabel>Type</InputLabel>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value)}
            label="Type"
          >
            <MenuItem value="all">ALL</MenuItem>
            <MenuItem value="income">INCOME</MenuItem>
            <MenuItem value="expense">EXPENSE</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          onClick={() => {
            setEditTable(null); // Reset editing state
            setShowModal(true);
          }}
          sx={{ mb: 1 }}
        >
          Add New
        </Button>
      </Box>

      <TableContainer>
        <Table sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allTransaction.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{moment(row.date).format("YYYY-MM-DD")}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(row)}>Edit</Button>
                  <Button onClick={() => handleDelete(row)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box
          sx={{
            padding: 4,
            backgroundColor: 'white',
            width: { xs: '90%', sm: '400px' },
            margin: 'auto',
            mt: '15%',
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <h2>{editTable ? "Edit Transaction" : "Add Transaction"}</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Amount"
              name="amount"
              type="number"
              fullWidth
              margin="normal"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Type</InputLabel>
              <Select
                name="type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <MenuItem value="income">Income</MenuItem>
                <MenuItem value="expense">Expense</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <MenuItem value="salary">Salary</MenuItem>
                <MenuItem value="gifts">Gifts</MenuItem>
                <MenuItem value="bills">Bills</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Date"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
            <TextField
              label="Notes"
              name="notes"
              fullWidth
              margin="normal"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {editTable ? "Update" : "Add"}
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default TransactionPage;

