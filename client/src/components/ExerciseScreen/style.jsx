const style = theme => ({
    root: {
        color: theme.palette.primary.contrastText,
        background: theme.palette.primary.main,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        // justifyContent: 'center',
        height: '100vh',
        // paddingTop: '2em',
    },
    buttonSection: {
        margin: 20,
        width: '60vw',
        display: 'flex',
        justifyContent: 'space-between',
    },
});

export default style;