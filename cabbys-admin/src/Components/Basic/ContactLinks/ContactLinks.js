import React, { Component } from 'react'
import '../../../Styles/ContactLinks.css'
import Header from '../../Admin/Header'
import SnackbarContainer from 'react-md/lib/Snackbars'
import axios from 'axios'

export default class ContactLinks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isChanged: false,
      links: {
        email: props.contact.email, 
        facebook: props.contact.facebook, 
        instagram: props.contact.instagram,
        twitter: props.contact.twitter,
        phone:  props.contact.phone
      },
      toasts: []
    }

    this.onChange = this.onChange.bind(this)
  }

  reset = () => {
    let { contact } = this.props

    this.setState({
      links: {
        email: contact.email, 
        facebook: contact.facebook, 
        instagram: contact.instagram,
        twitter: contact.twitter,
        phone: contact.phone
      },
      isChanged: false
    })
  }

  onChange = (e) => {
    let tempState = this.state.links
    tempState[e.target.name] = e.target.value
    this.setState({ links: tempState, isChanged: true })
  }

  update = () => {
    let { links } = this.state 

    axios.put('./api/contact', {
      data: links
    }).then(() => {
      const toasts = this.state.toasts.slice()
      toasts.push({text: 'Successfully Updated Links'})
      this.setState({ isChanged: false, toasts })
    }).catch((err) => {
      const toasts = this.state.toasts.slice()
      toasts.push({text: 'Error Updating Links'})
      this.setState({ toasts })
    })
  }

  render() {
    let { isChanged, toasts, links } = this.state

    return (
      <div className="links-wrapper">
        <SnackbarContainer
          id="snackbar"
          toasts={toasts}
          autohide={true}
          onDismiss={() => this.setState({ toasts: [] })} />
        <Header title="Links" isChanged={isChanged} reset={this.reset} update={this.update} />
        <div className="links-form-group">
          {Object.keys(links).map((link) => {
            return (
              <div className="link-row">
                <h4>{link}</h4>
                <input 
                  value={links[link]} 
                  name={link}
                  onChange={this.onChange} />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
