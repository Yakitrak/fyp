import React from 'react';
import ReactDOM from 'react-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import Style from './style';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import GoogleIcon from 'mdi-react/GoogleIcon';
import DownIcon from '@material-ui/icons/KeyboardArrowDown';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';




class Exercise extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showScrollArrow: true,
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    };

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    };

    handleScroll = () => {
        const element = document.getElementById("info");
        let x = element.getBoundingClientRect().top;
        let y = document.documentElement.clientHeight;

        if (x === y) {
            this.setState({
                showScrollArrow: true,
            });
        } else {
            this.setState({
                showScrollArrow: false,
            });
        }
    };

    scrollDown = () => {
        const element = document.getElementById("info");
        element.scrollIntoView({behavior: "smooth" });
    };


    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>

                <div className={classes.splash} id={'splash'}>

                    <div>
                        <Typography variant="h2" gutterBottom>
                            Parson's Practice
                        </Typography>

                        <Typography variant="h3" gutterBottom>
                            Progress your programming!
                        </Typography>
                    </div>

                    <Fab variant="extended" href={'/auth/google'} > <GoogleIcon /> Continue with Google </Fab>

                    { this.state.showScrollArrow ? (
                            <DownIcon className={classes.scrollArrow} onClick={this.scrollDown} fontSize="large" />
                        )
                        : ''}

                </div>

                <div className={classes.info} id={'info'}>

                    <Typography variant="h4" gutterBottom>
                        What are Parson's Puzzles?
                    </Typography>

                    <Typography variant="body1" gutterBottom>
                        body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                        unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                    </Typography>

                    <Typography variant="h4" gutterBottom>
                        Why use this website to practice programming?
                    </Typography>

                    <Typography variant="body1" gutterBottom>
                        body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                        unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                    </Typography>

                    <Typography variant="h4" gutterBottom>
                        About the author
                    </Typography>

                    <Typography variant="body1" gutterBottom>
                        body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                        unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                    </Typography>

                </div>

            </div>
        );
    }
}

export default withStyles(Style)(Exercise);
