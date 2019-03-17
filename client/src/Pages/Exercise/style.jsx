const style = theme => ({
    root: {
        color: theme.palette.primary.contrastText,
        background: theme.palette.primary.main,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        // justifyContent: 'center',
        height: 'calc(98vh - 64px)',
        paddingTop: '2vh',
    },
    buttonSection: {
        margin: 20,
        width: '60vw',
        display: 'flex',
        justifyContent: 'space-between',
    },
    pulseButton: {
        animation: 'pulse 2s infinite',
    },
});

export default style;