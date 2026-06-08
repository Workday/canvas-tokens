import React from 'react';
import './index.css';

interface StackProps {
  children: React.ReactNode;
}

export function Stack({children}: StackProps) {
  return <div className="stack">{children}</div>;
}
