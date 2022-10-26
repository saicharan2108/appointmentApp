// Write your code here
import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {name: '', date: '', updatedList: [], active: false}

  markStarred = id => {
    this.setState(prevState => ({
      updatedList: prevState.updatedList.map(eachApp => {
        if (id === eachApp.id) {
          return {...eachApp, isStarred: !eachApp.isStarred}
        }
        return eachApp
      }),
    }))
  }

  filteredStarred = () => {
    const {active} = this.state

    this.setState({active: !active})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {name, date} = this.state

    const newAppointment = {
      id: uuidv4(),
      name,
      date,

      isStarred: false,
    }

    this.setState(prevState => ({
      updatedList: [...prevState.updatedList, newAppointment],
    }))

    this.setState({name: ''})

    this.setState({date: ''})
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangedate = event => {
    this.setState({date: event.target.value})
  }

  getFilteredAppointmentsList = () => {
    const {updatedList, active} = this.state

    if (active) {
      return updatedList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return updatedList
  }

  render() {
    const {name, date} = this.state
    const finalList = this.getFilteredAppointmentsList()

    return (
      <div className="bg-container">
        <div className="card">
          <div className="theme">
            <div className="details">
              <h1 className="title">Add Appointment</h1>
              <form className="form-container" onSubmit={this.onAddAppointment}>
                <label htmlFor="textinput">TITLE</label>
                <input
                  type="text"
                  id="textinput"
                  className="textinput"
                  placeholder="Title"
                  value={name}
                  onChange={this.onChangeName}
                />
                <label htmlFor="dateinput">DATE</label>
                <input
                  type="date"
                  id="dateinput"
                  className="dateinput"
                  placeholder="Title"
                  value={date}
                  onChange={this.onChangedate}
                />
                <button type="submit" className="btn">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="mainImage"
            />
          </div>
          <hr />
          <div className="bottom-container">
            <div className="description">
              <h1>Appointments</h1>
              <button
                className="starredBtn"
                type="button"
                onClick={this.filteredStarred}
              >
                Starred
              </button>
            </div>
            <ul className="unordered-list">
              {finalList.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  name={eachAppointment.name}
                  id={eachAppointment.id}
                  date={eachAppointment.date}
                  isStarClicked={this.markStarred}
                  isStarred={eachAppointment.isStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
