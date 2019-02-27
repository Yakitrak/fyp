import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Style from './style';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DownIcon from '@material-ui/icons/KeyboardArrowDown';
import GoogleIcon from './google.svg'
import IconButton from '@material-ui/core/IconButton';
import GithubIcon from 'mdi-react/GithubFaceIcon';
import EmailIcon from 'mdi-react/EmailIcon';
import LinkedInIcon from 'mdi-react/LinkedinIcon';
import { theme } from 'theme';

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

                <div
                    className={classes.splash}
                    id={'splash'}
                    style={{
                        backgroundImage: `url(${require(`../../media/bg.png`)})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                    }}
                >

                        <Typography variant="h2" className={classes.topText} >
                            <span style={{ color: theme.palette.primary.main }}>Py</span>Parson
                        </Typography>

                    <div style={{ paddingTop: '15vh'}}>
                        <Typography variant="h4" style={{ paddingLeft: 20, color: 'white', paddingBottom: 25, fontWeight: 100 }} >
                            The efficient way to practice programming!
                        </Typography>

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
                            <div style={{ background: 'white', width: 38, height: 38, borderRadius: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <GoogleIcon width={'24px'}/>
                            </div>

                            <Typography variant={'subtitle1'} style={{ fontSize: '14px', paddingLeft: '18px' , color: 'white', fontWeight: '600'
                            }} >
                                Sign in with Google
                            </Typography>
                        </Button>
                    </div>

                    { this.state.showScrollArrow ? (
                            <DownIcon className={classes.scrollArrow} onClick={this.scrollDown}  />
                        )
                        : ''}

                </div>

                <div className={classes.info} id={'info'}>

                    <Typography variant="h3" gutterBottom style={{ paddingBottom: 20 }}>
                        About PyParson
                    </Typography>

                    <Typography variant="h4" gutterBottom>
                        What are Parson's Puzzles?
                    </Typography>

                    <Typography variant="subtitle1" className={classes.infoText} gutterBottom>
                        Parson's Puzzles are a way to practice programming logic and syntax. Instead of writing a
                        program from scratch, you are given a small program but the lines are in a random order. You
                        have to reposition the lines to make the program work correctly. It is an efficient method
                        to practice and revise programming concepts.
                    </Typography>

                    <Typography variant="h4" gutterBottom>
                        Why use PyParson?
                    </Typography>

                    <Typography variant="subtitle1"  className={classes.infoText} gutterBottom>
                        PyParson uses Parson's puzzles which are proven to be very useful. But unlike other applications,
                        you sign up to keep track of your progress. PyParson will use a smart algorithm to monitor your skills
                        in different areas of programming and only give questions which are personalised to challenge you.
                    </Typography>

                    <Typography variant="h4" gutterBottom>
                        Who made this?
                    </Typography>

                    <Typography variant="subtitle1"  className={classes.infoText} gutterBottom>
                        I am Kartikay Jainwal. I am studying Bsc(Hons) Software Engineering
                        at University of Portsmouth. This is my engineering project for my final year.
                        I hope it will help students independently improve on their weaknesses
                        and getting a better understanding of programming concepts
                    </Typography>

                </div>

                <div className={classes.footer}>
                    <Typography color='inherit' variant={'h5'} style={{ fontWeight: 'bold', paddingBottom: 5, borderBottom: '1px solid' }} > Get in touch </Typography>
                    <div className={classes.social}>
                        <a href={'https://www.linkedin.com/in/kartikayjainwal'} target={'_blank'}>
                            <IconButton className={classes.socialButton} aria-label="Linkedin">
                                <LinkedInIcon />
                            </IconButton>
                        </a>

                        <a href={'https://github.com/Yakitrak'} target={'_blank'}>
                            <IconButton className={classes.socialButton} aria-label="Github">
                                <GithubIcon />
                            </IconButton>
                        </a>

                        <a href={'mailto:kartikayjainwal@gmail.com'}>
                            <IconButton className={classes.socialButton} aria-label="Email">
                                <EmailIcon />
                            </IconButton>
                        </a>

                    </div>

                    <Typography color='inherit' variant={'caption'} style={{ }} > Copyright © 2019 Kartikay Jainwal </Typography>
                </div>
            </div>
        );
    }
}

export default withStyles(Style)(Exercise);
