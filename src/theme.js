import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#7fcdff',
        },
        background: {
           default: '#064273',
           appBackground: '#064273' 
        },
        error: {
            main: '#CF0000',
          },
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '&.Mui-focused fieldset': {
                        borderColor: '#064273',
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    '&.Mui-focused': {
                        color: '#064273',
                    },
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    color: '#00000x',
                    '&.Mui-focused': {
                        color: '#064273',
                    },
                },
            },
        },
    },
});
