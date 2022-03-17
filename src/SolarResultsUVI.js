import {useState} from "react";
import React from 'react';
import './styles/style.css';
import './styles/App.css';
import myFunctions from './calculations/myFunctions';

function SolarResultsUVI(props) {

    const [app, setApp] = useState(
        myFunctions(props)
    );

    function update() {
        setApp(myFunctions(props))
    }

    const backgroundColor = String(app.uvIndexWarning.backgroundColor);
    const color = String(app.uvIndexWarning.color);

    const myStyle1 = {
        color: color,
        backgroundColor: backgroundColor,
        padding: "10px",
        fontFamily: "Sans-Serif",
        borderRadius: "8px",
        margin: "10px"
      };
      const myStyle2 = {
        color: color,
        backgroundColor: "#bcb3e3",
        padding: "10px",
        fontFamily: "Sans-Serif",
        fontSize: "30px",
        font: "Bold",
        borderRadius: "8px",
        margin: "10px"
      };

    return (
        <div>
            <div>
                <button onClick={update}>Calculate solar calculations UVI</button>
            </div>
            <br></br>
            <h1 className="App-header">Solar UVI calculations</h1>
            <p className="item">{"uvIndex: "} {app.uvIndex}</p>
            <p className="item">{"uvIndexEnd: "} {app.uvIndexEnd}</p>
            <p className="item">{"uvIndexMax: "} {app.uvIndexMax}</p>
            <p className="item">{"uvIndexMaxAnnual: "} {app.uvIndexMaxAnnual}</p>
            <p className="item">{"uvIndexOverThree: "} {app.uvIndexOverThree}</p>
            <p style={myStyle1}>{"uvIndexWarning.backgroundColor: "} {app.uvIndexWarning.backgroundColor}</p>
            <p className="item">{"uvIndexWarning.color: "} {app.uvIndexWarning.color}</p>
            <p style={myStyle2}>{"uvIndexWarning.value: "} {app.uvIndexWarning.value}</p>
        </div>
    )
}
export default SolarResultsUVI;