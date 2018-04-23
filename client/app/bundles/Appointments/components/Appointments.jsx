import React, { PropTypes } from 'react';
import AppointmentForm from './AppointmentForm';
import { AppointmentsList } from './AppointmentsList';
import { FormErrors } from './FormErrors';

import update from 'immutability-helper'

export default class Appointments extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      appointments: this.props.appointments,
      title: { value: '', valid: false },
      apt_time: { value: new Date(), valid: false },
      formErrors: {},
      formValid: false
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  addNewAppointment(appointment){
    const appointments = update(
      this.state.appointments, {
        $push: [appointment]
      })
    this.setState({
      appointments: appointments.sort(function(a,b) {
        return new Date(a.apt_time) - new Date(b.apt_time)
      })
    })
  }
  handleFormSubmit() {
    const appointment = {
      title: this.state.title.value,
      apt_time: this.state.apt_time.value
    }
    $.post('/appointments',
      {appointment: appointment})
    .done((data) => {
      this.addNewAppointment(data)
      this.resetFormErrors();
    })
    .fail((response) => {
      this.setState({
        formErrors: response.responseJSON
      })
    })
  }

  resetFormErrors() {
    this.setState({
      formErrors: {}
    })
  }

  handleUserInput(fieldName, fieldValue, validations) {
    const newFieldState = update(this.state[fieldName], {value: {$set: fieldValue}})
    this.setState({
      [fieldName]: newFieldState,
    }, () => { this.validateField(fieldName, fieldValue, validations)})
  }

  validateField(fieldName, fieldValue, validations) {
    let fieldValid;
    let fieldErrors= validations.reduce((errors, validation) => {
      let e = validation(fieldValue)
      if (e !== '') {
        errors.push(e)
      }
      return errors;
    },[]);
    fieldValid = fieldErrors.length === 0;
    const newFieldState = update(this.state[fieldName], {valid: {$set: fieldValid}})
    const newFormErrors = update(this.state.formErrors, {$merge: {[fieldName]: fieldErrors}})
    this.setState({
      [fieldName]: newFieldState,
      formErrors: newFormErrors,
    }, this.validateForm)
  }

  validateForm(){
    this.setState({
      formValid: this.state.title.valid && this.state.apt_time.valid
    })
  }

  render() {
    return (
      <div>
        <FormErrors
          formErrors={this.state.formErrors}
        />
        <AppointmentForm
          title={this.state.title}
          apt_time={this.state.apt_time}
          formValid={this.state.formValid}
          onUserInput= {this.handleUserInput}
          onFormSubmit= {this.handleFormSubmit}
           />
        <AppointmentsList appointments={this.state.appointments} />
      </div>
    )
  }
};

Appointments.propTypes = {
  appointments: PropTypes.array.isRequired,
}
