import React, { Component } from 'react'
import '../../Styles/About.css'

export default class About extends Component {
  render() {
    return (
      <div className="contact-wrapper wrapper">
        <div className="page-block">
          <div className="contact-text">
            <h1>About Us</h1>
            <hr />
            <p></p>
          </div>
          <div className="social-media-icons">
            <a href="https://www.facebook.com/CabbysGrillandPatio/"><div className="facebook icon"></div></a>
            <a href="https://www.instagram.com/cabbysgrillandpatio/"><div className="instagram icon"></div></a>
            <a href="https://twitter.com/cabbysgrill"><div className="twitter icon"></div></a>
          </div>
        </div>
      </div>
    )
  }
}
