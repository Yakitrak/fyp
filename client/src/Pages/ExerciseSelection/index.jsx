import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Style from './style';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import Axios from "axios";
import LinearProgress from '@material-ui/core/LinearProgress';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const prettyTags = {
    "bool_operators": "Boolean Logic & Operators",
    "control": "Control Structures",
    "functions": "Functions",
    "dictionary": "Dictionary",
    "exceptions": "Error handling",
    "readwrite": "Read / Write ",
    "list": "Lists"
};

class ExerciseSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            questions: '',
        }
    }

    componentDidMount() {
        this.createQuestionsSection();
    };


    createQuestionsSection = () => {
        // database call to get questions
        Axios.get('/getUserQuestions')
            .then((resp) => {
                if(resp.data.success){
                    this.setState({
                        questions: resp.data.questions,
                        loading: false
                    })

                } else {
                    console.log('Question Load failed');
                }
            })
            .catch((err) => {
                console.log("Question load error: ", err);
            });
    };

    render() {
        const { classes, showOverlay } = this.props;
        const { questions } = this.state;

        return (
            <div className={classes.root}>
                {this.state.loading ? (
                    <LinearProgress style={{ marginTop: '-2vh' }} color="primary" />
                    ) :

                    (<Grid className={classNames(classes.layout, classes.cardGrid)} container spacing={40}>
                    {Object.keys(questions).map(question => (
                        <Grid item key={questions[question].data._id} sm={6} md={4} lg={3}>
                            <Card className={classes.card}>
                                <CardContent className={classes.cardContent}>
                                    <div className={classes.cardThumb} style={{ background: questions[question].isComplete ? questions[question].score === 100 ? 'rgb(46, 204, 113)' : 'rgb(78, 205, 196)'  : 'rgb(255, 255, 126)'}}>
                                        <Typography variant="button" style={{ fontSize: '1em' }}>
                                            {questions[question].isComplete ? questions[question].score.toFixed(0) + '%' : 'Not Attempted'}
                                        </Typography>
                                    </div>

                                    <List>
                                        {questions[question].data.tags.map(tag => (
                                            <ListItem key={tag} >
                                                <ListItemText
                                                    primary={prettyTags[tag]}
                                                    secondary={showOverlay ? 'Required: ' + questions[question].data.skills.required[tag] + ', Granted: ' + questions[question].data.skills.granted[tag] : ''}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </CardContent>
                                <CardActions style={{ justifyContent: 'center' }}>
                                    <Button
                                        onClick={() => this.props.handleQuestionClick({...questions[question].data, isComplete: questions[question].isComplete, score: questions[question].score})}
                                        size="small"
                                        color="primary">
                                        {questions[question].isComplete ? 'Restart Puzzle' : 'Start Puzzle' }
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid> )}

            </div>
        );
    }
}

export default withStyles(Style)(ExerciseSelection);
