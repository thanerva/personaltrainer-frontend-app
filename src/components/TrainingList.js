import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import React, { useState, useEffect, useRef } from "react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import moment from 'moment';

function TrainingList() {

    const [training, setTraining] = useState([]);

    const gridRef = useRef();

    useEffect (() => {
        getTraining();
    }, [])


    const getTraining = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then((response) => response.json())
            .then(data => setTraining(data))
            .then(err => console.error(err))
    }

    const time = (params) => {
        return moment(params.data.date).format('DD.MM.YY, h:mm:ss a');
    }

    const names = (params) => {
        return params.data.customer.firstname+ ' ' +params.data.customer.lastname;
    }

    const columns = [
        {headerName: 'Customer', valueGetter:names, sortable: true, filter: true},
        {headerName: 'Activity', field: 'activity', sortable: true, filter: true},
        {headerName: 'Date', field: 'date', valueFormatter:time, sortable: true, filter: true},
        {headerName: 'Duration', field: 'duration', sortable: true, filter: true},
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
                    rowData={training}
                    pagination="true"
                    paginationPageSize={10}
                >
                </AgGridReact>
            </div>


        </div>
    )
}

export default TrainingList