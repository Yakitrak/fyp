import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme({
    overrides: {
        MuiStepLabel: {
            root: {
                zIndex: 3,
            },
        },
    },
    palette: {
        primary: {
            light: '#446cb3',
            main: '#3a539b',
            dark: '#5333ed',
            contrastText: '#fff',
        },
        secondary: {
            light: '#39796b',
            main: '#004d40',
            dark: '#00251a',
            contrastText: '#fff',
        },
        customBackground: '#e0e0e0',
    },
    typography: {
        useNextVariants: true,
        fontFamily: ["Roboto", "Helvetica", "Arial"],
    },
});

export {
    theme,
};