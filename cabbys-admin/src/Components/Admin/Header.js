import React, { Component } from 'react'
import '../../Styles/Header.css'

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showButtons: this.props.isChanged
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({showButtons: nextProps.isChanged})
  }

  render() {
    let { showButtons } = this.state
    let { title, reset, update } = this.props
    return (
      <div className="header">
          <h3>{title}</h3>
          {showButtons ? (
          <div className="btn-group">
            <p 
              className="update-btn"
              onClick={update}>Update</p>
            <p
              className="reset-btn"
              onClick={reset}>Reset</p>
          </div>
          ) : (
            null
          )}
        </div>
    )
  }
}
