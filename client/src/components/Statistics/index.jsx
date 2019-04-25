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
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

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
            isWaiting: true,
            value: 0
        };
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes, skills } = this.props;
        const { value } = this.state;

        let test = Object.keys(skills).map(skill => prettyTags[skill]);
        console.log('test map' , test);
        console.log('skills', skills);

        return (
            <Card className={classes.root}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                       Skill Level
                    </Typography>
                        <RadarChart data={{
                            labels: test,
                            datasets: [{
                                data: Object.keys(skills).map(skill => skills[skill]),
                            }]
                        }} width="600" height="250"/>

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
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(Style)(Statistics);
