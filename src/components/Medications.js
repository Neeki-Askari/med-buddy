import * as React from 'react';
import AddandPrint from './AddandPrint';
import MedicationList from './MedicationList';
import Stack from '@mui/material/Stack';
import {useState, useEffect} from 'react';
import axios from 'axios';




function Medications () {
    const [rows, setRows] = useState([]);


    const createData = (name, amountVal, amountUnit, freqVal, freqUnit, time, prescriber) => {
        return { name, amountVal, amountUnit, freqVal, freqUnit, time, prescriber};
      }  

    const getAllMeds = () => {
        axios.get('/getMeds/14')
          .then((res) => {
              const data = res.data.map((row) => {
                return createData(row.med_name, row.amount_value, row.amount_unit, row.frequency_value, row.frequency_unit, row.time_of_day, row.prescriber)
              })
              setRows(data);
          })
          .catch((err) => console.error(err))
     }
  

    useEffect(getAllMeds, [])

    return (
        <Stack 
        className="MedicationsModule"
        direction="column"
        spacing={2}
        alignItems="center"
        >
         <AddandPrint 
         createData={createData} 
         getAllMeds={getAllMeds} 
         /> 
         <div className="MedList">
         <MedicationList 
         rows={rows}
         setRows={setRows}
         getAllMeds={getAllMeds} 
         />
         </div>
        </Stack>
    )
}

export default Medications;