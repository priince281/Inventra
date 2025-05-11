import { useState } from 'react';
import { 
  Box, Button, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Typography, Stack 
} from '@mui/material';
import { Add, Download } from '@mui/icons-material';
import { exportToPDF, exportToExcel } from '../utils/exportUtils';

export default function Categories() {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Electronics', products: 24 },
    { id: 2, name: 'Furniture', products: 15 },
    { id: 3, name: 'Office Supplies', products: 32 }
  ]);

  const handleExportPDF = () => exportToPDF(categories, 'categories', ['ID', 'Name', 'Products']);
  const handleExportExcel = () => exportToExcel(categories, 'categories');

  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight="bold">Categories</Typography>
        <Box>
          <Button variant="contained" startIcon={<Add />} sx={{ mr: 2 }}>
            Add Category
          </Button>
          <Button variant="outlined" startIcon={<Download />} onClick={handleExportPDF} sx={{ mr: 2 }}>
            PDF
          </Button>
          <Button variant="outlined" startIcon={<Download />} onClick={handleExportExcel}>
            Excel
          </Button>
        </Box>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: 'primary.main' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>ID</TableCell>
              <TableCell sx={{ color: 'white' }}>Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Products</TableCell>
              <TableCell sx={{ color: 'white' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.products}</TableCell>
                <TableCell>
                  {/* Admin-only actions would go here */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}