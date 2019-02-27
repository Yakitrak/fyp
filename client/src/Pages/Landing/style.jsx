const style = theme => ({
    root: {
        color: theme.palette.primary.contrastText,
        background: theme.palette.primary.main,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        height: 'auto',
    },
    splash: {
        height : '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    },
    googleButton: {
      background: 'white',
    margin: theme.spacing.unit,
    },
    rootOverride: {
      height: '40px',
    },
    labelOverride: {
        textTransform: 'none',
    },
    info: {
        height : '100vh',
        background: 'green',
    },
    scrollArrow: {
        position: 'absolute',
        bottom: '25px',
        animation: 'animate_arrow 3s infinite ease-in',
        cursor: 'pointer',
    },
});

export default style;