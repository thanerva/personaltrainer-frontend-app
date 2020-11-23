import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import React , { useState, useEffect, useRef } from "react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function CustomerList() {

    const [customers, setCustomers] = useState([])
    const gridRef = useRef();
    
    useEffect(() => {
        getCustomers();
    }, [])

    const getCustomers = () => {
        fetch('http://customerrest.herokuapp.com/api/customers')
        .then((response) => response.json())
        .then((data) => setCustomers(data.content))
        .catch((err) => console.error(err))
    }

    const columns = [
        {headerName: 'First name', field: 'firstname', sortable: true, filter: true},
        {headerName: 'Last name', field: 'lastname', sortable: true, filter: true},
        {headerName: 'Address', field: 'streetaddress', sortable: true, filter: true},
        {headerName: 'Postcode', field: 'postcode', sortable: true, filter: true},
        {headerName: 'City', field: 'city', sortable: true, filter: true},
        {headerName: 'Email', field: 'email', sortable: true, filter: true},
        {headerName: 'Phone', field: 'phone', sortable: true, filter: true}

    ]
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
                    rowData={customers}
                    pagination="true"
                    paginationPageSize={10}
                >
                </AgGridReact>
            </div>


        </div>
    )
}

export default CustomerList;