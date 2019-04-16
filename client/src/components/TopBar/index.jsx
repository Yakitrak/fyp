import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Style from './style';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import LogoutIcon from 'mdi-react/LogoutVariantIcon';
import ShowStatisticsIcon from 'mdi-react/GraphqlIcon';
import Button from '@material-ui/core/Button';
import DeleteAccountIcon from 'mdi-react/AccountRemoveOutlineIcon';
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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

class Topbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openDialog: false,
            dialogType: '',
            dialogTitle: '',
            dialogText: '',
            dialogButton: '',
            anchorEl: null,
            mobileMoreAnchorEl: null,
            userName: 'Loading..',
            userMail: 'loading...',
            userAvatar: '',
            statsToggle: false,
            passwordInput: '',
            error: false,
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

    handleOpenDialog = type => {
        if (type === 'admin') {
            this.setState({
                openDialog: true,
                dialogType: 'admin',
                dialogTitle: 'Admin Access Required',
                dialogText: 'To see the user statistics overlay please provide the admin password.',
                dialogButton: 'Login',
            })
        } else if (type === 'delete') {
            this.setState({
                openDialog: true,
                dialogType: 'delete',
                dialogTitle: 'Are you sure you want to delete this account?',
                dialogText: 'All your progress will be lost, you cannot reverse this action!',
                dialogButton: 'Delete',
            })
        } else if (type === 'logout') {
            this.setState({
                openDialog: true,
                dialogType: 'logout',
                dialogTitle: 'Are you sure you want to logout?',
                dialogText: '',
                dialogButton: 'Logout',
            })
        }
    };

    handleCloseDialog = () => {
        this.setState({
            openDialog: false,
            error: false,
        })
    };

    handleValidation = () => {
        if (this.state.dialogType === 'admin') {
            if (this.state.passwordInput === 'admin1') {
                this.setState({
                    statsToggle: !this.state.statsToggle,
                });
                this.props.showStatistics();
                this.handleCloseDialog();
            } else {
                this.setState({
                    error: true,
                });
            }
        } else if (this.state.dialogType === 'delete') {
            if (this.state.passwordInput === this.state.userMail) {
                    this.handleDeleteAccount();
            } else {
                this.setState({
                    error: true,
                });
            }
        } else if (this.state.dialogType === 'logout') {
            window.location.href='/logout';
        }
    };

    handleDeleteAccount = () => {
        Axios.get('/deleteAccount')
            .then((resp) => {
                if(resp.data.success){
                    window.location.href='/logout'
                } else {
                    console.log('Could not delete account');
                }
            })
            .catch((err) => {
                console.log("Invalid account delete request: ", err);
            });
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value, error: false });
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
                                        <ListItem button onClick={() => this.handleOpenDialog('logout')} className={classes.menuItem}>
                                            <ListItemIcon className={classes.icon}>
                                                <LogoutIcon/>
                                            </ListItemIcon>
                                            <ListItemText classes={{primary: classes.primary}} inset primary="Logout"/>
                                        </ListItem>

                                        <ListItem button onClick={() => this.handleOpenDialog('delete')} className={classes.menuItem}>
                                            <ListItemIcon className={classes.icon}>
                                                <DeleteAccountIcon/>
                                            </ListItemIcon>
                                            <ListItemText classes={{primary: classes.primary}} inset primary="Delete Account"/>
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
                                                    onChange={() => this.handleOpenDialog('admin')}
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

                <Dialog
                    open={this.state.openDialog}
                    onClose={this.handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="form-dialog-title"> {this.state.dialogTitle} </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {this.state.dialogText}
                        </DialogContentText>

                        { this.state.dialogType !== 'logout' ? (
                        <TextField
                            error={this.state.error}
                            id="standard-password"
                            type="password"
                            label={this.state.dialogType === 'admin' ? 'Password' : 'Enter your email'}
                            value={this.state.passwordInput}
                            onChange={this.handleChange('passwordInput')}
                            margin="normal"
                            fullWidth
                        /> ) : ''}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseDialog} color="primary">
                            Close
                        </Button>
                        <Button onClick={this.handleValidation} color="primary">
                            {this.state.dialogButton}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(Style)(Topbar);
