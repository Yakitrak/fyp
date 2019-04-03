const style = theme => ({
    root: {
        background: theme.palette.customBackground,
        width: '100%',
        paddingTop: '2vh',
        minHeight: 'calc(98vh - 64px)',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
        padding: 0,
    },
    cardThumb: {
        height: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default style;