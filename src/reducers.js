import {ADD_OR_UPDATE_ROBOTS, SET_ERROR, SET_REPORT} from "./constants";
import _ from "lodash";

const initialState = {
    robots: [],
    report: {},
    error: false
};
export const roboApp = (state = initialState, action) => {
    const {robots} = initialState;
    const {type, payload} = action;
    let nextState = state;
    switch (type) {
        case ADD_OR_UPDATE_ROBOTS:
            const {row, column, newRobot, oldRobot} = payload;
            if (newRobot.x >= row || newRobot.y >= column) { //exceeded dimensions
                nextState = {...state, error: "Command exceeded board dimensions"};
                return nextState;
            } else if (
                !_.includes(["N", "S", "E", "W"], oldRobot.f)
            ) {
                nextState = {...state, error: "invalid direction"};
                return nextState;
            }

            _.set(robots, `[${oldRobot.x}][${oldRobot.y}]`, undefined); //remove old robot
            _.set(robots, `[${newRobot.x}][${newRobot.y}]`, oldRobot.f);//add new robot
            nextState = {
                ...state,
                robots: JSON.parse(JSON.stringify(robots)),
                error: false,
                report: false
            };
            break;
        case SET_REPORT:
            const {report} = payload;
            nextState = {
                ...state,
                error: false,
                report
            };
            break;
        case SET_ERROR:
            nextState = {...state, error: payload.error, report: false};
            break;
        default:
            nextState = state;
    }

    return nextState;
};