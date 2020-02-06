import React from 'react';

const SocialMedia = ({ links }) => {
  return (
    <React.Fragment>
      {
        links.map(link => {
          return (
            <a href={link.link}>
              <img alt={`link to ${link.link}`} className="icon" src={link.linkIcon}/>
            </a>
          )
        })
      }   
    </React.Fragment>
  )
}

export default SocialMedia