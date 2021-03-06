const style = theme => ({
    root: {
    },
    content: {
        color: theme.palette.primary.dark,
        marginTop: 10,
        width: 500,
    },
    title: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
    errorIndexText: {
        color: 'red',
    },
    errorIndentText: {
        color: 'orange',
    }
});

export default style;