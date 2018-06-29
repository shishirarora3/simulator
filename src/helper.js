import _ from "lodash";

export const isPlaced = (robot) => {
    return _.isEmpty(robot);
};
export const turnRight = (robot) => {
    switch (robot.f) {
        case "N" :
            robot.f = "E";
            break;
        case "E":
            robot.f = "S";
            break;
        case "S":
            robot.f = "W";
            break;
        case "W":
            robot.f = "N";
            break;
        default:
            return {
                error: "invalid turn direction"
            };
    }
};
export const turnLeft = (robot) => {
    switch (robot.f) {
        case "N" :
            robot.f = "W";
            break;
        case "E":
            robot.f = "N";
            break;
        case "S":
            robot.f = "E";
            break;
        case "W":
            robot.f = "S";
            break;
        default:
            return {
                error: "invalid turn direction"
            };
    }
};
export const move = (robot, newPosition) => {
    switch (robot.f) {
        case "W":
            newPosition.y = robot.y - 1;
            break;
        case "E":
            newPosition.y = robot.y + 1;
            break;
        case "S":
            newPosition.x = robot.x + 1;
            break;
        case "N":
            newPosition.x = robot.x - 1;
            break;
        default:
            return {
                error: "invalid move"
            };
    }
};

/**
 * @param {Array} robots: an array of cells
 * @returns {Object} an object containing position metadata of the first robot in board
 */
export const findFirstRobot = (robots) => {
    let robot;
    _.forEach(robots, (r, x) => {
        _.forEach(r, (f, y) => {
            if (f) {
                robot = {x, y, f};
            }
        })
    });
    return robot;
}