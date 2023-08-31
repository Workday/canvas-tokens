import {File, formatHelpers} from 'style-dictionary';

type FileHeader = (args: {file: File}) => string;

export const jsFileHeader: FileHeader = ({file}) => {
  return (
    formatHelpers.fileHeader({file}) +
    `"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\n\n`
  );
};
