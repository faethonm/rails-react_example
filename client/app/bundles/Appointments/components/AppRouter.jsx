import React from 'react'
import Appointments from './Appointments'
import Appointment from './Appointment'
import AppointmentForm from './AppointmentForm'
import { AppHeader } from './AppHeader'
import {BrowserRouter as Router, Route} from 'react-router-dom'

export default (props) => {
  return (
    <Router>
      <div>
        <Route path="/" component= {AppHeader} />
        <Route exact path="/" render={routerProps => (
          <Appointments {...routerProps} appointments={props.appointments} />
        )}
        />
        <Route exact path="/appointments/:id" component={Appointment} />
        <Route path="/appointments/:id/edit" component={AppointmentForm} />
      </div>
    </Router>
  )
}
