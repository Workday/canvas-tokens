import {File} from 'style-dictionary';
import {jsFileHeader} from './jsFileHeader';

type FileHeader = (args: {file: File}) => string;

export const commonJSExports: FileHeader = ({file}) => {
  return (
    jsFileHeader({file}) +
    `var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n  if (k2 === undefined) k2 = k;\n  Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\n}) : (function(o, m, k, k2) {\n  if (k2 === undefined) k2 = k;\n  o[k2] = m[k];\n}));\n\nvar __exportStar = (this && this.__exportStar) || function(m, exports) {\n  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);\n};\n\n`
  );
};
