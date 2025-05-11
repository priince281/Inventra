import { useState, useEffect } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, Box, Avatar, Chip, Rating, Button, Stack
} from '@mui/material';
import { Download } from '@mui/icons-material';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

export default function ReviewsPage() {
  // Sample review data - replace with API call
  const [reviews, setReviews] = useState([
    {
      id: 'REV001',
      product: 'Wireless Keyboard',
      rating: 4.5,
      comment: 'Great keyboard but keys are a bit loud',
      reviewer: 'John D.',
      date: '2023-11-15',
      status: 'approved'
    },
    {
      id: 'REV002',
      product: 'Gaming Mouse',
      rating: 5,
      comment: 'Perfect for FPS games!',
      reviewer: 'Sarah M.',
      date: '2023-11-18',
      status: 'approved'
    },
    {
      id: 'REV003',
      product: 'Bluetooth Headphones',
      rating: 3,
      comment: 'Average sound quality',
      reviewer: 'Alex T.',
      date: '2023-11-20',
      status: 'pending'
    }
  ]);

  // Export to PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Product Reviews Report', 10, 10);
    doc.autoTable({
      head: [['ID', 'Product', 'Rating', 'Reviewer', 'Date', 'Status']],
      body: reviews.map(review => [
        review.id,
        review.product,
        review.rating,
        review.reviewer,
        new Date(review.date).toLocaleDateString(),
        review.status.toUpperCase()
      ]),
      startY: 20,
    });
    doc.save('product_reviews.pdf');
  };

  // Export to Excel
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(reviews);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reviews");
    XLSX.writeFile(workbook, "product_reviews.xlsx");
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      {/* Page Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 4
      }}>
        <Typography variant="h5" fontWeight="bold">
          Product Reviews
        </Typography>
        
        {/* Export Buttons */}
        <Stack direction="row" spacing={2}>
          <Button 
            variant="outlined" 
            startIcon={<Download />} 
            onClick={exportPDF}
          >
            PDF
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<Download />} 
            onClick={exportExcel}
          >
            Excel
          </Button>
        </Stack>
      </Box>

      {/* Reviews Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: 'primary.main' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>ID</TableCell>
              <TableCell sx={{ color: 'white' }}>Product</TableCell>
              <TableCell sx={{ color: 'white' }}>Rating</TableCell>
              <TableCell sx={{ color: 'white' }}>Review</TableCell>
              <TableCell sx={{ color: 'white' }}>Reviewer</TableCell>
              <TableCell sx={{ color: 'white' }}>Date</TableCell>
              <TableCell sx={{ color: 'white' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell>{review.id}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ 
                      bgcolor: 'primary.light', 
                      color: 'white', 
                      width: 32, 
                      height: 32, 
                      mr: 2,
                      fontSize: '0.875rem'
                    }}>
                      {review.product.charAt(0)}
                    </Avatar>
                    {review.product}
                  </Box>
                </TableCell>
                <TableCell>
                  <Rating 
                    value={review.rating} 
                    precision={0.5} 
                    readOnly 
                  />
                </TableCell>
                <TableCell sx={{ maxWidth: 300 }}>
                  <Typography variant="body2">
                    {review.comment}
                  </Typography>
                </TableCell>
                <TableCell>{review.reviewer}</TableCell>
                <TableCell>
                  {new Date(review.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Chip 
                    label={review.status} 
                    color={
                      review.status === 'approved' ? 'success' : 
                      review.status === 'pending' ? 'warning' : 'default'
                    }
                    size="small"
                    sx={{ textTransform: 'capitalize' }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}