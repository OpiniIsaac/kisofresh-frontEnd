"use client";
import React, { useState, useEffect } from "react";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  CircularProgress,
  Snackbar,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useAppSelector } from "@/lib/hooks";
import {
  approveQuote,
  fetchQuotesByUserId,
  rejectQuote,
} from "@/lib/actions/trader.actions";

type Quote = {
  _id: string;
  crop: string;
  quantity: number;
  price: number;
  status: string;
  totalPrice: number;
  pricePerUnitWithMarkup: number;
};

const TraderQuotes: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchQuotes = async () => {
      if (user) {
        try {
          const quotesData = await fetchQuotesByUserId(user.uid);
          const filteredQuotes = quotesData.filter(
            (quote) =>
              quote.status !== "QUOTE_APPROVED" &&
              quote.status !== "QUOTE_REJECTED"
          );
          const formattedQuotesData = filteredQuotes.map((quote) => ({
            _id: quote._id.toString(),
            crop: quote.crop,
            quantity: quote.quantity,
            price: quote.price,
            status: quote.status,
            totalPrice: quote.totalPrice,
            pricePerUnitWithMarkup: quote.pricePerUnitWithMarkup,
          }));
          setQuotes(formattedQuotesData);
        } catch (error) {
          console.error("Error fetching quotes:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, [user]);

  const handleApproveQuote = async () => {
    if (selectedQuote) {
      try {
        const result = await approveQuote(selectedQuote._id);
        if (result.success) {
          setSnackbarMessage("Quote approved successfully!");
          setQuotes(
            quotes
              .map((quote) =>
                quote._id === selectedQuote._id
                  ? { ...quote, status: "QUOTE_APPROVED" }
                  : quote
              )
              .filter((quote) => quote.status !== "QUOTE_APPROVED")
          );
        } else {
          setSnackbarMessage(result.message || "Error approving quote.");
        }
      } catch (error) {
        setSnackbarMessage("Error approving quote.");
      } finally {
        setOpenSnackbar(true);
        setOpenDialog(false);
      }
    }
  };

  const handleRejectQuote = async () => {
    if (selectedQuote) {
      try {
        const result = await rejectQuote(selectedQuote._id);
        if (result.success) {
          setSnackbarMessage("Quote rejected successfully!");
          setQuotes(
            quotes
              .map((quote) =>
                quote._id === selectedQuote._id
                  ? { ...quote, status: "QUOTE_REJECTED" }
                  : quote
              )
              .filter((quote) => quote.status !== "QUOTE_REJECTED")
          );
        } else {
          setSnackbarMessage(result.message || "Error rejecting quote.");
        }
      } catch (error) {
        setSnackbarMessage("Error rejecting quote.");
      } finally {
        setOpenSnackbar(true);
        setOpenDialog(false);
      }
    }
  };

  const handleViewDetails = (quote: Quote) => {
    setSelectedQuote(quote);
    setOpenDialog(true);
  };

  return (
    <Container className="mt-20">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            Trader Quotes
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2} className="mt-4">
        <Grid item xs={12}>
          <Typography variant={isSmallScreen ? "h5" : "h4"} gutterBottom>
            Your Quotes
          </Typography>
        </Grid>
        {loading ? (
          <Grid item xs={12}>
            <CircularProgress />
          </Grid>
        ) : (
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Crop</TableCell>
                    <TableCell>Quantity</TableCell>
                    {!isSmallScreen && <TableCell>Price</TableCell>}
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {quotes.map((quote) => (
                    <TableRow key={quote._id}>
                      <TableCell>{quote.crop}</TableCell>
                      <TableCell>{quote.quantity}</TableCell>
                      {!isSmallScreen && (
                        <TableCell>{quote.totalPrice}</TableCell>
                      )}
                      <TableCell>{quote.status}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          onClick={() => handleViewDetails(quote)}
                        >
                          View & Approve/Reject
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        )}
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Quote Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Review the details of the quote below.
          </DialogContentText>
          <Typography>Crop: {selectedQuote?.crop}</Typography>
          <Typography>Quantity: {selectedQuote?.quantity}</Typography>
          <Typography>
            Price: {selectedQuote?.pricePerUnitWithMarkup}
          </Typography>
          <Typography>Status: {selectedQuote?.status}</Typography>
          <Typography>Total Cost: {selectedQuote?.totalPrice}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleApproveQuote} color="primary">
            Approve
          </Button>
          <Button onClick={handleRejectQuote} color="secondary">
            Reject
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TraderQuotes;
