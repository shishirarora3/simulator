import React, {Component} from 'react';
import _ from 'lodash';
import Table from "./Table";
import Instructions from "./Instructions";
import "./App.css";
import {
    findFirstRobot,
    isPlaced,
    move,
    turnLeft,
    turnRight
} from "./helper";
import {connect} from "react-redux";
import {ADD_OR_UPDATE_ROBOTS, SET_ERROR, SET_REPORT} from "./constants";

class App extends Component {
    state = {
        value: ''
    };

    clickHandler = () => {
        const command = this.state.value;
        this.setState({value: ""});
        const primary = command.split(" ");
        const {
            robots, addOrUpdateRobots,
            setReport, setError
        } = this.props;
        let error = false;
        let robot = findFirstRobot(robots);

        switch (primary[0]) {
            case "PLACE":
                const [x, y, f] = _.at(primary[1].split(","), ["[0]", "[1]", "[2]"]);
                addOrUpdateRobots({newRobot: {x, y}, oldRobot: {f}});
                break;

            case "MOVE":
                if (isPlaced(robot)) {
                    setError({error: "Please Place Robot First"});
                    return;
                }
                let newPosition = {x: robot.x, y: robot.y};
                error = move(robot, newPosition);
                if (error) {
                    setError(error);
                }
                addOrUpdateRobots({newRobot: newPosition, oldRobot: robot});
                break;

            case "LEFT":
                if (isPlaced(robot)) {
                    setError({error: "Please Place Robot First"});
                    return;
                }
                error = turnLeft(robot);
                if (error) {
                    setError(error);
                }
                addOrUpdateRobots({newRobot: robot, oldRobot: robot});
                break;

            case "RIGHT":
                if (isPlaced(robot)) {
                    setError({error: "Please Place Robot First"});
                    return;
                }
                error = turnRight(robot);
                if (error) {
                    setError(error);
                }
                addOrUpdateRobots({newRobot: robot, oldRobot: robot});
                break;

            case "REPORT":
                if (isPlaced(robot)) {
                    setError({error: "Please Place Robot First"});
                    return;
                }
                setReport({report: robot});
                break;

            default:
                setError({error: "invalid command"});
        }
    };


    render() {
        const {row, column, robots, error, report} = this.props;
        const {value} = this.state;
        const isReport = !_.isEmpty(report);
        return <div className="container">
            <h1 className="heading">Robot Simulator</h1>
            <div className= {error? "report error": "report"}>
                {isReport? <span>Robot is placed as ({report.x}, {report.y}) facing {report.f}</span>: error}
            </div>
            <Table row={row} column={column} robots={robots}/>
            <div className="box">
                <label htmlFor="command">Command Box: <input
                    type="text" id="command"
                    value={value}
                    onChange={(e) => {
                        this.setState({value: e.target.value});
                    }}/>
                </label>
                <button onClick={this.clickHandler}>Submit
                </button>
            </div>
            <Instructions/>
        </div>;
    }
}


export default connect(
    (state) => state
    , (dispatch, props) => ({
        addOrUpdateRobots: (payload) => dispatch({
            type: ADD_OR_UPDATE_ROBOTS,
            payload: {...props, ...payload}
        }),
        setReport: (payload) => dispatch({
            type: SET_REPORT,
            payload
        }),
        setError: (payload) => dispatch({
            type: SET_ERROR,
            payload
        }),
    })
)(App);
