import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import React, { useState, useEffect, useRef } from "react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import moment from 'moment';
import { Button } from "@material-ui/core";
import Snackbar from '@material-ui/core/Snackbar'

function TrainingList() {

    const [training, setTraining] = useState([]);
    const [id, setId] = useState('');
    const [msg, setMsg] = useState('');
    const [open, setOpen] = useState(false);

    const gridRef = useRef();

    useEffect (() => {
        getTraining();
    }, [])

    const time = (params) => {
        return moment(params.data.date).format('DD.MM.YY, h:mm:ss a');
    }


    const columns = [
        
        {headerName: 'Firstname', field: 'customer.firstname', sortable: true, filter: true},
        {headerName: 'Lastname', field: 'customer.lastname', sortable: true, filter: true},
        {headerName: 'Activity', field: 'activity', sortable: true, filter: true},
        {headerName: 'Date', field: 'date', valueFormatter:time, sortable: true, filter: true},
        {headerName: 'Duration', field: 'duration', sortable: true, filter: true},

        {
            headerName: '',
            field: '',
            width: 90,
            cellRendererFramework: (row) => ( //eslint-disable-line
                <Button color="secondary" size="small" onClick={() => deleteTraining(row.data)}>
                    Delete
                </Button>
            )  
        }
    ]

    


    const getTraining = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
        .then((response) => response.json())
        .then(data => setTraining(data))
        .catch((err) => console.error(err))
    }

    const deleteTraining = (link) => {
        setId(id)
        if(window.confirm('Are you sure?')) {
        fetch('https://customerrest.herokuapp.com/api/trainings/' + link.id, {
            method: 'DELETE'
        })
        .then(_=> gridRef.current.refreshCells({rowNodes: getTraining()}))
        .then(_=> setMsg("Training deleted succesfully!"))
        .then(_=> setOpen(true))
        .catch(err => console.log(err))
        }
    }

    const closeSnackbar = () => {
        setOpen(false);
    }






    return(
        <div>
            <div className="ag-theme-material" style={{ height: '700px', width: '80%', margin: 'auto' }}>
                <AgGridReact
                    ref={gridRef}
                    supressCellSelection={true}
                    onGridReady={ params => {
                        gridRef.current = params.api
                    }}
                    columnDefs={columns}
                    rowData={training}
                    animateRows={true}
                    pagination="true"
                    paginationPageSize={10}
                >
                </AgGridReact>
                <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={closeSnackbar}
                message={msg}
            /> 
            </div>


        </div>
    )
}

export default TrainingList