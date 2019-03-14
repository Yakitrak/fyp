import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Style from './style';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import LogoutIcon from 'mdi-react/LogoutVariantIcon';
import ShowStatisticsIcon from 'mdi-react/GraphqlIcon';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Switch from '@material-ui/core/Switch';


class Topbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            anchorEl: null,
            mobileMoreAnchorEl: null,
            userName: 'Loading..',
            userMail: 'loading...',
            userAvatar: '',
            statsToggle: false,
        }
    }

    componentDidMount() {
        this.initialiseProfile();
    };

    initialiseProfile = () => {
        Axios.get('/initial')
            .then((resp) => {
                if(resp.data.success){
                    this.setState({
                        userName: resp.data.name,
                        userMail: resp.data.email ,
                        userAvatar: resp.data.avatar,
                    });
                } else {
                    console.log('Profile load failed');
                }
            })
            .catch((err) => {
                console.log("Initial load error: ", err);
            });
    };


    handleProfileMenuOpen = event => {
        this.setState({anchorEl: event.currentTarget, open: !this.state.open });

    };

    handleMenuClose = () => {
        this.setState({anchorEl: null});
        this.handleMobileMenuClose();
    };

    handleMobileMenuOpen = event => {
        this.setState({mobileMoreAnchorEl: event.currentTarget, open: !this.state.open });
    };

    handleMobileMenuClose = () => {
        this.setState({mobileMoreAnchorEl: null});
    };

    handleLogOut =() => {
        let result = window.confirm('Are you sure you want to log out?');
        if (result === true) window.location.href='/logout';
    };

    handleStatToggle =  () => {
        let StatPrompt = prompt("Please enter admin password", "");
        if (StatPrompt === 'admin') {
            this.setState({
                statsToggle: !this.state.statsToggle,
            });

            this.props.showStatistics();
        }
    };

    render() {
        const {anchorEl, open} = this.state;
        const {classes} = this.props;
        const id = open ? 'simple-popper' : null;

        const renderMenu = (
            <Popper id={id} open={open} anchorEl={anchorEl} transition>
                {({TransitionProps}) => (
                    <Fade {...TransitionProps} timeout={350}>

                        <Card className={classes.card}>
                            <div className={classes.details}>
                                <CardContent className={classes.content}>
                                    <Typography component="h5" variant="h5">
                                        {this.state.userName}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        {this.state.userMail}
                                    </Typography>
                                </CardContent>
                                <div className={classes.controls}>
                                    <List
                                        component="nav"
                                        style={{ width: '100%' }}
                                    >
                                        <ListItem button onClick={this.handleLogOut} className={classes.menuItem}>
                                            <ListItemIcon className={classes.icon}>
                                                <LogoutIcon/>
                                            </ListItemIcon>
                                            <ListItemText classes={{primary: classes.primary}} inset primary="Logout"/>
                                        </ListItem>
                                        <ListItem className={classes.menuItem}>
                                            <ListItemIcon className={classes.icon}>
                                                <ShowStatisticsIcon/>
                                            </ListItemIcon>
                                            <ListItemText classes={{primary: classes.primary}}
                                                          primary="Statistics"
                                            />
                                            <ListItemSecondaryAction>
                                                <Switch
                                                    onChange={this.handleStatToggle}
                                                    checked={this.state.statsToggle}
                                                />
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </List>
                                </div>
                            </div>
                        </Card>
                    </Fade>
                )}
            </Popper>
        );

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                            PyParson
                        </Typography>

                        <div className={classes.grow}/>
                        <div className={classes.sectionDesktop}>
                            <Avatar onClick={this.handleProfileMenuOpen} alt={'User Avatar'} src={this.state.userAvatar} className={classes.avatar} />
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton aria-haspopup="true" onClick={this.handleProfileMenuOpen} color="inherit">
                                <Avatar alt={'User Avatar'} src={this.state.userAvatar} className={classes.avatar} />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                {renderMenu}
            </div>
        );
    }
}

export default withStyles(Style)(Topbar);
