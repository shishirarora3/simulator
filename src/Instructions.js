import React from "react";

const Instructions = () => (<div>
    <h2>Instructions to use</h2>
    <div>
        Enter one of following commands, in the command box, to interact with robot:
        <ol>
            <li>PLACE X,Y,F, where F can be one of N, E, W, S, for North, East, West, South</li>
            <li>MOVE</li>
            <li>LEFT</li>
            <li>RIGHT</li>
            <li>REPORT</li>
        </ol>
    </div>
</div>);

export default Instructions;
