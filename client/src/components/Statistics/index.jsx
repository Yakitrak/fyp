import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Style from './style';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Axios from "axios/index";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow'
const RadarChart = require("react-chartjs").Radar;

const prettyTags = {
    "bool_operators": "Boolean Logic & Operators",
    "control": "Control Structures",
    "functions": "Functions",
    "dictionary": "Dictionary",
    "exceptions": "Error handling",
    "readwrite": "Read / Write ",
    "list": "Lists"
};

class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            skills: {},
        };
    }

    componentDidMount() {
        Axios.get('/getUserSkill')
            .then((resp) => {
                if(resp.data.success){
                    this.setState({
                        skills: resp.data.skills,
                    });
                } else {
                    console.log('Skill Display Updated');
                }
            })
            .catch((err) => {
                console.log("Can't display skill!", err);
            });
    };

    render() {
        const { classes } = this.props;
        const { skills } = this.state;

        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                       User Skill Statistics
                    </Typography>

                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell> Skill </TableCell>
                                <TableCell align="right"> Value </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.keys(skills).map(skill => (
                                <TableRow key={skill}>
                                    <TableCell component="th" scope="row">
                                        {prettyTags[skill]}
                                    </TableCell>
                                    <TableCell align="right">{skills[skill]}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <RadarChart data={{
                        labels: Object.keys(skills).map(skill => prettyTags[skill]),
                        datasets: [{
                            data: Object.keys(skills).map(skill => skills[skill]),
                        }]
                    }} width="600" height="250"/>

                </CardContent>

            </Card>
        );
    }
}

export default withStyles(Style)(Statistics);
