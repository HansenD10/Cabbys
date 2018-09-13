import React, { Component } from 'react'
import '../../Styles/About.css'

export default class About extends Component {
  render() {
    let { contact: { content, phone, facebook, instagram, twitter } } = this.props

    return (
      <div className="contact-wrapper wrapper">
        <div className="page-block">
          <div className="contact-text">
            <h1>About Us</h1>
            <hr />
            <p className="about-blurb">{content}</p>
          </div>
          <h4 className="phone">Phone: {phone}</h4>
          <div className="social-media-icons">
            <a href={facebook}><div className="facebook icon"></div></a>
            <a href={instagram}><div className="instagram icon"></div></a>
            <a href={twitter}><div className="twitter icon"></div></a>
          </div>
        </div>
      </div>
    )
  }
}
