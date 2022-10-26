// Write your code here
import './index.css'
import {format} from 'date-fns'

const AppointmentItem = props => {
  const {name, date, isStarred, id, isStarClicked} = props

  const applyColor = () => {
    isStarClicked(id)
  }

  const url = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const originaldate = format(new Date(date), 'dd MMMM yyyy, EEEE')
  return (
    <li className="listContainer">
      <div>
        <p className="program">{name}</p>
        <p className="programTime">{originaldate}</p>
      </div>
      <button type="button" onClick={applyColor} className="applyBtn">
        <img src={url} alt="star" className="starImage" />
      </button>
    </li>
  )
}

export default AppointmentItem
