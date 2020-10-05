import React, { SFC } from 'react';
import { SocialMediaLink } from '../models/kentico/social_media_link';

interface SocialMediaLinkProps {
  links: SocialMediaLink[];
}

const SocialMedia: SFC<SocialMediaLinkProps> = ({
  links
}: SocialMediaLinkProps): React.ReactElement => {
  return (
    <React.Fragment>
      {links.map(
        (link: SocialMediaLink): React.ReactNode => {
          return (
            <a
              key={String(link.link.value)}
              rel="noopener noreferrer"
              target="_blank"
              href={String(link.link.value)}
            >
              <img
                alt={`link to ${link.link.value}`}
                className="icon"
                src={link.icon.value[0].url}
              />
            </a>
          );
        }
      )}
    </React.Fragment>
  );
};

export default SocialMedia;
