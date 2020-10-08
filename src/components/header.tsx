import React, { Component } from 'react';
import { Link } from 'react-scroll';
import '../styles/_nav.scss';
import { transformImage } from '../services/image-service';
import { getScrollAsStream, getScroll } from '../services/scroll-service';
import { Observable } from 'rxjs';
import { ElementModels } from '@kentico/kontent-delivery';
import { Navigation } from '../models/kentico/navigation';
import { NavLink } from '../models/kentico/link';

interface HeaderProps {
  logo: ElementModels.AssetModel;
  nav: Navigation[];
}

interface HeaderState {
  logoStyle: {
    top: string;
    width: string;
  };
  headerStyle: {
    backgroundColor: string;
  };
}

export default class Header extends Component<HeaderProps, HeaderState> {
  private scrollObservable: Observable<number>;

  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      logoStyle: { top: '', width: '' },
      headerStyle: { backgroundColor: '' }
    };

    this.scrollObservable = getScrollAsStream();
  }

  public shouldComponentUpdate(
    nextProps: HeaderProps,
    nextState: HeaderState
  ): boolean {
    return (
      !(JSON.stringify(nextProps) === JSON.stringify(this.props)) ||
      this.state.logoStyle.top !== nextState.logoStyle.top ||
      this.state.logoStyle.width !== nextState.logoStyle.width ||
      this.state.headerStyle.backgroundColor !==
        nextState.headerStyle.backgroundColor
    );
  }

  public componentDidMount(): void {
    this.scrollObservable.subscribe((scroll: number): void => {
      this.setState({
        logoStyle: this.getLogoStyle(scroll),
        headerStyle: this.getNavStyle(scroll)
      });
    });

    const initialScroll = getScroll();

    this.setState({
      logoStyle: this.getLogoStyle(initialScroll),
      headerStyle: this.getNavStyle(initialScroll)
    });
  }

  private getNavStyle(scroll: number): { backgroundColor: string } {
    return {
      backgroundColor: `rgba(19, 113, 175, ${scroll})`
    };
  }

  private getLogoStyle(scroll: number): { width: string; top: string } {
    const logoWidth = (1 - scroll) * (window.innerWidth < 767 ? 300 : 500);
    return {
      top: `${(1 - scroll) * (window.innerHeight / 2 - logoWidth / 2)}px`,
      width: `${logoWidth > 100 ? logoWidth : 100}px`
    };
  }

  renderLink(link: NavLink): React.ReactNode {
    return (
      <div key={link.linkText.value} className="link">
        <Link
          activeClass="active"
          to={link.linkUrl.value}
          duration={500}
          spy={true}
          offset={-50}
          smooth={true}
        >
          {link.linkText.value.replace(/<\/?p>/g, '')}
        </Link>
      </div>
    );
  }

  renderLinks(navs: Navigation[]): React.ReactNode {
    let count = 1;
    return (
      <React.Fragment>
        <div key={count++} className="nav-section">
          {navs[0].links.value.map(
            (link: NavLink): React.ReactNode => this.renderLink(link)
          )}
        </div>
        <div key={count++} className="nav-section">
          {navs[1].links.value.map(
            (link: NavLink): React.ReactNode => this.renderLink(link)
          )}
        </div>
      </React.Fragment>
    );
  }

  render(): React.ReactNode {
    const { headerStyle, logoStyle } = this.state;
    const { logo, nav } = this.props;

    return (
      <header style={headerStyle}>
        <Link to="home" smooth={true} duration={500} spy={true}>
          <picture id="logo">
            <source
              media="(min-width: 768px)"
              srcSet={transformImage(logo.url, 500, 500)}
            />
            <source
              media="(max-width: 767px)"
              srcSet={transformImage(logo.url, 300, 300)}
            />
            <img
              className="logo"
              style={logoStyle}
              src={transformImage(logo.url, 500, 500)}
              alt={logo.name}
            />
          </picture>
        </Link>
        <div className="nav-links">
          <div id="nav-bar" className="navbar">
            {this.renderLinks(nav)}
          </div>
        </div>
      </header>
    );
  }
}
