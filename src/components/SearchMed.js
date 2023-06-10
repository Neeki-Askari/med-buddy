import * as React from 'react';
import { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { theme } from '../theme';  
import { ThemeProvider } from '@mui/material/styles';

function SearchMed({ setResponse }) {
  const [options, setOptions] = React.useState([]);
  const [searchText, setSearchText] = React.useState('');

 useEffect(() => {
    if (searchText) {
      axios.get('/searchMeds', {
        params: {
          query: searchText
        }
      })
      .then((response) => {
        const data = response.data.approximateGroup.candidate;
        const filteredData = data.filter((option) => option.name !== undefined)
        const optionList = filteredData.map((option) => option.name);
        setOptions(optionList);
      })
      .catch((err) => console.error(err));
    }
  }, [searchText]);

  return (
    <ThemeProvider theme={theme}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={options}
        onInputChange={(event, newInputValue) => {
          setSearchText(newInputValue);
        }}
        onChange={(event, newValue) => {
          setResponse(prevState => ({ ...prevState, med_name: newValue }));
        }}
        renderInput={(params) => (
          <TextField {...params} label="Search Medication Name" variant="outlined" />
        )}
      />
    </ThemeProvider>
  );
}

export default SearchMed;