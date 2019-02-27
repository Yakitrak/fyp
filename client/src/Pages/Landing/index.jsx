import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Style from './style';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DownIcon from '@material-ui/icons/KeyboardArrowDown';
import GoogleIcon from './google.svg'

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
        if (element.getBoundingClientRect().top === document.documentElement.clientHeight) {
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
                            Programming Puzzles
                        </Typography>

                        <Typography variant="h3" gutterBottom>
                            Progress your skills!
                        </Typography>
                    </div>

                    <Button
                        className={classes.googleButton}
                        variant="contained"
                        size="medium"
                        href={'/auth/google'}
                        classes={{
                            root: classes.rootOverride,
                            label: classes.labelOverride,
                        }}
                    >
                        <GoogleIcon width={'24px'}/>
                        <Typography variant={'subtitle1'} style={{ fontSize: '14px', paddingLeft: '18px' , color: 'rgba(0,0,0,0.54)', fontWeight: '600'
                        }} >
                            Sign in with Google
                        </Typography>
                    </Button>



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
