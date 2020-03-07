import React from "react"
import { Element } from "react-scroll"

import "../styles/_home.scss"

import { transformImage } from "../services/image-service"
import { Asset } from "../models/KenticoModels";

interface HomeProps {
  backgroundImage: Asset
}

const HomePage: React.SFC<HomeProps> = ({ backgroundImage }: HomeProps) => (
  <Element id="home" name="home" className="full-block-wrapper">
    <div className="dark-overlay"></div>
    <div className="background-image-wrapper">
      <picture>
        <source media="(min-width:768px)" srcSet={transformImage(backgroundImage.url, 1200, 1200)} />
        <source media="(max-width:767px)" srcSet={transformImage(backgroundImage.url, 767, 900)} />
        <img src={transformImage(backgroundImage.url, 767, 900)} alt={backgroundImage.name} />
      </picture>
    </div>
  </Element>
)

export default HomePage