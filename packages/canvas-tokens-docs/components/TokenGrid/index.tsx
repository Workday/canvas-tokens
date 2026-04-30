import * as React from 'react';
import './index.css';

export interface TokenGridProps<T> {
  headings: React.ReactNode[];
  rows: T[];
  children: (row: T) => React.ReactNode;
  caption?: React.ReactNode;
  /**
   * CSS grid-template-columns value for each row.
   * Defaults to the 4-column system layout: "4.5rem 1fr 1.6fr 1fr"
   * Pass a custom value when the table has a different number of columns.
   * e.g. columns="4.5rem 1.2fr 1.2fr 0.8fr 1fr" for a 5-column deprecated table.
   */
  columns?: string;
}

function classNames(baseClassName: string, classNames = '') {
  return classNames.length ? `${baseClassName} ${classNames}` : baseClassName;
}

/** CSS won't break words on dots, so we need to add <wbr> tags manually.
 * This function formats the JS var name so it will break on the dot notation */
export function formatJSVar(varName: string) {
  return varName.split('.').map((identifier, index) => {
    if (!index) {
      return identifier;
    }
    return (
      <span key={index}>
        .<wbr />
        {identifier}
      </span>
    );
  });
}

/** Inserts optional breaks after each hyphen so custom property names wrap instead of truncating. */
export function formatCssVarLineBreaks(cssVar: string): React.ReactNode {
  return cssVar.split('-').map((segment, i) => (
    <React.Fragment key={i}>
      {i > 0 ? (
        <>
          -<wbr />
        </>
      ) : null}
      {segment}
    </React.Fragment>
  ));
}

export function TokenGrid<T>({caption, children, columns, headings, rows}: TokenGridProps<T>) {
  const style = columns
    ? ({'--token-grid-columns': columns} as React.CSSProperties)
    : undefined;

  return (
    <table className="token-grid" style={style}>
      {caption && (
        <caption className="token-grid__caption cnvs-sys-type-subtext-large">{caption}</caption>
      )}
      <thead className="token-grid__head">
        <tr className="token-grid__row token-grid__row--head">
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

const CopyIcon = () => (
  <svg
    className="token-grid__copy-icon"
    width="12"
    height="12"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M11 5V3.5A1.5 1.5 0 009.5 2h-6A1.5 1.5 0 002 3.5v6A1.5 1.5 0 003.5 11H5"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    className="token-grid__copy-icon token-grid__copy-icon--success"
    width="12"
    height="12"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M3 8l3.5 3.5L13 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TokenGridMonospaceLabel: React.FC<
  React.HTMLProps<HTMLButtonElement> & {
    isDeprecated?: boolean;
    copyText?: string;
    /** When true, value text wraps instead of single-line ellipsis (use for long computed values). */
    allowWrap?: boolean;
  }
> = ({className, children, isDeprecated, copyText, allowWrap, ...props}) => {
  const [copied, setCopied] = React.useState(false);

  const hyphenBreakCssVar =
    typeof children === 'string' && children.startsWith('--');
  const displayContent = hyphenBreakCssVar ? formatCssVarLineBreaks(children) : children;
  const multilineLayout = Boolean(allowWrap || hyphenBreakCssVar);

  const handleCopy = React.useCallback(() => {
    if (!copyText) return;
    navigator.clipboard.writeText(copyText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [copyText]);

  return (
    <button
      type="button"
      className={classNames(
        'token-grid__monospace-label',
        `cnvs-sys-type-subtext-medium ${
          isDeprecated
            ? 'token-grid__deprecate-monospace-label'
            : copyText
            ? 'token-grid__monospace-label--copyable'
            : ''
        }${multilineLayout ? ' token-grid__monospace-label--multiline' : ''} ${className || ''}`
      )}
      onClick={copyText ? handleCopy : undefined}
      aria-label={copyText ? `Copy ${copyText}` : undefined}
      title={copyText ? `Click to copy` : undefined}
      {...(props as any)}
    >
      <span
        className={classNames(
          'token-grid__monospace-label-text',
          allowWrap ? 'token-grid__monospace-label-text--wrap' : ''
        )}
      >
        {displayContent}
      </span>
      {copyText && (copied ? <CheckIcon /> : <CopyIcon />)}
    </button>
  );
};

TokenGrid.RowItem = TokenGridRowItem;
TokenGrid.Sample = TokenGridSample;
TokenGrid.Swatch = TokenGridSwatch;
TokenGrid.MonospaceLabel = TokenGridMonospaceLabel;
