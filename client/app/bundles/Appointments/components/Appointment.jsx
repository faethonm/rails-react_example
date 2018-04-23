// This can be a stateless component
import React from 'react';
import { formatDate } from '../utils/format'
export const Appointment = ({appointment}) =>
  <div className="appointment">
    <h3> {appointment.title} </h3>
    <p> {formatDate(appointment.apt_time)} </p>
  </div>