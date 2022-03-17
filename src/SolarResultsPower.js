import {useState} from "react";
import React from 'react';
import './styles/style.css';
import './styles/App.css';
import myFunctions from './calculations/myFunctions';

function SolarResultsPower(props) {

    const [app, setApp] = useState(
        myFunctions(props)
    );

    function update() {
        setApp(myFunctions(props))
    }

    return (
        <div>
            <div>
                <button onClick={update}>Calculate solar calculations UVI</button>
            </div>
            <br></br>
            <h1 className="App-header">Solar Power calculations</h1>
            <p className="item">{"solarPower: "} {app.solarPower}</p>
            <p className="item">{"solarPowerMax: "} {app.solarPowerMax}</p>
            <p className="item">{"solarPowerMaxAnnual: "} {app.solarPowerMaxAnnual}</p>
            <p className="item">{"solarPowerAquired: "} {app.solarPowerAquired}</p>
        </div>
    )
}
export default SolarResultsPower;