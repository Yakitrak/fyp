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
            light: '#b6ffff',
            main: '#3d5a98',
            dark: '#4ba3c7',
            contrastText: '#fff',
        },
        secondary: {
            light: '#39796b',
            main: '#004d40',
            dark: '#00251a',
            contrastText: '#fff',
        },
    },
    typography: {
        fontFamily: ["Roboto", "Helvetica", "Arial"],
    },
});

export {
    theme,
};