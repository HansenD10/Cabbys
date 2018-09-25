import React, { Component } from 'react'
import '../../../Styles/About.css'
import Header from '../../Admin/Header'
import SnackbarContainer from 'react-md/lib/Snackbars'
import axios from 'axios'

export default class About extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isChanged: false,
      aboutBlurb: this.props.contact.content,
      toasts: []
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange = (e) => {
    let aboutBlurb = e.target.value
    this.setState({aboutBlurb, isChanged: true})
  }

  reset = () => {
    let aboutBlurb = this.props.contact.content
    this.setState({aboutBlurb, isChanged: false})
  }

  update = () => {
    let { aboutBlurb } = this.state 

    axios.put('../api/contact', {
      data: { content: aboutBlurb.trim() }
    }, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token')}
    }).then(() => {
      const toasts = this.state.toasts.slice()
      toasts.push({text: 'Successfully Updated Blurb'})
      this.setState({ isChanged: false, toasts })
    }).catch((err) => {
      const toasts = this.state.toasts.slice()
      toasts.push({text: 'Error Updating Blurb'})
      this.setState({ toasts })
    })
  }

  render() {
    let { isChanged, toasts, aboutBlurb } = this.state

    return (
      <div className="about-wrapper">
        <SnackbarContainer
          id="snackbar"
          toasts={toasts}
          autohide={true}
          onDismiss={() => this.setState({ toasts: [] })} />
        <Header title="About Blurb" isChanged={isChanged} reset={this.reset} update={this.update} />
        <textarea
          className="about-form"
          onChange={this.onChange}
          value={aboutBlurb}
          placeholder="Write a small paragraph about your restaraunt."></textarea>
      </div>
    )
  }
}
