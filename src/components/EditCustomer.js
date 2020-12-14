import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

function EditCustomer(props) {

    const [customer, setCustomer] = useState({firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''});
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
    console.log(props.params)      
        setCustomer({           
            firstname: props.params.data.firstname, 
            lastname: props.params.data.lastname,       
            streetaddress: props.params.data.streetaddress,    
            postcode: props.params.data.postcode,    
            city: props.params.data.city,     
            email: props.params.data.email,   
            phone: props.params.data.phone,  
        })
        setOpen(true);
    }

const handleClose = () => {
    setOpen(false)
}

const handleSave = () => {
    props.updateCustomer(props.params.value[0].href, customer);
    handleClose()
}

const inputChanged = (event) => {
    setCustomer({...customer, [event.target.name]: event.target.value});
}




return(

    <div>
        <Button style={{margin:10}} variant="outlined" color="primary" onClick={handleClickOpen}>
         Edit
        </Button>

        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit existing customer</DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                name="firstname"
                value={customer.firstname}
                onChange={inputChanged}
                label="Firstname"
                fullWidth
            />
            <TextField
                autoFocus
                margin="dense"
                name="lastname"
                value={customer.lastname}
                onChange={inputChanged}
                label="Lastname"
                fullWidth
            />
            <TextField
                autoFocus
                margin="dense"
                name="streetaddress"
                value={customer.streetaddress}
                onChange={inputChanged}
                label="Streetaddress"
                fullWidth
            />
            <TextField
                autoFocus
                margin="dense"
                name="postcode"
                value={customer.postcode}
                onChange={inputChanged}
                label="Postcode"
                fullWidth
            />
            <TextField
                autoFocus
                margin="dense"
                name="city"
                value={customer.city}
                onChange={inputChanged}
                label="City"
                fullWidth
            />
            <TextField
                autoFocus
                margin="dense"
                name="email"
                value={customer.email}
                onChange={inputChanged}
                label="Email"
                fullWidth
            />
            <TextField
                autoFocus
                margin="dense"
                name="phone"
                value={customer.phone}
                onChange={inputChanged}
                label="Phone"
                fullWidth
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="secondary">
                Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
                Save
            </Button>
        </DialogActions>

        </Dialog>
    </div>
    )
}
export default EditCustomer;