var Appointments = createReactClass({
  getInitialState: function(){
    return {
      appointments: this.props.appointments,
      title: 'Fuck',
      apt_time: 'Tomorrow at 9am'
    }
  },
  addNewAppointment: function(appointment){
    var appointments = React.addons.update(
      this.state.appointments, {
        $push: [appointment]
      })
    this.setState({
      appointments: appointments.sort(function(a,b) {
        return new Date(a.apt_time) - new Date(b.apt_time)
      })
    })
  },
  handleFormSubmit: function() {
    var appointment = {
      title: this.state.title,
      apt_time: this.state.apt_time
    }
    $.post('/appointments',
      {appointment: appointment})
    .done(function(data) {
      this.addNewAppointment(data)
    }.bind(this))
  },
  handleUserInput: function(obj) {
    this.setState(obj)
  },
  render: function() {
    return (
      <div>
        <AppointmentForm
          title={this.state.title}
          apt_time={this.state.apt_time}
          onUserInput= {this.handleUserInput}
          onFormSubmit= {this.handleFormSubmit}/>
        <AppointmentsList appointments={this.state.appointments} />
      </div>
    )
  }
});
