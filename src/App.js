import React, {useState} from 'react';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import TrainingCalendar from './components/Calendar';
import { AppBar, Tab, Tabs } from '@material-ui/core';
import {Event, FitnessCenter, People } from '@material-ui/icons';

function App() {

  const[value, setValue] = useState('one')

  const handleChange = (event, value) => {
    setValue(value)
  }
  return (
    <div className="App">
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab value="one" label="Customer list" icon={<People/>}/>
          <Tab value="two" label="List of trainings" icon={<FitnessCenter/>}/>
          <Tab value="three" label="Calendar" icon={<Event/>}/>
        </Tabs>
      </AppBar>
      {value === 'one' && <CustomerList/>}
      {value === 'two' && <TrainingList/>}
      {value === 'three' && <TrainingCalendar/>}
    </div>
  );
}

export default App;
