import React, { Component } from 'react'
import '../../Styles/About.css'

export default class About extends Component {
  render() {
    let { content, facebook, instagram, twitter, phone } = this.props.contact

    return (
      <div className="contact-wrapper wrapper">
        <div className="page-block">
          <div className="contact-text">
            <h1>About Us</h1>
            <hr />
            <p></p>
          </div>
          <div className="social-media-icons">
            <h4>Phone: {phone}</h4>
            <a href={facebook}><div className="facebook icon"></div></a>
            <a href={instagram}><div className="instagram icon"></div></a>
            <a href={twitter}><div className="twitter icon"></div></a>
          </div>
        </div>
      </div>
    )
  }
}
