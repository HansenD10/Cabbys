import React, { Component } from 'react';
import { Element } from 'react-scroll';
import LazyLoad from 'react-lazyload';

import { transformImage } from '../services/image-service';
import Modal from './modal';

import '../styles/_gallery.scss';
import { ElementModels } from '@kentico/kontent-delivery';

interface GalleryProps {
  gallery: ElementModels.AssetModel[];
}

interface GalleryState {
  selectedImage: ElementModels.AssetModel | undefined;
  isOpen: boolean;
}

export default class Gallery extends Component<GalleryProps, GalleryState> {
  constructor(props: GalleryProps) {
    super(props);
    this.state = {
      selectedImage: undefined,
      isOpen: false
    };
  }

  shouldComponentUpdate(
    nextProps: GalleryProps,
    nextState: GalleryState
  ): boolean {
    return (
      !(JSON.stringify(nextProps) === JSON.stringify(this.props)) ||
      this.state.isOpen !== nextState.isOpen ||
      this.state.selectedImage !== nextState.selectedImage
    );
  }

  handleImageSelect(image: ElementModels.AssetModel): void {
    this.setState({ isOpen: true, selectedImage: image });
  }

  handleClose(): void {
    this.setState({ isOpen: false });
  }

  render(): React.ReactNode {
    const { gallery } = this.props;
    const { isOpen, selectedImage } = this.state;

    return (
      <Element
        name="gallery"
        id="#gallery"
        className="gallery-wrapper container"
      >
        <div className="image-row row">
          {gallery.map(
            (image: ElementModels.AssetModel): React.ReactNode => {
              return (
                <div
                  onClick={(): void => this.handleImageSelect(image)}
                  key={image.name}
                  id={image.name}
                  className="col-6 col-sm-4 col-md-3 col-lg-2 image-wrapper"
                >
                  <LazyLoad height={600} offset={200}>
                    <picture>
                      <source
                        media="(min-width: 1200)"
                        srcSet={transformImage(image.url, 185, 250)}
                      />
                      <source
                        media="(min-width: 992px)"
                        srcSet={transformImage(image.url, 140, 195)}
                      />
                      <source
                        media="(min-width: 768px)"
                        srcSet={transformImage(image.url, 190, 250)}
                      />
                      <source
                        media="(max-width: 767px)"
                        srcSet={transformImage(image.url, 180, 240)}
                      />
                      <img src={image.url} alt={image.name} />
                    </picture>
                  </LazyLoad>
                </div>
              );
            }
          )}
        </div>
        <Modal
          isOpen={isOpen}
          image={selectedImage}
          handleClose={(): void => this.handleClose()}
        />
      </Element>
    );
  }
}
