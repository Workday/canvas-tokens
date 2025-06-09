import {expectTransformFactory} from '../../utils/expectTransformFactory';
import transform from '../tokens';
import {stripIndent} from 'common-tags';

const expectTransform = expectTransformFactory(transform);

describe('colors', () => {
  describe('Component package import', () => {
    it('should not transform tokens from other imports', () => {
      const input = stripIndent`
          import { colors, depth } from "@other-package";
        `;

      const expected = stripIndent`
          import { colors, depth } from "@other-package";
        `;

      expectTransform(input, expected);
    });
  });
});
