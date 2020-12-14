import { AgGridReact } from "ag-grid-react";
import React , { useState, useEffect, useRef } from "react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import AddCustomer from './AddCustomer'
import EditCustomer from './EditCustomer'
import Snackbar from '@material-ui/core/Snackbar'
import { Button } from "@material-ui/core";
import AddTraining from "./AddTraining";
import {Delete} from "@material-ui/icons"

function CustomerList() {

    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    const gridRef = useRef();

    const closeSnackbar = () => {
        setOpen(false);
    }
    
    useEffect(() => {
        getCustomers();
    }, [])

    const getCustomers = () => {
        fetch('http://customerrest.herokuapp.com/api/customers')
        .then((response) => response.json())
        .then((data) => setCustomers(data.content))
        .catch((err) => console.error(err))
    }

    const addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(newCustomer)
        })
        .then(_ => gridRef.current.refreshCells({rowNodes: getCustomers()})) 
        .then(_ => setMsg('Customer was added succesfully!')) 
        .then(_ => setOpen(true)) 
        .catch(err => console.error(err))
    }

    const updateCustomer = (link, customer) => {
        fetch(link, {
            method: 'PUT',
            headers: {'Content-type' : 'application/json' },
            body: JSON.stringify(customer)
        })
        .then(_ => gridRef.current.refreshCells({rowNodes: getCustomers()})) 
        .then(_ => setMsg('Customer was updated succesfully'))       
        .then(_ => setOpen(true))       
        .catch(err => console.log(err))    
    }

    const deleteCustomer = (link) => {
        if (window.confirm('Are you sure?')){
            fetch(link[0].href, {
                method: 'DELETE'
            })
            .then(_ => gridRef.current.refreshCells({rowNodes: getCustomers()}))
            .then(_ => setMsg('Customer deleted succesfully!'))
            .then(_ => setOpen(true))
            .catch(err => console.log(err))
        }
    }


    const addTraining = (newTraining) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(newTraining)
        })
        .then(_ => setMsg('Training added!'))
        .then(_ => setOpen(true))
        .catch(err => console.error(err))
    }


    const columns = [


        {headerName: 'First name', field: 'firstname', sortable: true, filter: true},
        {headerName: 'Last name', field: 'lastname', sortable: true, filter: true},
        {headerName: 'Address', field: 'streetaddress', sortable: true, filter: true},
        {headerName: 'Postcode', field: 'postcode', sortable: true, filter: true},
        {headerName: 'City', field: 'city', sortable: true, filter: true},
        {headerName: 'Email', field: 'email', sortable: true, filter: true},
        {headerName: 'Phone', field: 'phone', sortable: true, filter: true},
        {
            headerName: '',
            field: 'links',
            width: 60,
            cellRendererFramework: params => //eslint-disable-line
            <Button
                color='secondary'
                size='large'
                onClick={() => deleteCustomer(params.value)}
                startIcon={<Delete/>}>

            </Button>
        },
        {
            headerName: 'Actions',
            field: 'links',
            width: 105,
            cellRendererFramework: params =>  <EditCustomer updateCustomer={updateCustomer} params={params} /> //eslint-disable-line

        },
        {
            headerName:'',
            width: 172,
            cellRendererFramework: (row) => (  //eslint-disable-line
                <AddTraining addTraining={addTraining} training={row.data} />
            )

        }

    ]
    return(
        <div>
            <AddCustomer addCustomer={addCustomer}/>
            <div className="ag-theme-material" style={{ height: '700px', width: '91%', margin: 'auto' }}>
                <AgGridReact
                    ref={gridRef}
                    supressCellSelection={true}
                    onGridReady={ params => {
                        gridRef.current = params.api
                        params.api.sizeColumnsToFit();
                    }}
                    columnDefs={columns}
                    rowData={customers}
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

export default CustomerList;