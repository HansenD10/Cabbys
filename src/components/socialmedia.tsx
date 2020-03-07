import React, { SFC } from 'react';
import { SocialMediaLink } from '../models/KenticoModels';

interface SocialMediaLinkProps {
  links: SocialMediaLink[];
}

const SocialMedia: SFC<SocialMediaLinkProps> = ({ links }: SocialMediaLinkProps) => {
  return (
    <React.Fragment>
      {
        links.map(link => {
          return (
            <a key={link.link} rel="noopener noreferrer" target="_blank" href={link.link}>
              <img alt={`link to ${link.link}`} className="icon" src={link.linkIcon.url} />
            </a>
          )
        })
      }
    </React.Fragment>
  )
}

export default SocialMedia