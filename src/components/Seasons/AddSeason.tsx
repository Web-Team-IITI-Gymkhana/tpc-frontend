"use client";
import { FunctionComponent, useState } from "react";
import MyButton from "../myButton";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from "@mui/material";

interface AddSeasonProps {}

const AddSeason: FunctionComponent<AddSeasonProps> = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MyButton
        label="Add Season"
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Name Of This Season"
            type="email"
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Name Of This Season"
            type=""
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <MyButton
            label="Cancel"
            variant="outlined"
            color="secondary"
            onClick={handleClose}
          />
          <MyButton
            label="Subscribe"
            variant="outlined"
            color="secondary"
            onClick={handleClose}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddSeason;
