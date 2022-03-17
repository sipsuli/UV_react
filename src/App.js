import React from 'react';
import {useState} from 'react'
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

    if (newdate.valueOf() == datenow.valueOf()) {
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

  return (
    <section>
        <nav>
          <ul>
            <li><a href="#">London</a></li>
            <li><a href="#">Paris</a></li>
            <li><a href="#">Tokyo</a></li>
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
                      <input type="text" placeholder="Search.." name="search"></input>                      
                      <button type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                    </form>
                  </div>
          </Container>
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <Container className="box"><SolarResultsUVI longitude={locState.lon} latitude={locState.lat} date={dateState} /></Container>
        </div>
        <div className="col-4">
          <Container className="box"><SolarResultsPower longitude={locState.lon} latitude={locState.lat} date={dateState} /></Container>
          <Container className="box"><SolarResultsSunSet longitude={locState.lon} latitude={locState.lat} date={dateState} /></Container>
          <Container className="box"><SolarResultsPosition longitude={locState.lon} latitude={locState.lat} date={dateState} /></Container>
        </div>
        <div className="col-4">
          <Container className="box"><MapMaker /></Container>
          <Container className="box"><InputLocation handleChange={changeLocation} /></Container>
        </div>
      </div>
      </Container>
    </section>
  );
}

export default App;