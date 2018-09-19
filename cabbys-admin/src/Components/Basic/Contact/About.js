import React, { Component } from 'react'
import '../../../Styles/Contact.css'
import Header from '../../Admin/Header'
import SnackbarContainer from 'react-md/lib/Snackbars'

export default class About extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isChanged: false,
      toasts: []
    }
  }
  
  render() {
    let { isChanged, toasts } = this.state

    return (
      <div className="contact-wrapper">
        <SnackbarContainer 
          style={{textAlign: 'center'}}
          id="snackbar"
          toasts={toasts}
          autohide={true} 
          onDismiss={() => this.setState({toasts: []})} />
        <Header title="Contact Information" isChanged={isChanged} reset={this.reset} update={this.update} />
      </div>
    )
  }
}
