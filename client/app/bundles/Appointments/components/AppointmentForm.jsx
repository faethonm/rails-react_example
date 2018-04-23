import React, { PropTypes } from 'react';
import Datetime from 'react-datetime';
import moment from 'moment'
import { validations } from '../utils/validations'
import { FormErrors } from './FormErrors';
import update from 'immutability-helper'

export default class AppointmentForm extends React.Component {
  static propTypes = {
    handleNewAppointment: PropTypes.func
  }

  static formValidations = {
    title:[
      (s) => validations.checkMinLength(s, 3)],
    apt_time:[
      (time) => validations.checkAptTime(time)]
  }

  constructor(props){
    super(props);
    this.state = {
      title: { value: '', valid: false },
      apt_time: { value: new Date(), valid: false },
      formErrors: {},
      formValid: false,
      editing: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleUserInput = this.handleUserInput.bind(this)
    this.setAptTime = this.setAptTime.bind(this)
    this.deleteAppointment = this.deleteAppointment.bind(this)
  }

   componentDidMount() {
    if (this.props.match){
      $.ajax({
        type: 'GET',
        url: `/appointments/${this.props.match.params.id}`,
        dataType: "JSON"
      }).done((data) => {
        console.log(data)
        this.setState({
          title: { value: data.title, valid: true},
          apt_time: { value: data.apt_time, valid: true},
          editing: this.isEditing()
        })
      })
    }
  }

  isEditing(){
    return this.props.match && this.props.match.path === "/appointments/:id/edit"
  }

  handleChange(e){
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    this.handleUserInput(fieldName, fieldValue,
      AppointmentForm.formValidations[fieldName])
  }

  setAptTime(e) {
    const fieldName = 'apt_time';
    const fieldValue = e.toDate();
    this.handleUserInput(fieldName, fieldValue,
      AppointmentForm.formValidations[fieldName])
  }

  handleUserInput(fieldName, fieldValue, validations) {
    const newFieldState = update(this.state[fieldName], {value: {$set: fieldValue}})
    this.setState({
      [fieldName]: newFieldState,
    }, () => { this.validateField(fieldName, fieldValue, validations)})
  }

  handleFormSubmit(e) {
    // If this method is called, the default action of the event will not be triggered.
    e.preventDefault();
    if (this.isEditing()) {
      this.updateAppointment();
    } else {
      this.addAppointment();
    }
  }

  addAppointment(){
    const appointment = {
      title: this.state.title.value,
      apt_time: this.state.apt_time.value
    }
    $.post('/appointments',
      {appointment: appointment})
    .done((data) => {
      this.props.handleNewAppointment(data)
      this.resetFormErrors();
    })
    .fail((response) => {
      this.setState({
        formErrors: response.responseJSON
      })
    })
  }

  updateAppointment(){
    const appointment = {
      title: this.state.title.value,
      apt_time: this.state.apt_time.value
    }
    $.ajax({
      type: 'PUT',
      url: `/appointments/${this.props.match.params.id}`,
      data: {appointment: appointment}
    })
    .done((data) => {
      console.log('Update appointment success!!')
      this.resetFormErrors();
    })
    .fail((response) => {
      this.setState({
        formErrors: response.responseJSON,
        formValid: false
      })
    })
  }

  deleteAppointment(e){
    if (confirm("Are you sure? ")){
      $.ajax({
        type: 'DELETE',
        url: `/appointments/${this.props.match.params.id}`
      })
      .done((data) => {
        this.props.history.push('/');
      })
      .fail((response) => {
        console.log('delete failed')
      })
    }
  }

  resetFormErrors() {
    this.setState({
      formErrors: {}
    })
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
    const inputProps = {
      name: 'apt_time'
    }

    return (
      <div key="appointment_form">
        <h2>
        {this.state.editing ? 'Update appointment' : 'Make an appointment'}
       </h2>

        <FormErrors
          formErrors={this.state.formErrors}
        />
        <form onSubmit={this.handleFormSubmit}>
          <input
            name='title'
            placeholder='Appointment title'
            value= {this.state.title.value}
            onChange= {this.handleChange}/>
            <Datetime
            input={false}
            inputProps={inputProps}
            value= {moment(this.state.apt_time.value)}
            onChange= {this.setAptTime}/>
          <input type='submit'
            value= {this.state.editing ? 'Update appointment' : 'Make an appointment'}
            className="submit-button"
            disabled={!this.state.formValid} />
        </form>
        {this.state.editing && (
          <p>
            <button onClick={this.deleteAppointment}>
              delete Appointment
            </button>
          </p>
        )}
      </div>
    )
  }
};
