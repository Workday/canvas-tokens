import * as React from 'react';
import './index.css';

export interface TokenGridProps<T> {
  headings: React.ReactNode[];
  rows: T[];
  children: (row: T) => React.ReactNode;
  caption?: React.ReactNode;
}

function classNames(baseClassName: string, classNames = '') {
  return classNames.length ? `${baseClassName} ${classNames}` : baseClassName;
}

/** CSS won't break words on dots, so we need to add <wbr> tags manually.
 * This function formats the JS var name so it will break on the dot notation */
export function formatJSVar(varName: string) {
  return varName.split('.').map((identifier, index) => {
    // Don't add a word-break before the first identifier
    if (!index) {
      return identifier;
    }
    return (
      <span key={index}>
        .<wbr />
        {identifier.toLowerCase()}
      </span>
    );
  });
}

export function TokenGrid<T>({caption, children, headings, rows}: TokenGridProps<T>) {
  return (
    <table className="token-grid">
      {caption && (
        <caption className="token-grid__caption cnvs-sys-type-subtext-large">{caption}</caption>
      )}
      <thead className="token-grid__head">
        <tr className="token-grid__row">
          {headings.map((heading, index) => (
            <th key={index} className="token-grid__head-item cnvs-sys-type-subtext-large">
              {heading}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="token-grid__body">
        {rows.map((row, index) => (
          <tr key={index} className="token-grid__row">
            {children(row)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const TokenGridRowItem: React.FC<React.HTMLProps<HTMLTableCellElement>> = ({
  className,
  ...props
}) => (
  <td
    className={classNames('token-grid__row-item cnvs-sys-type-subtext-medium', className)}
    {...props}
  />
);

const TokenGridSample: React.FC<React.HTMLProps<HTMLSpanElement>> = ({className, ...props}) => (
  <span
    className={classNames('token-grid__sample cnvs-sys-type-body-small', className)}
    {...props}
  />
);

const TokenGridSwatch: React.FC<React.HTMLProps<HTMLSpanElement>> = ({className, ...props}) => (
  <span className={classNames('token-grid__swatch', className)} {...props} />
);

const TokenGridMonospaceLabel: React.FC<
  React.HTMLProps<HTMLSpanElement> & {isDeprecated?: boolean}
> = ({className, children, isDeprecated, ...props}) => {
  return (
    <span
      className={classNames(
        'token-grid__monospace-label',
        `cnvs-sys-type-subtext-medium ${
          isDeprecated ? 'token-grid__deprecate-monospace-label' : className
        }`
      )}
      {...props}
    >
      {children}
    </span>
  );
};

TokenGrid.RowItem = TokenGridRowItem;
TokenGrid.Sample = TokenGridSample;
TokenGrid.Swatch = TokenGridSwatch;
TokenGrid.MonospaceLabel = TokenGridMonospaceLabel;
