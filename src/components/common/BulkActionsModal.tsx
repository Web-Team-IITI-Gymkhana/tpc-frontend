import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";

interface BulkActionsModalProps {
  open: boolean;
  onClose: () => void;
  actions: { label: string; value: string }[];
  onSubmit: (action: string, extraData?: any) => void;
  seasons?: { id: string; name: string }[];
}

const BulkActionsModal: React.FC<BulkActionsModalProps> = ({
  open,
  onClose,
  actions,
  onSubmit,
  seasons = [],
}) => {
  const [selectedAction, setSelectedAction] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");

  const handleActionChange = (e: SelectChangeEvent<string>) => {
    setSelectedAction(e.target.value as string);
  };

  const handleSeasonChange = (e: SelectChangeEvent<string>) => {
    setSelectedSeason(e.target.value as string);
  };

  const handleSubmit = () => {
    if (selectedAction === "register-season" && !selectedSeason) return;
    onSubmit(selectedAction, { seasonId: selectedSeason });
    setSelectedAction("");
    setSelectedSeason("");
  };

  const showSeasonSelect = selectedAction === "register-season";

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Bulk Actions</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <InputLabel>Action</InputLabel>
          <Select
            value={selectedAction}
            onChange={handleActionChange}
            label="Action"
          >
            {actions.map((action) => (
              <MenuItem key={action.value} value={action.value}>
                {action.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {showSeasonSelect && (
          <FormControl fullWidth margin="normal">
            <InputLabel>Season</InputLabel>
            <Select
              value={selectedSeason}
              onChange={handleSeasonChange}
              label="Season"
            >
              {seasons.map((season) => (
                <MenuItem key={season.id} value={season.id}>
                  {season.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          disabled={!selectedAction || (showSeasonSelect && !selectedSeason)}
          variant="contained"
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BulkActionsModal;
