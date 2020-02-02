import PropTypes from "prop-types"
import React, { Component } from "react"
import { Link } from "react-scroll"
import "../styles/_nav.scss"
import { transformImage } from "../services/image-service"
import { getScrollAsStream } from "../services/scroll-service"

const windowGlobal = typeof window !== 'undefined' && window;

export default class Header extends Component { 
  constructor(props) {
    super(props)
    this.state = {
      scroll: 0
    }
    this.nav = props.nav;
    this.logo = props.logo;
  }

  componentWillMount() {
    if (windowGlobal) {
      this.scrollObservable = getScrollAsStream();
      this.scrollObservable.subscribe(scroll => {
        this.setState({ 
          scroll,
          logoStyle: this.getLogoStyle()
        })
      })
    }
    this.setState({
      ...this.state,
      logoStyle: this.getLogoStyle()
    })
  }

  getNavStyle() {
    return {
      backgroundColor: `rgba(19, 113, 175, ${this.state.scroll})`
    }
  }

  getLogoStyle() {
    const logoWidth = (1 - this.state.scroll) * (windowGlobal.innerWidth < 767 ? 300 : 500);
    return {
      top: `${(1 - this.state.scroll) * (windowGlobal.innerHeight / 2 - logoWidth / 2)}px`,
      width: `${logoWidth > 100 ? logoWidth : 100}px`       
    };
  }

  render() {
    return (
      <header style={this.getNavStyle()}>
        <Link
          to="home"
          smooth={true}
          duration={500}
          spy={true}>
          <picture id="logo">
            <source media="(min-width: 768px)" srcSet={transformImage(this.logo.url, 500, 500)} />
            <source media="(max-width: 767px)" srcSet={transformImage(this.logo.url, 300, 300)} />
            <img className="logo" style={this.state.logoStyle} src={this.logo.url} alt={this.logo.name} />
          </picture>
        </Link>
        <div className="nav-links">
          <div id="nav-bar" className="navbar">
            {this.nav.map((section, i) => {
              return (
                <div key={i} className="nav-section">
                  {section.map(link => {
                    return (
                      <div key={link.linkText} className="link">
                        <Link 
                          activeClass="active" 
                          to={link.linkUrl} 
                          duration={500} 
                          spy={true}
                          offset={50}
                          smooth={true}
                          onSetActive={(e) => console.log(e)}
                          >{link.linkText.replace(/<\/?p>/g, '')}</Link>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
        <div className="menu-icon">
            <i className="fas fa-bars" aria-hidden="true"></i>
        </div>
      </header>
    )
  }
}


Header.propTypes = {
  logo: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string
  }),
  nav: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
    linkText: PropTypes.string,
    linkUrl: PropTypes.string
  }))).isRequired
}