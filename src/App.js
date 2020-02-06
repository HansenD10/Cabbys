import React, { Component } from "react"
import "bootstrap/dist/css/bootstrap.min.css"

import Header from "./components/header"
import HomePage from "./components/homepage"
import Hours from "./components/hours"
import Menu from "./components/menu"
import Events from "./components/events"
import Gallery from "./components/gallery"
import About from "./components/about"

import KenticoService from "./services/kentico-service"

import "./styles/_typography.scss"
import "./styles/_base.scss"

export default class App extends Component {
  constructor(props) {
    super();
    this.kenticoService = new KenticoService();
    this.kenticoService.GetData()
      .then(data => this.setState(data));  
  }

  render() {
    return this.state ? ( 
        <React.Fragment>
          <script src="https://kit.fontawesome.com/6128e76e98.js"></script>
            <Header nav={this.state.nav} logo={this.state.homepage.logo} />
            <HomePage backgroundImage={this.state.homepage.backgroundImage} />
            <Hours hours={this.state.hours} />
            <Menu menu={this.state.menu} />
            <Events events={this.state.eventList} links={this.state.about.socialMediaLinks} />
            <Gallery gallery={this.state.gallery} />
            <About about={this.state.about} />
        </React.Fragment>
      ) : <span></span>;
  }
}
