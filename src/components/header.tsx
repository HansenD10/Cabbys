import React, { Component } from "react"
import { Link } from "react-scroll"
import { Navigation, Asset, NavLink } from '../models/KenticoModels';
import "../styles/_nav.scss"
import { transformImage } from "../services/image-service"
import { getScrollAsStream } from "../services/scroll-service"
import { Observable } from "rxjs";

interface HeaderProps {
  logo: Asset,
  nav: Navigation
}

interface HeaderState {
  scroll: number,
  logoStyle: {
    top: string,
    width: string
  }
}

export default class Header extends Component<HeaderProps, HeaderState> { 
  private scrollObservable: Observable<number>;

  constructor(props: HeaderProps) {
    super(props)
    this.state = {
      scroll: 0,
      logoStyle: { top: "", width: "" }
    }
  
    this.scrollObservable = getScrollAsStream();  
  }

  public componentDidMount(): void {
    this.scrollObservable.subscribe(scroll => {
      this.setState({ scroll, logoStyle: this.getLogoStyle() })
    });

    this.setState({
      ...this.state,
      logoStyle: this.getLogoStyle()
    })
  }

  private getNavStyle(): { backgroundColor: string } {
    return {
      backgroundColor: `rgba(19, 113, 175, ${this.state.scroll})`
    }
  }

  private getLogoStyle(): { width: string, top: string } {
    const logoWidth = (1 - this.state.scroll) * (window.innerWidth < 767 ? 300 : 500);
    return {
      top: `${(1 - this.state.scroll) * (window.innerHeight / 2 - logoWidth / 2)}px`,
      width: `${logoWidth > 100 ? logoWidth : 100}px`       
    };
  }

  renderLink(link: NavLink): React.ReactNode {
    return (
      <div key={link.linkText} className="link">
        <Link 
          activeClass="active" 
          to={link.linkUrl} 
          duration={500} 
          spy={true}
          offset={-50}
          smooth={true}
          >{link.linkText.replace(/<\/?p>/g, '')}</Link>
      </div>
    )
  }

  renderLinks(links: NavLink[]): React.ReactNode {
    let count = 1;

    return (
      <React.Fragment>
        <div key={count++} className="nav-section">
          {links.slice(0, 2).map(link => this.renderLink(link))}
        </div>
        <div key={count++} className="nav-section">
          {links.slice(2,4).map(link => this.renderLink(link))}
        </div>
      </React.Fragment>
    );
  }

  render() {
    return (
      <header style={this.getNavStyle()}>
        <picture id="logo">
          <source media="(min-width: 768px)" srcSet={transformImage(this.props.logo.url, 500, 500)} />
          <source media="(max-width: 767px)" srcSet={transformImage(this.props.logo.url, 300, 300)} />
          <Link
            to="home"
            smooth={true}
            duration={500}
            spy={true}>
            <img className="logo" style={this.state.logoStyle} src={this.props.logo.url} alt={this.props.logo.name}  />
          </Link>
        </picture>
        <div className="nav-links">
          <div id="nav-bar" className="navbar">
            {this.renderLinks(this.props.nav.links)}
          </div>
        </div>
      </header>
    )
  }
}