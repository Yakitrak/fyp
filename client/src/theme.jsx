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
            light: '#64B5F6',
            main: '#696969',
            dark: '#0D47A1',
            contrastText: '#fff',
        },
        // secondary: {
        //     light: '#EF9A9A',
        //     main: '#EF5350',
        //     dark: '#C62828',
        //     contrastText: '#fff',
        // },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial"',
    },
});

export {
    theme,
};