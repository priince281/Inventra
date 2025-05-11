import { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Button, IconButton, Dialog, DialogTitle, DialogContent, 
  DialogActions, TextField, Box, Stack
} from '@mui/material';
import { Edit, Delete, Add, Download } from '@mui/icons-material';
import { exportToPDF, exportToExcel } from '../utils/exportUtils'; // Custom export functions

export default function Suppliers() {
  // Sample supplier data
  const [suppliers, setSuppliers] = useState([
    { id: 1, name: 'TechGadgets Inc.', address: '789 Industrial Park', 
      email: 'sales@techgadgets.com', contact: '555-9012', products: 'Electronics' },
    { id: 2, name: 'OfficeSolutions Ltd.', address: '321 Business Ave', 
      email: 'info@officesol.com', contact: '555-3456', products: 'Furniture' },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [currentSupplier, setCurrentSupplier] = useState(null);

  // Dialog handlers
  const handleOpenDialog = (supplier = null) => {
    setCurrentSupplier(supplier || { 
      id: '', name: '', address: '', email: '', contact: '', products: '' 
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => setOpenDialog(false);

  // CRUD operations
  const handleSaveSupplier = () => {
    if (currentSupplier.id) {
      setSuppliers(suppliers.map(s => 
        s.id === currentSupplier.id ? currentSupplier : s
      ));
    } else {
      setSuppliers([...suppliers, {
        ...currentSupplier,
        id: Math.max(...suppliers.map(s => s.id), 0) + 1
      }]);
    }
    handleCloseDialog();
  };

  const handleDeleteSupplier = (id) => {
    setSuppliers(suppliers.filter(supplier => supplier.id !== id));
  };

  // Export functions
  const handleExportPDF = () => {
    exportToPDF(suppliers, 'suppliers_list', ['ID', 'Name', 'Address', 'Email', 'Contact', 'Products']);
  };

  const handleExportExcel = () => {
    exportToExcel(suppliers, 'suppliers_list');
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      {/* Header and Action Buttons */}
      <Stack 
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems="center"
        spacing={3}
        sx={{ mb: 4 }}
      >
        <h2>Suppliers</h2>
        
        <Box>
          <Button 
            variant="contained" 
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
            sx={{ mr: 2 }}
          >
            Add Supplier
          </Button>
          
          <Button 
            variant="outlined" 
            startIcon={<Download />}
            onClick={handleExportPDF}
            sx={{ mr: 2 }}
          >
            Export as PDF
          </Button>
          
          <Button 
            variant="outlined" 
            startIcon={<Download />}
            onClick={handleExportExcel}
          >
            Export as Excel
          </Button>
        </Box>
      </Stack>

      {/* Suppliers Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: 'primary.main' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>ID</TableCell>
              <TableCell sx={{ color: 'white' }}>Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Address</TableCell>
              <TableCell sx={{ color: 'white' }}>Email</TableCell>
              <TableCell sx={{ color: 'white' }}>Contact</TableCell>
              <TableCell sx={{ color: 'white' }}>Products</TableCell>
              <TableCell sx={{ color: 'white' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suppliers.map((supplier) => (
              <TableRow key={supplier.id}>
                <TableCell>{supplier.id}</TableCell>
                <TableCell>{supplier.name}</TableCell>
                <TableCell>{supplier.address}</TableCell>
                <TableCell>{supplier.email}</TableCell>
                <TableCell>{supplier.contact}</TableCell>
                <TableCell>{supplier.products}</TableCell>
                <TableCell>
                  <IconButton 
                    color="primary" 
                    onClick={() => handleOpenDialog(supplier)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton 
                    color="error" 
                    onClick={() => handleDeleteSupplier(supplier.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {currentSupplier?.id ? 'Edit Supplier' : 'Add New Supplier'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              name="name"
              label="Supplier Name"
              value={currentSupplier?.name || ''}
              onChange={(e) => setCurrentSupplier({...currentSupplier, name: e.target.value})}
              fullWidth
            />
            <TextField
              name="address"
              label="Address"
              value={currentSupplier?.address || ''}
              onChange={(e) => setCurrentSupplier({...currentSupplier, address: e.target.value})}
              fullWidth
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              value={currentSupplier?.email || ''}
              onChange={(e) => setCurrentSupplier({...currentSupplier, email: e.target.value})}
              fullWidth
            />
            <TextField
              name="contact"
              label="Contact"
              value={currentSupplier?.contact || ''}
              onChange={(e) => setCurrentSupplier({...currentSupplier, contact: e.target.value})}
              fullWidth
            />
            <TextField
              name="products"
              label="Products Supplied"
              value={currentSupplier?.products || ''}
              onChange={(e) => setCurrentSupplier({...currentSupplier, products: e.target.value})}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveSupplier} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}