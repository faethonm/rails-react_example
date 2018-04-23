import React, { PropTypes } from 'react';
import Appointment from './Appointment'


export const AppointmentsList = ({appointments}) =>
  <div>
    {appointments.map(function(appointment){
      return (
        <Appointment appointment={appointment} key={appointment.id}/>
      )
    })}
  </div>

AppointmentsList.defaultProps = {
  appointments: []
}

AppointmentsList.propTypes = {
  appointments: PropTypes.array.isRequired
}

