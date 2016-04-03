import React from 'react'
import ReactDOM from 'react-dom'

class Trackpad extends React.Component {

  constructor(props) {
    super(props)

    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)

    this.state = {
      position: {
        x: 0,
        y: 0
      }
    }
  }

  handleMouseMove(e) {
    const offset = $(ReactDOM.findDOMNode(this)).offset()

    this.setState({
      position: {
        x: e.pageX - offset.left,
        y: e.pageY - offset.top
      }
    })

    this.props.onMouseMove(this.state.position)
  }

  handleMouseDown(e) {
    this.props.onMouseDown(e)
  }

  handleMouseUp(e) {
    this.props.onMouseUp(e)
  }

  render() {
    return (
      <div className='trackpad'
        onMouseMove={this.handleMouseMove}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
      ></div>
    )
  }
}

export default Trackpad
