// This can be a stateless component
import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/format'

export default class Appointment extends React.Component {
  static propTypes = {
    appointment: PropTypes.object.isRequired
  }

  static defaultProps = {
    appointment: {}
  }

  constructor(props){
    super(props)
    this.state = {
      appointment: props.appointment
    }
  }

  componentDidMount() {
    if (this.props.match){
      $.ajax({
        type: 'GET',
        url: `/appointments/${this.props.match.params.id}`,
        dataType: "JSON"
      }).done((data) => {
        this.setState({
          appointment: data
        })
      })
    }
  }

  render() {
    return (
      <div className="appointment">
        <Link to={`/appointments/${this.state.appointment.id}`} >
          <h3> {this.state.appointment.title} </h3>
        </Link>
        <p> {formatDate(this.state.appointment.apt_time)} </p>
        <Link to={`/appointments/${this.state.appointment.id}/edit`} >
          Edit
        </Link>
      </div>
    )
  }
}
