import React from 'react';
import Datetime from 'react-datetime';
export default class AppointmentForm extends React.Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setAptTime = this.setAptTime.bind(this)
  }
  handleChange(e){
    const name = e.target.name;
    const obj = {}
    obj[name] = e.target.value
    this.props.onUserInput(obj)
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.onFormSubmit()
  }

  setAptTime(e) {
    const name = 'apt_time'
    const obj ={}
    if (obj[name] = e.toDate()) {
      this.props.onUserInput(obj)
    }
  }

  render() {
    const inputProps = {
      name: 'apt_time',
      value: this.props.apt_time
    }
    return (
      <div key="appointment_form">
        <h2> Make an appointment </h2>
        <form onSubmit={this.handleSubmit}>
          <input
            name='title'
            placeholder='Appointment title'
            value= {this.props.title}
            onChange= {this.handleChange}/>
            <Datetime
            input={false}
            inputProps={inputProps}
            value= {this.props.apt_time}
            onChange= {this.setAptTime}/>
          <input type='submit' value= "Make an appointment" className="submit-button" />
        </form>
      </div>
    )
  }
};
