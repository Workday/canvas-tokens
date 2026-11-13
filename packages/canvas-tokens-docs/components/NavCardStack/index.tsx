import * as React from 'react';
import {Card} from '@workday/canvas-kit-react/card';
import {SystemIcon} from '@workday/canvas-kit-react/icon';
import {arrowRightIcon} from '@workday/canvas-system-icons-web';

type NavCardProps = {
  description?: string;
  title: string;
  link: string;
};

export const NavCard = ({description, title, link}: NavCardProps) => {
  return (
    <Card
      as="a"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      style={{textDecoration: 'none'}}
    >
      <Card.Heading
        cs={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {title}
        <SystemIcon icon={arrowRightIcon} />
      </Card.Heading>
      {description && <Card.Body>{description}</Card.Body>}
    </Card>
  );
};

type NavCardStackProps = {
  items: {
    title: string;
    description?: string;
    link: string;
  }[];
};

export const NavCardStack = ({items}: NavCardStackProps) => {
  return (
    <div style={{display: 'flex', gap: '16px', flexWrap: 'wrap'}}>
      {items.map(({title, description, link}) => (
        <NavCard key={link} title={title} description={description} link={link} />
      ))}
    </div>
  );
};
