"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { WithId, Document } from 'mongodb';
import { Card, Grid, TextField, Dialog, DialogTitle, DialogContent, DialogActions, FormLabel } from "@mui/material"; 
import { CircularProgress as Spinner } from '@mui/material'; 
import swal from 'sweetalert';


const QuoteDetails = ({ params }: { params: { id: string } }) => {
  const [quote, setQuote] = useState<WithId<Document> | null>(null);
  const [pricePerUnit, setPricePerUnit] = useState<number>(0);
  const [markupPercentage, setMarkupPercentage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [confirmAction, setConfirmAction] = useState<"accept" | "reject">("accept");

  // New state variables for calculated prices
  const [pricePerUnitWithMarkup, setPricePerUnitWithMarkup] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    if (!params.id) {
      console.error("No ID provided to fetch the quote");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/quotes/${params.id}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch quote with ID: ${params.id}`);
        }
        const data = await res.json();
        setQuote(data);
        setPricePerUnit(data.pricePerUnit || 0);
        setMarkupPercentage(data.markupPercentage || 0);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  // Calculate price per unit with markup and total price
  useEffect(() => {
    const calculatedPricePerUnitWithMarkup = pricePerUnit * (1 + markupPercentage / 100);
    setPricePerUnitWithMarkup(calculatedPricePerUnitWithMarkup);
    
    const calculatedTotalPrice = calculatedPricePerUnitWithMarkup * (quote?.quantity || 0);
    setTotalPrice(calculatedTotalPrice);
  }, [pricePerUnit, markupPercentage, quote]);

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/quotes/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pricePerUnit, markupPercentage, totalPrice, pricePerUnitWithMarkup }),
      });
  
      if (!response.ok) throw new Error('Failed to update quote');
  
      // Notify the user that the quote has been viewed
      const emailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: quote?.userEmail,
          subject: 'Quote Viewed',
          text: `Dear User,\n\nYour quote has been viewed and updated with the following details:\n- Price per Unit: ${pricePerUnit}\n- Markup Percentage: ${markupPercentage}%\n- Total Price: ${totalPrice}\n\nThank you,\nKisoIndex Team`,
        }),
      });
  
      if (!emailResponse.ok) throw new Error('Failed to send email');
  
      swal({
        title: "Success",
        text: "Quote updated successfully.",
        icon: "success",
      });
    } catch (error) {
      console.error('Error:', error);
      swal({
        title: "Error",
        text: "Failed to update the quote.",
        icon: "error",
      });
    }
  };
  
  
  const handleConfirm = async () => {
    try {
      const status = confirmAction === "accept" ? "accepted" : "rejected";
      const response = await fetch(`/api/quotes/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
  
      if (!response.ok) throw new Error(`Failed to ${confirmAction} the quote`);
  
      // Prepare email details based on the action
      const userEmail = quote?.userEmail;
      const emailSubject = confirmAction === "accept" ? 'Quote Accepted' : 'Quote Rejected';
      const emailText = `Dear User,

Your quote has been ${status}. Here are the details:
- Price per Unit: ${pricePerUnit}
- Markup Percentage: ${markupPercentage}%
- Total Price: ${totalPrice}

Thank you,
KisoIndex Team`;
  
      // Send email using the /api/send-email endpoint
      if (userEmail) {
        const emailResponse = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: userEmail,
            subject: emailSubject,
            text: emailText,
          }),
        });
  
        if (!emailResponse.ok) throw new Error('Failed to send email');
      }
  
      swal({
        title: "Success",
        text: `Quote ${confirmAction}ed successfully.`,
        icon: "success",
      });
      setShowConfirmModal(false);
    } catch (error) {
      console.error(`Error ${confirmAction}ing quote:`, error);
      swal({
        title: "Error",
        text: `Failed to ${confirmAction} the quote.`,
        icon: "error",
      });
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!quote) {
    return <div className="text-center text-xl">Quote not found.</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Quote Details</h1>
      <Card className="p-6 mb-6">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <div className="mb-4">
              <strong>Crop:</strong> {quote.crop}
            </div>
            <div className="mb-4">
              <strong>Country:</strong> {quote.country}
            </div>
            <div className="mb-4">
              <strong>Region:</strong> {quote.region}
            </div>
            <div className="mb-4">
              <strong>Quantity:</strong> {quote.quantity}
            </div>
            <div className="mb-4">
              <strong>Delivery Option:</strong> {quote.deliveryOption}
            </div>
            <div className="mb-4">
              <strong>Actual Price per Unit:</strong> ${pricePerUnit.toFixed(2)}
            </div>
            <div className="mb-4">
              <strong>Price per Unit (with Markup):</strong> ${pricePerUnitWithMarkup.toFixed(2)}
            </div>
            <div className="mb-4">
              <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormLabel htmlFor="pricePerUnit">Price per Unit:</FormLabel>
            <TextField
              id="pricePerUnit"
              type="number"
              value={pricePerUnit}
              onChange={(e) => setPricePerUnit(parseFloat(e.target.value))}
              className="mb-4 w-full"
            />

            <FormLabel htmlFor="markupPercentage">Markup Percentage:</FormLabel>
            <TextField
              id="markupPercentage"
              type="number"
              value={markupPercentage}
              onChange={(e) => setMarkupPercentage(parseFloat(e.target.value))}
              className="mb-4 w-full"
            />

            <Button onClick={handleSave} className="w-full">
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </Card>

      <div className="flex space-x-4 mt-6">
        <Button
          color="success"
          onClick={() => {
            setConfirmAction("accept");
            setShowConfirmModal(true);
          }}
        >
          Accept Quote
        </Button>
        <Button
          color="danger"
          onClick={() => {
            setConfirmAction("reject");
            setShowConfirmModal(true);
          }}
        >
          Reject Quote
        </Button>
      </div>

      <Dialog open={showConfirmModal} onClose={() => setShowConfirmModal(false)}>
        <DialogTitle>{confirmAction === "accept" ? "Accept Quote" : "Reject Quote"}</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to {confirmAction} this quote?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmModal(false)} variant='outline'>
            Cancel
          </Button>
          <Button onClick={handleConfirm} color={confirmAction === "accept" ? "primary" : "secondary"}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default QuoteDetails;
