import React, { PropTypes } from 'react';
import Datetime from 'react-datetime';
import moment from 'moment'
import { validations } from '../utils/validations'

export default class AppointmentForm extends React.Component {

  static formValidations = {
    title:[
      (s) => validations.checkMinLength(s, 3)],
    apt_time:[
      (time) => validations.checkAptTime(time)]
  }
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setAptTime = this.setAptTime.bind(this)
  }
  handleChange(e){
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    this.props.onUserInput(fieldName, fieldValue,
      AppointmentForm.formValidations[fieldName])
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.onFormSubmit();
  }

  setAptTime(e) {
    const fieldName = 'apt_time';
    const fieldValue = e.toDate();
    this.props.onUserInput(fieldName, fieldValue,
      AppointmentForm.formValidations[fieldName])
  }

  render() {
    const inputProps = {
      name: 'apt_time',
    }

    return (
      <div key="appointment_form">
        <h2> Make an appointment </h2>
        <form onSubmit={this.handleSubmit}>
          <input
            name='title'
            placeholder='Appointment title'
            value= {this.props.title.value}
            onChange= {this.handleChange}/>
            <Datetime
            input={false}
            inputProps={inputProps}
            value= {moment(this.props.apt_time.value)}
            onChange= {this.setAptTime}/>
          <input type='submit'
            value= "Make an appointment"
            className="submit-button"
            disabled={!this.props.formValid} />
        </form>
      </div>
    )
  }
};

AppointmentForm.propTypes = {
  apt_time: PropTypes.shape({
    value: PropTypes.instanceOf(Date).isRequired,
    valid: PropTypes.bool.isRequired
  }),
  title: PropTypes.shape({
    value: PropTypes.string.isRequired,
    valid: PropTypes.bool.isRequired
  }),
  formValid: PropTypes.bool.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onUserInput: PropTypes.func.isRequired
}
