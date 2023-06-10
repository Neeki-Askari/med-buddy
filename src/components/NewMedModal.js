import * as React from 'react';
import Modal from '@mui/material/Modal';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import SearchMed from './SearchMed'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {useState} from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { theme } from '../theme';  
import { ThemeProvider } from '@mui/material/styles';
import axios from 'axios';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "90%",
    maxWidth: 600,
    bgcolor: '#BED2E5',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  


function NewMedModal({open, setOpen, createData, getAllMeds, tableInfo, setTableInfo}) {
    const [response, setResponse] = useState({
        med_name: '',
        amount_value: '',
        amount_unit: '',
        frequency_value: null,
        frequency_unit: '',
        time_of_day: '',
        prescriber: '', 
    });
    
const handleChange = (e) => {
    const {name, value} = e.target;

    setResponse((prevState) => ({
        ...prevState,
        [name]: value
    }
    ));
}

const handleAmountRadioChange = (e) => {
    const {value} = e.target;
    setResponse((prevState) => ({
        ...prevState,
        amount_unit: value
    }));
}

const handleFreqRadioChange = (e) => {
    const {value} = e.target;
    setResponse((prevState) => ({
        ...prevState,
        frequency_unit: value
    }));
}

const handleCheckBoxChange = (e) => {
    const { value , checked } = e.target;
    setResponse((prevState) => {
        const storage = prevState.time_of_day ? prevState.time_of_day.split(', ') : [];

        if (checked) {
            storage.push(value);
        } else {
            const index = storage.indexOf(value);
            if (index > -1) {
                storage.splice(index, 1)
            }
        }

        return {...prevState, time_of_day: storage.join(', ')}
    })
}

console.log('Response: ', response)

    const handleClose = () => setOpen(false);


    const submitForm = (e) => {
        e.preventDefault();
        axios.post('/addMed/14', response)
            .then(() => {
                setOpen(false);
                getAllMeds();
            })
            .catch((err) => console.error(err))
       
    }

    return (
        <ThemeProvider theme={theme}>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{mb: 2}}>
            Add a New Medication
        </Typography>
            <SearchMed setResponse={setResponse}/>
            <div>
            {`Medication selected: ${response.med_name}`}
            </div>
            <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
            <div style={{display: "flex", width: "100%"}}>
            <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Quantity</FormLabel>
                <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                >
                    <OutlinedInput
                        name="amount_value"
                        inputProps={{ step: "0.25" }}
                        type="number"
                        placeholder="0"
                        className="OutlinedInput"
                        sx={{
                            maxWidth: 90,
                            maxHeight: 45,
                            marginRight: 2
                        }}
                        onChange={handleChange}
                    />
                  
                    <FormControlLabel value="Tab(s)" control={<Radio onChange={handleAmountRadioChange}/>} label="Tab(s)" />
                    <FormControlLabel value="Cap(s)" control={<Radio onChange={handleAmountRadioChange}/>} label="Cap(s)" />
                    <FormControlLabel value="mL" control={<Radio onChange={handleAmountRadioChange}/>} label="mL" />
                    <FormControlLabel value="g" control={<Radio onChange={handleAmountRadioChange}/>} label="g" />
                </RadioGroup>
            </FormControl>
            </div>
            <div style={{display: "flex", width: "100%"}}>
            <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Frequency</FormLabel>
                <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                >
                    <OutlinedInput
                        name="frequency_value"
                        inputProps={{ step: "1.0" }}
                        type="number"
                        placeholder="0"
                        className="OutlinedInput"
                        sx={{
                            maxWidth: 90,
                            maxHeight: 45,
                            marginRight: 2
                        }}
                        onChange={handleChange}
                    />
                    <div style={{display: "flex", alignItems: "center", marginRight: "15px"}}>times a </div>
                  
                    <FormControlLabel value="day" control={<Radio onChange={handleFreqRadioChange}/>} label="day" />
                    <FormControlLabel value="week" control={<Radio onChange={handleFreqRadioChange}/>} label="week" />
                    <FormControlLabel value="month" control={<Radio onChange={handleFreqRadioChange}/>} label="month" />
                    <FormControlLabel value="as needed" control={<Radio onChange={handleFreqRadioChange}/>} label="as needed" />
                </RadioGroup>
            </FormControl>
            </div>       
            <Stack direction="row" spacing={2}>
                <FormLabel component="legend">Time of Day</FormLabel>
                <FormControlLabel
                value="AM"
                control={<Checkbox name="time_of_day" onChange={handleCheckBoxChange}/>}
                label="AM"
                labelPlacement="end"
                />
                <FormControlLabel
                value="PM"
                control={<Checkbox name="time_of_day" onChange={handleCheckBoxChange}/>}
                label="PM"
                labelPlacement="end"
                />
            </Stack>
            <TextField 
            name="prescriber"
            id="outlined-basic" 
            label="Prescriber" 
            variant="outlined" 
            onChange={handleChange}
            />
            </Box>
            <Button variant="contained" onClick={submitForm}>Submit</Button>
         </Box>
        </Modal>
        </ThemeProvider>
    );
}

export default NewMedModal;