class Appointments extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      appointments: this.props.appointments,
      title: 'Fuck',
      apt_time: 'Tomorrow at 9am'
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  addNewAppointment(appointment){
    const appointments = React.addons.update(
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
      title: this.state.title,
      apt_time: this.state.apt_time
    }
    $.post('/appointments',
      {appointment: appointment})
    .done((data) => {
      this.addNewAppointment(data)
    })
  }

  handleUserInput(obj) {
    this.setState(obj)
  }

  render() {
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
};
