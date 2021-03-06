import React from 'react';
import {useState, useRef, useEffect} from 'react'
import AppCalendar from './AppCalendar';
import MapMaker from './MapMakers/MapMaker';
import Container from 'react-bootstrap/Container';
import InputLocation from './InputLocation';
import SolarResultsUVI from './SolarResultsUVI';
import SolarResultsPower from './SolarResultsPower';
import SolarResultsSunSet from './SolarResultsSunSet';
import SolarResultsPosition from './SolarResultsPosition';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
// import Navbar from './Navbar';

function App() {

  const [dateState, setDate] = useState(new Date());

  function changeDate(newdate) {

    const datenow = new Date();
    newdate = new Date(newdate);

    if (newdate.valueOf() === datenow.valueOf()) {
      setDate(datenow);
    }
    else {
      newdate = new Date(newdate.setHours(12));
      setDate(newdate);
    }
  }

  const [locState, setLocation] = useState({
    lat: '60.20',
    lon: '24.90'
  });

  function changeLocation(newlocation) {
    setLocation({
      lat: newlocation.lat,
      lon: newlocation.lon
    });
  }

  useEffect(() => {
    childFunc1.current()
    childFunc2.current()
    childFunc3.current()
    childFunc4.current()
  }, [locState]);

  const childFunc1 = useRef(null);
  const childFunc2 = useRef(null);
  const childFunc3 = useRef(null);
  const childFunc4 = useRef(null);

  return (
    <section>
        <nav>
          <ul>
          </ul>
        </nav>
    <Container className="container">
      <div className="row">
        <div className="col-8">
          <Container className="box"><AppCalendar handleSubmit={changeDate} /></Container>
        </div>
        <div className="col-4">
          <Container className="box">
                  <div class="search-container">
                    <form action="/action_page.php">
                      <input type="text" placeholder="Hae sijainti.." name="search"></input>                      
                      <button type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                    </form>
                  </div>
          </Container>
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <Container className="box"><SolarResultsUVI longitude={locState.lon} latitude={locState.lat} date={dateState} childFunc1={childFunc1}/></Container>
        </div>
        <div className="col-4">
          <Container className="box"><SolarResultsPower longitude={locState.lon} latitude={locState.lat} date={dateState} childFunc2={childFunc2}/></Container>
          <Container className="box"><SolarResultsSunSet longitude={locState.lon} latitude={locState.lat} date={dateState} childFunc3={childFunc3}/></Container>
          <Container className="box"><SolarResultsPosition longitude={locState.lon} latitude={locState.lat} date={dateState} childFunc4={childFunc4}/></Container>
        </div>
        <div className="col-4">
          <Container className="box map-container"><MapMaker /><InputLocation handleChange={changeLocation} /></Container>
        </div>
      </div>
      </Container>
    </section>
  );
}

export default App;