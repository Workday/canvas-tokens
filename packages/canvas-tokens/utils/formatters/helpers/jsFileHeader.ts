import {fileHeader} from 'style-dictionary/utils';
import {File} from 'style-dictionary/types';

type FileHeader = (args: {file: File}) => Promise<string>;

export const jsFileHeader: FileHeader = async ({file}) => {
  return (
    (await fileHeader({file})) +
    `"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\n\n`
  );
};
