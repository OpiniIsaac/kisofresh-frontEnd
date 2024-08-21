 "use client"
import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Card, CardContent, CardActions } from '@mui/material';
import swal from 'sweetalert';

const AdminQuoteManager = () => {
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [markupPercentage, setMarkupPercentage] = useState<number>(10);
  const [markupAmount, setMarkupAmount] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [notes, setNotes] = useState<string>('');

  useEffect(() => {
    if (selectedQuote) {
      calculateMarkup(selectedQuote.initialPrice);
    }
  }, [markupPercentage, selectedQuote]);

  const calculateMarkup = (initialPrice: number) => {
    const markup = (markupPercentage / 100) * initialPrice;
    setMarkupAmount(markup);
    setTotalCost(initialPrice + markup);
  };

  const handleAcceptQuote = async () => {
    try {
      // Send updated quote details to the backend
      await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...selectedQuote,
          markupPercentage,
          markupAmount,
          totalCost,
          notes,
          status: 'accepted',
        }),
      });

      swal({
        title: "Quote Accepted",
        text: "The quote has been accepted successfully.",
        icon: "success",
      });

      // Reset the form or fetch the next quote
    } catch (error) {
      swal({
        title: "Error",
        text: "There was an error accepting the quote.",
        icon: "error",
      });
    }
  };

  const handleRejectQuote = async () => {
    try {
      await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...selectedQuote,
          status: 'rejected',
        }),
      });

      swal({
        title: "Quote Rejected",
        text: "The quote has been rejected.",
        icon: "success",
      });

      // Reset the form or fetch the next quote
    } catch (error) {
      swal({
        title: "Error",
        text: "There was an error rejecting the quote.",
        icon: "error",
      });
    }
  };

  return (
    <div className="quote-manager-container">
      {selectedQuote ? (
        <Card>
          <CardContent>
            <Typography variant="h5">Quote Details</Typography>
            <Typography variant="body1">Crop: {selectedQuote.crop}</Typography>
            <Typography variant="body1">Quantity: {selectedQuote.quantity}</Typography>
            <Typography variant="body1">Initial Price: UGX {selectedQuote.initialPrice}</Typography>

            <TextField
              label="Markup Percentage"
              type="number"
              value={markupPercentage}
              onChange={(e) => setMarkupPercentage(parseFloat(e.target.value))}
              fullWidth
              margin="normal"
            />

            <Typography variant="body1">Markup Amount: UGX {markupAmount.toFixed(2)}</Typography>
            <Typography variant="h6">Total Cost: UGX {totalCost.toFixed(2)}</Typography>

            <TextField
              label="Additional Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              fullWidth
              multiline
              rows={4}
              margin="normal"
            />
          </CardContent>

          <CardActions>
            <Button color="primary" onClick={handleAcceptQuote}>
              Accept Quote
            </Button>
            <Button color="secondary" onClick={handleRejectQuote}>
              Reject Quote
            </Button>
          </CardActions>
        </Card>
      ) : (
        <Typography variant="h6">Select a quote to view details</Typography>
      )}
    </div>
  );
};

export default AdminQuoteManager;
