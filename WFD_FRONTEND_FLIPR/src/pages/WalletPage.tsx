// WalletPage.tsx
import React, { useState } from "react";
import {
  Grid, Card, CardContent, Typography, Button, Modal, Box, TextField, Select, MenuItem, InputLabel, FormControl
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// import { v4 as uuidv4 } from 'uuid'; // for unique id generation

interface Wallet {
  id: string;
  name: string;
  type: string;
  balance: number;
}

const WalletPage: React.FC = () => {
  const [wallets, setWallets] = useState<Wallet[]>([]); // Wallet list state
  const [openModal, setOpenModal] = useState(false); // Modal state
  const [formMode, setFormMode] = useState<"create" | "edit">("create"); // Create or Edit mode
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null); // Current wallet being edited
  const [formValues, setFormValues] = useState<Wallet>({
    id: "",
    name: "",
    type: "cash",
    balance: 0,
  }); // Form state

  const handleOpenModal = (mode: "create" | "edit", wallet?: Wallet) => {
    setFormMode(mode);
    if (wallet) {
      setSelectedWallet(wallet);
      setFormValues(wallet);
    } else {
      setFormValues({ id: "", name: "", type: "cash", balance: 0 });
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedWallet(null);
  };

  const handleDeleteWallet = (walletId: string) => {
    if (window.confirm("Are you sure you want to delete this wallet? This action cannot be undone.")) {
      setWallets(wallets.filter((wallet) => wallet.id !== walletId));
    }
  };

  const handleSubmit = () => {
    if (formMode === "create") {
      setWallets([...wallets, { ...formValues, id: uuidv4() }]);
    } else if (formMode === "edit" && selectedWallet) {
      setWallets(wallets.map((wallet) => (wallet.id === selectedWallet.id ? formValues : wallet)));
    }
    handleCloseModal();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name as string]: value,
    }));
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Wallet Management
      </Typography>

      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => handleOpenModal("create")}
        style={{ marginBottom: "20px" }}
      >
        Add New Wallet
      </Button>

      <Grid container spacing={3}>
        {wallets.map((wallet) => (
          <Grid item xs={12} sm={6} md={4} key={wallet.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{wallet.name}</Typography>
                <Typography variant="body2">Type: {wallet.type}</Typography>
                <Typography variant="body2">Balance: ${wallet.balance}</Typography>
                <Box display="flex" justifyContent="space-between" marginTop="10px">
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() => handleOpenModal("edit", wallet)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteWallet(wallet.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal for Create/Edit Wallet */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            {formMode === "create" ? "Create New Wallet" : "Edit Wallet"}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Wallet Name"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Type</InputLabel>
              <Select
                name="type"
                value={formValues.type}
                onChange={handleChange}
              >
                <MenuItem value="cash">Cash</MenuItem>
                <MenuItem value="bank account">Bank Account</MenuItem>
                <MenuItem value="credit card">Credit Card</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Initial Balance"
              name="balance"
              type="number"
              value={formValues.balance}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <Box display="flex" justifyContent="flex-end" marginTop="20px">
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                {formMode === "create" ? "Create" : "Update"}
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default WalletPage;
