//This file sets up a theme for using with our MUI components
//Overriding the default MUI styles
//To use the theme, in customComponents.js we import the theme
//Then we wrap the components we are initialising in the <ThemeProvider> component
//Most of the overrides in here are to make the MUI component styles take precedence over the Knack styles when embedding in a Knack app
//We know which ones are needed, by trial and error of embedding components into Knack apps

import { createTheme, ThemeProvider } from '@mui/material/styles';

//Create a custom theme to override MUI defaults
//We include only what is required to make the MUI styles take precedence over the Knack styles when embedding in a Knack app
const theme = createTheme({
    components: {
        MuiTableCell: {
            styleOverrides: {
                root: {
                    padding: '16px !important',
                    verticalAlign: 'middle !important'
                },
            },
        },
        SubmitButton: {
            styleOverrides: {
                root: {
                    marginTop: '10px !important'
                },
            },
        }
    },
});

export default theme;