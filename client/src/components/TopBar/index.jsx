import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Style from './style';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/More';
import LogoutIcon from 'mdi-react/LogoutVariantIcon';
import DeleteAccountIcon from 'mdi-react/UserRemoveIcon';
import ShowStatisticsIcon from 'mdi-react/GraphqlIcon';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

class Topbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            anchorEl: null,
            mobileMoreAnchorEl: null,
            userName: 'Fname Lname',
            userMail: 'email@email.com',
            userAvatar: '',
        }
    }

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

    render() {
        const {anchorEl, mobileMoreAnchorEl, open} = this.state;
        const {classes} = this.props;
        const isMenuOpen = Boolean(anchorEl);
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
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
                                    >
                                        <ListItem button onClick={this.handleMenuClose} className={classes.menuItem}>
                                            <ListItemIcon className={classes.icon}>
                                                <ShowStatisticsIcon/>
                                            </ListItemIcon>
                                            <ListItemText classes={{primary: classes.primary}} inset
                                                          primary="Show Statistics"/>
                                        </ListItem>
                                        <ListItem button onClick={this.handleMenuClose} className={classes.menuItem}>
                                            <ListItemIcon className={classes.icon}>
                                                <LogoutIcon/>
                                            </ListItemIcon>
                                            <ListItemText classes={{primary: classes.primary}} inset primary="Logout"/>
                                        </ListItem>
                                        <ListItem button onClick={this.handleMenuClose} className={classes.menuItem}>
                                            <ListItemIcon className={classes.icon}>
                                                <DeleteAccountIcon/>
                                            </ListItemIcon>
                                            <ListItemText classes={{primary: classes.primary}} inset primary="Delete Account"/>
                                        </ListItem>
                                    </List>
                                </div>
                            </div>
                            <CardMedia
                                className={classes.cover}
                                image="https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
                                title="Live from space album cover"
                            />
                        </Card>
                    </Fade>
                )}
            </Popper>
        );

        const renderMobileMenu = (
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                open={isMobileMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleMobileMenuClose}>
                    <IconButton color="inherit">
                        <LogoutIcon/>
                    </IconButton>
                    <p> Logout </p>
                </MenuItem>

            </Menu>
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
                            <IconButton
                                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                                <MoreIcon/>
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                {renderMenu}
                {renderMobileMenu}
            </div>
        );
    }
}

export default withStyles(Style)(Topbar);
