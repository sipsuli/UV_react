
import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'

export default function AppCalendar(props) {
  const [dateState, setDateState] = useState(new Date())
  const changeDate = (e) => {
    setDateState(e)
    props.handleSubmit(e);
  }
  function handleSubmit(event) {
   changeDate(new Date());
  }

  return (
    <>
        <Calendar
          value={dateState}
          onChange={changeDate}
        />
        <div className="col-4"><p>AIKA</p></div>
        <div className="col-4"><input type="text" placeholder={moment(dateState).format('Do MMMM YYYY')} name="search">
        </input>
        {/* <button type="submit"><i class="fa fa-search"></i></button> */}
        </div>
        <div className="col-4">
        <p>{moment(dateState).format('hh:mm:ss')}</p>
        </div>
        <button onClick={handleSubmit}>Set current date</button>
    </>
  )
}