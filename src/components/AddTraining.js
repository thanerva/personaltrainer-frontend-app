import React, {useState} from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DateFnsUtils from '@date-io/date-fns'
import moment from 'moment'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'

function AddTraining(props) {

    const [training, setTraining] = useState({date: '', activity: '', duration: '', customer: ''});
    const [open, setOpen] = useState(false)


const handleClickOpen = (date) => {
    setTraining({...training, date: moment(date).toISOString()})
    setOpen(true)
}

const handleClose = () => {
    setOpen(false)
}

const handleSave = () => {
    props.addTraining({...training, customer: props.training.links[0].href}); 
    handleClose()
}

const inputChanged = (event) => {
    setTraining({...training, [event.target.name]: event.target.value});
}

const handleDateChange = (date) => {
    setTraining({...training, date: moment(date).toISOString()})

}

return(

    <div>
        <Button style={{margin:10}} variant="outlined" color="primary" onClick={handleClickOpen}>
         Add training
        </Button>

        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New training</DialogTitle>
        <DialogContent>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker

                        format="dd.MM.yyyy"
                        value={training.date}
                        onChange={handleDateChange}
                    />
            <TextField
                autoFocus
                margin="dense"
                name="duration"
                value={training.duration}
                onChange={inputChanged}
                label="Duration"
                fullWidth
            />
            <TextField
                autoFocus
                margin="dense"
                name="activity"
                value={training.activity}
                onChange={inputChanged}
                label="Activity"
                fullWidth
            />
            </MuiPickersUtilsProvider>
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
export default AddTraining;