"use client"
import { ChangeEvent, useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
} from "@mui/material";
import data from './data';

const AddCompanyBtn = () => {
    const [open, setOpen] = useState(false);

    const [company, setCompanyData] = useState({
        'name' : '',
        'id' : 0,
        'ctc_offered': '',
        'roles_offered': [],
        'date_modified': '',
        'date_created_timestamp': 0,
    });

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSubmit = () => {
        // setCompanyData( (prevData) => {
        //     return {
        //         ...prevData,
        //         'id' : 10*Math.random(),
        //         'ctc_offered': '45 LPA',
        //         'roles_offered': [
        //             'software engineer',
        //             'devops engineer',
        //         ],
        //         'date_modified': 'Jun 14, 2023 22:10',
        //         'date_created_timestamp': Date.now(),
        //     }
        // } );
        setOpen(false);
    };

    function handleFormChange(event: ChangeEvent<HTMLInputElement>) {
        const {name, type, value} = event.target;
        setCompanyData( prevData => {
            return {
                ...prevData,
                'name': value
            }
        } );
    }

    return (
        <div>
        <Button onClick={handleClickOpen}>
            Add Company
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add a Company</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter the details of the company
                </DialogContentText>
                <TextField 
                    id="outlined-basic" 
                    label="Name of Company" 
                    variant="outlined" 
                    value={company.name}
                    onChange={handleFormChange}
                    size='small'
                    margin='normal'
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Add</Button>
            </DialogActions>
        </Dialog>
        </div>
    )
}

export default AddCompanyBtn