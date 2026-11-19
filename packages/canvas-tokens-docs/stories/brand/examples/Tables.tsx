import {createTable} from '../../tableHelpers';

const createBrandTable = (group: string) => createTable(group, undefined, {controls: 'mode'});

export const BrandPrimaryTokens = createBrandTable('brand.primary');
export const BrandPositiveTokens = createBrandTable('brand.positive');
export const BrandCautionTokens = createBrandTable('brand.caution');
export const BrandCriticalTokens = createBrandTable('brand.critical');
export const BrandNeutralTokens = createBrandTable('brand.neutral');
export const BrandCommonTokens = createBrandTable('brand.common');
