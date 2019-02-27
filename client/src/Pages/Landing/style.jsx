const style = theme => ({
    root: {
        color: theme.palette.primary.contrastText,
        background: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        height: 'auto',
        position: 'relative',
    },
    splash: {
        height: '100vh',
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    },
    topText: {
        position: 'absolute',
        top: 20,
        left: 20,
        paddingBottom: 10,
        fontWeight: 200,
        userSelect: 'none',
        color: theme.palette.primary.contrastText,
        // textShadow: ' -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff',
        // color: theme.palette.primary.contrastText,
        // textShadow: ' -1px -1px 0 ' + theme.palette.primary.main + ' , 1px -1px 0 ' + theme.palette.primary.main + ', -1px 1px 0' + theme.palette.primary.main + ', 1px 1px 0 '  + theme.palette.primary.main
        },
    googleButton: {
        background: 'white',
        margin: theme.spacing.unit,
    },
    rootOverride: {
        height: '40px',
        background: '#4285F4',
        paddingLeft: 1,
        '&:hover': {
            backgroundColor: 'rgba(66, 133, 244, 0.8)',
        }
    },
    labelOverride: {
        textTransform: 'none',
    },
    scrollArrow: {
        position: 'absolute',
        bottom: '50px',
        animation: 'animate_arrow 3s infinite ease-in',
        cursor: 'pointer',
        color: 'black',
        fontSize: 50,
    },
    info: {
        background: '#f5f5f5',
        width: '75vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingTop: 50,
        paddingBottom: 50,
        textAlign: 'justify',
    },
    infoText: {
        paddingBottom: 20,
    },
    footer: {
        background: theme.palette.primary.main,
        width: '100%',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '4vh',
        paddingBottom: '2vh',
    },
    social: {
        display: 'flex',
        marginTop: 20,
        marginBottom: 10,
    },
    socialButton: {
        color: 'white',
        position: 'relative',
        transitionProperty: 'transform',
        transitionDuration: '.3s',
        '&:hover': {
            backgroundColor: 'transparent',
            transform: 'translateY(-6px)',
            animationName: 'hover',
            animationDuration: '1.5s',
            animationDelay: '.3s',
        },
    },
});

export default style;