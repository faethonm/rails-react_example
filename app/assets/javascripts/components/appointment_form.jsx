var AppointmentForm = createReactClass({
  handleChange: function(e){
    var name = e.target.name;
    obj = {}
    obj[name] = e.target.value
    this.props.onUserInput(obj)
  },
  handleSubmit: function(e){
    e.preventDefault();
    this.props.onFormSubmit()
  },
  setAptTime: function(e) {
    var name = 'apt_time'
    obj ={}
    if (obj[name] = e.toDate()) {
      this.props.onUserInput(obj)
    }
  },
  render: function() {
    var inputProps = {
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
});
