import * as React from 'react';
import Button from '@mui/material/Button';

import Stack from '@mui/material/Stack';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PrintIcon from '@mui/icons-material/Print';
import {useState} from 'react';
import NewMedModal from './NewMedModal'

function AddandPrint ({createData, getAllMeds, tableInfo, setTableInfo}) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    
    const handlePrint = () => {
        window.print();
    }

    return (
        <Stack 
        className="buttons"
        direction="row" 
        spacing={2}
        mt={2}
        >
            <Button 
            variant="contained" 
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleOpen}
            >
            Add
             </Button>
             <Button 
             variant="contained" 
             startIcon={<PrintIcon />}
             onClick={handlePrint}
             >
            Print
            </Button>
            {open ? <NewMedModal 
                open={open} 
                setOpen={setOpen} 
                createData={createData} 
                getAllMeds={getAllMeds}
                tableInfo={tableInfo}
                setTableInfo={setTableInfo}
                /> : null}
        </Stack>
    )
}

export default AddandPrint;