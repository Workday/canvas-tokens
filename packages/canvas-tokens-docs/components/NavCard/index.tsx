import * as React from 'react';
import './index.css';

export const NavCard = ({description, title, link}) => {
  return (
    <a className="nav-card" href={link} target="_blank" rel="noopener noreferrer">
      <span className="nav-card-header">
        <span>{title}</span>
        <span>→</span>
      </span>
      {description && <span className="nav-card-description">{description}</span>}
    </a>
  );
};
