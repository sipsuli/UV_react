import {useState, useEffect} from "react";
import React from 'react';
import './styles/style.css';
import './styles/App.css';
import myFunctions from './calculations/myFunctions';

function SolarResultsSunSet(props) {

    const [app, setApp] = useState(
        myFunctions(props)
    );

    useEffect(() => {
        props.childFunc3.current = update
      },)

    function update() {
        setApp(myFunctions(props))
    }

    return (
        <div>
            {/* <div>
                <button onClick={update}>Calculate solar calculations</button>
            </div> */}
            <br></br>
            <h1 className="App-header">Solar Sunset calculations</h1>
            <p className="item">{"timeRize: "} {app.timeRize}</p>
            <p className="item">{"timeRizeAstronomical: "} {app.timeRizeAstronomical}</p>
            <p className="item">{"timeRizeCivil: "} {app.timeRizeCivil}</p>
            <p className="item">{"timeSetNautical: "} {app.timeSetNautical}</p>
            <p className="item">{"timeSet: "} {app.timeSet}</p>
            <p className="item">{"timeSetAstronomical: "} {app.timeSetAstronomical}</p>
            <p className="item">{"timeSetCivil: "} {app.timeSetCivil}</p>
            <p className="item">{"timeSetNautical: "} {app.timeSetNautical}</p>
            <p className="item">{"timeSunSouth: "} {app.timeSunSouth}</p>
            <p className="item">{"dayLength: "} {app.dayLength}</p>
        </div>
    )
}
export default SolarResultsSunSet;