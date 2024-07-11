import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography } from '@material-ui/core';

function ProductDetail() {
  const { id } = useParams();

  // In a real application, you would fetch the product details using the id
  // For now, we'll just display the id
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Product Detail</Typography>
        <Typography>Product ID: {id}</Typography>
        {/* Add more product details here */}
      </CardContent>
    </Card>
  );
}

export default ProductDetail;