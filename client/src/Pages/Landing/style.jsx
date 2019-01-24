const style = theme => ({
    root: {
        color: theme.palette.primary.contrastText,
        background: theme.palette.primary.main,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        // justifyContent: 'center',
        height: '98vh',
        paddingTop: '2vh',
    },

});

export default style;