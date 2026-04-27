import * as React from 'react';
import './PageHeader.css';

export interface PageHeaderProps {
  title: string;
  description: string;
  dos?: string[];
  donts?: string[];
}

const CheckIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="page-header__rule-icon page-header__rule-icon--do"
  >
    <circle cx="8" cy="8" r="7.25" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M4.5 8l2.5 2.5L11.5 5.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CrossIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="page-header__rule-icon page-header__rule-icon--dont"
  >
    <circle cx="8" cy="8" r="7.25" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M5.5 5.5l5 5M10.5 5.5l-5 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const PageHeader = ({title, description, dos, donts}: PageHeaderProps) => {
  const hasDosOrDonts = (dos && dos.length > 0) || (donts && donts.length > 0);

  return (
    <div className="page-header">
      <h1 className="page-header__title">{title}</h1>
      <p className="page-header__description">{description}</p>

      {hasDosOrDonts && (
        <div className="page-header__rules">
          {dos && dos.length > 0 && (
            <div className="page-header__rules-group">
              <p className="page-header__rules-label page-header__rules-label--do">Do</p>
              <ul className="page-header__rules-list">
                {dos.map((item, i) => (
                  <li key={i} className="page-header__rule-item">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {donts && donts.length > 0 && (
            <div className="page-header__rules-group">
              <p className="page-header__rules-label page-header__rules-label--dont">Don't</p>
              <ul className="page-header__rules-list">
                {donts.map((item, i) => (
                  <li key={i} className="page-header__rule-item">
                    <CrossIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
