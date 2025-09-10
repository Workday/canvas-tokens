import React from 'react';
import './index.css';

export const AnnouncementBanner = ({img, link, linkText}) => {
  return (
    <a href={link} className="announcement-banner" aria-label={linkText}>
      <img alt={linkText} src={`../images/${img}`} width="100%" />
      <span className="cnvs-sys-type-subtext-large">{linkText}</span>
    </a>
  );
};
