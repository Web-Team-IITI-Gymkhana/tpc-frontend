import React, { useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { fetchPenalties } from "@/helpers/api";
import toast from "react-hot-toast";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const PenaltyModal = ({ isOpen, onClose, studentId }) => {
  const [penaltyValue, setPenaltyValue] = useState("");
  const [penaltyReason, setPenaltyReason] = useState("");
  const [loading, setLoading] = useState(false);  const handleSubmitPenalty = async () => {
    const requestBody = [
      {
        studentId,
        penalty: parseInt(penaltyValue),
        reason: penaltyReason,
      },
    ];

    setLoading(true);
    try {
      const response = await fetchPenalties(requestBody);
      if (response) {
        toast.success("Penalty submitted successfully");
        onClose();
        setPenaltyValue("");
        setPenaltyReason("");
      } else {
        toast.error("Error submitting penalty");
      }
    } catch (error) {
      toast.error("Error submitting penalty:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      className="!text-black"
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Penalty
        </Typography>
        <TextField
          label="Penalty Value"
          value={penaltyValue}
          onChange={(e) => setPenaltyValue(e.target.value)}
          fullWidth
          margin="normal"
          InputProps={{
            style: {
              outline: "none",
            },
          }}
        />
        <TextField
          label="Reason"
          value={penaltyReason}
          onChange={(e) => setPenaltyReason(e.target.value)}
          fullWidth
          margin="normal"
          InputProps={{
            style: {
              outline: "none",
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          disabled={loading}
          onClick={handleSubmitPenalty}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </Box>
    </Modal>
  );
};

export default PenaltyModal;
