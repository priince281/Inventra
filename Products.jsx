import { useState } from 'react';
import { 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow, 
  Paper, 
  Stack, 
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';
import { Download, Add, Edit, Delete } from '@mui/icons-material';

export default function Products() {
  // Sample product data
  const initialProducts = [
    { id: 1, name: 'Laptop', qty: 15, price: 999.99, category: 'Electronics' },
    { id: 2, name: 'Smartphone', qty: 32, price: 699.99, category: 'Electronics' },
    { id: 3, name: 'Desk Chair', qty: 8, price: 149.99, category: 'Furniture' },
    { id: 4, name: 'Coffee Mug', qty: 45, price: 12.99, category: 'Kitchen' },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [categories] = useState(['Electronics', 'Furniture', 'Kitchen', 'Office Supplies']);

  const handleOpenAddDialog = () => {
    setCurrentProduct({
      id: products.length + 1,
      name: '',
      qty: 0,
      price: 0,
      category: ''
    });
    setOpenDialog(true);
  };

  const handleOpenEditDialog = (product) => {
    setCurrentProduct({ ...product });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentProduct(null);
  };

  const handleSaveProduct = () => {
    if (currentProduct.id > products.length) {
      // Add new product
      setProducts([...products, currentProduct]);
    } else {
      // Update existing product
      setProducts(products.map(p => 
        p.id === currentProduct.id ? currentProduct : p
      ));
    }
    handleCloseDialog();
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({
      ...currentProduct,
      [name]: name === 'price' || name === 'qty' ? parseFloat(value) || 0 : value
    });
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      {/* Action Buttons */}
      <Stack 
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems="center"
        spacing={3}
        sx={{ mb: 4 }}
      >
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<Add />}
          onClick={handleOpenAddDialog}
          sx={{ minWidth: 200 }}
        >
          ADD NEW PRODUCT
        </Button>

        <Box>
          <Button 
            variant="outlined" 
            startIcon={<Download />}
            sx={{ mr: 3, minWidth: 180 }}
          >
            EXPORT AS PDF
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<Download />}
            sx={{ minWidth: 180 }}
          >
            EXPORT AS EXCEL
          </Button>
        </Box>
      </Stack>

      {/* Product Table */}
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: 'primary.main' }}>
            <TableCell sx={{ color: 'white' }}>ID</TableCell>
            <TableCell sx={{ color: 'white' }}>NAME</TableCell>
            <TableCell sx={{ color: 'white' }}>QUANTITY</TableCell>
            <TableCell sx={{ color: 'white' }}>PRICE</TableCell>
            <TableCell sx={{ color: 'white' }}>CATEGORY</TableCell>
            <TableCell sx={{ color: 'white' }}>ACTION</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.qty}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>
                <Button 
                  size="small" 
                  color="primary" 
                  startIcon={<Edit />}
                  onClick={() => handleOpenEditDialog(product)}
                  sx={{ mr: 1 }}
                >
                  EDIT
                </Button>
                <Button 
                  size="small" 
                  color="error" 
                  startIcon={<Delete />}
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  DELETE
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add/Edit Product Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {currentProduct && currentProduct.id > products.length ? 'Add New Product' : 'Edit Product'}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Product Name"
            name="name"
            fullWidth
            value={currentProduct?.name || ''}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              label="Quantity"
              name="qty"
              type="number"
              fullWidth
              value={currentProduct?.qty || 0}
              onChange={handleInputChange}
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              fullWidth
              value={currentProduct?.price || 0}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: '$',
              }}
            />
          </Box>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={currentProduct?.category || ''}
              label="Category"
              onChange={handleInputChange}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveProduct} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}