import {useState, useEffect} from "react";
import React from 'react';
import './styles/style.css';
import './styles/App.css';
import myFunctions from './calculations/myFunctions';

function SolarResultsUVI(props) {

    const [app, setApp] = useState(
        myFunctions(props)
    );

    useEffect(() => {
        props.childFunc1.current = update
      },)

    function update() {
        setApp(myFunctions(props))
    }

    const background = String(app.uvIndexWarning.background);
    const color = String(app.uvIndexWarning.color);

    const myStyle1 = {
        color: color,
        background: background,
        padding: "10px",
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
        <div className="calc">
            {/* <div>
                <button onClick={update}>Calculate solar calculations UVI</button>
            </div> */}
            <h1 className="App-header">Solar UVI calculations</h1>
            <div className="uv_index" style={myStyle1}>
                {"uvIndexWarning.background: "} {app.uvIndexWarning.background}
                <p className="item">{"uvIndex: "} {app.uvIndex}</p>
                <p>{app.uvIndexWarning.value}</p>
            </div>
            <p className="item">{"uvIndexEnd: "} {app.uvIndexEnd}</p>
            <p className="item">{"uvIndexMax: "} {app.uvIndexMax}</p>
            <p className="item">{"uvIndexMaxAnnual: "} {app.uvIndexMaxAnnual}</p>
            <p className="item">{"uvIndexOverThree: "} {app.uvIndexOverThree}</p>
        </div>
    )
}
export default SolarResultsUVI;