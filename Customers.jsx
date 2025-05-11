import { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, IconButton, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, Box
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';

export default function Customers() {
  // Sample customer data (replace with API calls)
  const [customers, setCustomers] = useState([
    { id: 1, name: 'John Doe', address: '123 Main St', email: 'john@example.com', contact: '555-1234' },
    { id: 2, name: 'Jane Smith', address: '456 Oak Ave', email: 'jane@example.com', contact: '555-5678' },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);

  // Handle dialog open/close
  const handleOpenDialog = (customer = null) => {
    setCurrentCustomer(customer || { id: '', name: '', address: '', email: '', contact: '' });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCustomer({ ...currentCustomer, [name]: value });
  };

  // Save customer (add or edit)
  const handleSaveCustomer = () => {
    if (currentCustomer.id) {
      // Edit existing customer
      setCustomers(customers.map(c => 
        c.id === currentCustomer.id ? currentCustomer : c
      ));
    } else {
      // Add new customer
      const newCustomer = {
        ...currentCustomer,
        id: Math.max(...customers.map(c => c.id), 0) + 1
      };
      setCustomers([...customers, newCustomer]);
    }
    handleCloseDialog();
  };

  // Delete customer
  const handleDeleteCustomer = (id) => {
    setCustomers(customers.filter(customer => customer.id !== id));
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      {/* Header and Add Button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <h2>Customers</h2>
        <Button 
  variant="contained" 
  startIcon={<Add />}
  onClick={() => handleOpenDialog()}
  sx={{ 
    // Size Controls:
    minWidth: 180,      // Minimum width
    height: 40,         // Fixed height
    padding: '8px 24px', // Vertical/Horizontal padding
    fontSize: '0.875rem', // Text size
    
    // Optional styling:
    borderRadius: '8px', // Corner radius
    textTransform: 'none', // Disables uppercase transformation
    fontWeight: 600,     // Bold text
  }}
>
  Add Customer
</Button>
      </Box>

      {/* Customers Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: 'primary.main' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>ID</TableCell>
              <TableCell sx={{ color: 'white' }}>Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Address</TableCell>
              <TableCell sx={{ color: 'white' }}>Email</TableCell>
              <TableCell sx={{ color: 'white' }}>Contact</TableCell>
              <TableCell sx={{ color: 'white' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.id}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.address}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.contact}</TableCell>
                <TableCell>
                  <IconButton 
                    color="primary" 
                    onClick={() => handleOpenDialog(customer)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton 
                    color="error" 
                    onClick={() => handleDeleteCustomer(customer.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Customer Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {currentCustomer?.id ? 'Edit Customer' : 'Add New Customer'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              name="name"
              label="Name"
              value={currentCustomer?.name || ''}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="address"
              label="Address"
              value={currentCustomer?.address || ''}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              value={currentCustomer?.email || ''}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="contact"
              label="Contact"
              value={currentCustomer?.contact || ''}
              onChange={handleInputChange}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveCustomer} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}