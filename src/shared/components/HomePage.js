import React from 'react'
import ReactDOM from 'react-dom'
import Trackpad from './Trackpad'

const socket = io()

class HomePage extends React.Component {

  constructor(props) {
    super(props)

    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)

    this.state = {
      mouseDown: false,
      bearing: 0
    }
  }

  handleMouseMove(pos) {
    const element = ReactDOM.findDOMNode(this)
    const width = 640
    const height = 480

    const x = pos.x - width / 2
    const y = height / 2 - pos.y

    const radians = Math.atan2(y, x)
    let degrees = radians * (180 / Math.PI)

    if ((x > 0) && (y > 0)) {
      degrees = 90 - degrees
    } else if ((x > 0) && (y < 0)) {
      degrees*= -1
      degrees+= 90
    } else if ((x < 0) && (y < 0)) {
      degrees*= -1
      degrees+= 90
    } else if ((x < 0) && (y > 0)) {
      degrees = 450 - degrees
    }

    const bearing = Math.round(degrees)

    this.setState({
      bearing: Math.round(degrees)
    })

    socket.emit('event', {
      mouseDown: this.state.mouseDown,
      bearing: bearing
    })
  }

  handleMouseDown(e) {
    e.stopPropagation()
    e.preventDefault()

    this.setState({
      mouseDown: true
    })

    socket.emit('event', {
      mouseDown: true,
      bearing: this.state.bearing
    })
  }

  handleMouseUp(e) {
    e.stopPropagation()
    e.preventDefault()

    this.setState({
      mouseDown: false
    })

    socket.emit('event', {
      mouseDown: false,
      bearing: this.state.bearing
    })
  }

  render() {
    return (
      <div className='row'>
        <h1>Bekti Cloud BB-8</h1>
        <Trackpad
          onMouseMove={this.handleMouseMove}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
        />
      </div>
    )
  }
}

export default HomePage
