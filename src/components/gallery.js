import React, { Component } from 'react';
import { Element } from 'react-scroll';
import LazyLoad from 'react-lazyload';

import { transformImage } from '../services/image-service';
import Modal from './modal';

import '../styles/_gallery.scss';

export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: {},
      isOpen: false
    }
  }

  handleImageSelect = (image) => {
    this.setState({ isOpen: true, selectedImage: image });
  }

  handleClose = () => {
    this.setState({ isOpen: false });
  }

  render() {
    const { gallery } = this.props;
    const { isOpen, selectedImage } = this.state;

    return (
      <LazyLoad offset={200}>
        <Element id="#gallery" className="gallery-wrapper container"> 
          <div className="image-row row">
            {gallery.map(image => {
              return (
                <div onClick={() => this.handleImageSelect(image)} key={image.name} id={image.name} className="col-6 col-sm-4 col-md-3 col-lg-2 image-wrapper">
                  <picture>
                    <source media="(min-width: 1200)" srcset={transformImage(image.url, 185, 250)} />
                    <source media="(min-width: 992px)" srcset={transformImage(image.url, 140, 195)} />
                    <source media="(min-width: 768px)" srcset={transformImage(image.url, 190, 250)} />
                    <source media="(max-width: 767px)" srcset={transformImage(image.url, 180, 240)} />
                    <img src={image.url} alt={image.name} />
                  </picture>
                </div>
              )
            })}
          </div>
        </Element>
        <Modal isOpen={isOpen} image={selectedImage} handleClose={this.handleClose.bind(this)} />
      </LazyLoad>
    )
  }
}