import {
  Config,
  PlatformConfig,
  File,
  FormatFn,
  LocalOptions,
  Filter,
  TransformedToken,
} from 'style-dictionary/types';

export interface Modifier {
  level: string[];
  format?: string;
  filter?: Filter['filter'] | Filter['filter'][];
  combineWith?: string[];
  transforms?: string[];
  options?: LocalOptions;
  filterByLevel?: boolean;
  extensions?: string[];
  destination?: string;
}

export interface PlatformOptions {
  transformGroup?: string;
  buildPath?: string;
  fileName?: string;
  prefix?: string;
  format?: string;
  modifiers?: Modifier[];
  extensions?: string[];
  transforms?: string[];
}

interface ExtraProps {
  platforms: string[];
  platformOptions: Record<string, PlatformOptions>;
  levels: string[];
}

interface FileGenerationProps {
  levels: string[];
  extensions: string[];
  platform: string;
  fileName: string;
  modifiers: Modifier[];
  format?: string | FormatFn;
  destination?: string;
}

export interface ConfigOptions extends Omit<Config, 'platforms' | 'tokens'>, ExtraProps {}

export const setConfig = ({
  platforms,
  platformOptions,
  levels,
  ...restOptions
}: ConfigOptions): Config => {
  // Generate platform settings based on given options
  const generatedPlats = generatePlatforms({platforms, platformOptions, levels});

  return {
    platforms: generatedPlats,
    ...restOptions,
  };
};

const generatePlatforms = ({
  platforms,
  platformOptions,
  levels,
}: ExtraProps): Record<string, PlatformConfig> => {
  return platforms?.reduce((acc: Record<string, PlatformConfig>, platform: string) => {
    const {
      transformGroup = platform,
      extensions = [platform],
      fileName,
      prefix,
      modifiers = [],
      format,
      ...restOptions
    } = filterPlatformOptions(platformOptions, platform);

    const defaultFiles = generateFiles({levels, extensions, platform, fileName, modifiers, format});

    acc[platform] = {
      transformGroup,
      prefix,
      files: defaultFiles,
      ...restOptions,
    };

    return acc;
  }, {});
};

const filterPlatformOptions = (options: Record<string, PlatformOptions>, platform: string) => {
  if (!options) return {};

  const {'*': allOptions = {}, ...rest} = options;

  return Object.entries(rest).reduce((acc: any, [key, value]: any) => {
    if (key.split(', ').includes(platform)) {
      const {modifiers: appliedModifiers = [], ...appliedOptionsRest} = acc;
      const {modifiers: platModifiers = [], ...platformOptionsRest} = value;

      return Object.assign(
        {modifiers: [...appliedModifiers, ...platModifiers]},
        appliedOptionsRest,
        platformOptionsRest
      );
    }
    return key.split(', ').includes(platform) ? Object.assign({}, acc, value) : acc;
  }, allOptions);
};

const generateFiles = ({
  levels,
  extensions,
  platform,
  fileName,
  modifiers,
  format,
}: FileGenerationProps): File[] => {
  return levels.reduce((acc: File[], level: string) => {
    extensions.forEach((ext: string) => {
      const defaultFormat = validateFormat(platform, level, format);
      const defDestination = resolveName(fileName, platform, level) + '.' + ext;

      const appliedModifiers = modifiers.filter(
        mod =>
          (!mod.level || mod.level.includes(level)) &&
          (!mod.extensions || mod.extensions.includes(ext))
      );

      appliedModifiers.forEach(modifier => {
        const {
          format,
          combineWith = [],
          transforms,
          options = {},
          filterByLevel,
          destination,
          filter,
        } = modifier;

        const fileStructure = {
          destination: destination
            ? resolveName(destination, platform, level) + '.' + ext
            : defDestination,
        };

        const formats = combineWith.map((format: string | FormatFn) =>
          validateFormat(platform, level, format)
        );

        Object.assign(fileStructure, {
          format: format ? resolveName(format, platform, level) : defaultFormat,
          filter: combineFilters(!filter ? [] : typeof filter === 'function' ? [filter] : filter, {
            filtered: filterByLevel,
            level,
          }),
          options: {
            ...options,
            formats: formats.length ? formats : [defaultFormat],
            transforms,
            level,
          },
        });

        acc.push(fileStructure);
      });
    });
    return acc;
  }, []);
};

const resolveName = (name: string, platform: string, level: string) =>
  name.replace(/{platform}/g, platform).replace(/{level}/g, level === 'sys' ? 'system' : level);

const validateFormat = (platform: string, level: string, format?: string | FormatFn) =>
  typeof format === 'string'
    ? resolveName(format, platform, level)
    : format || `${platform}/variables`;

const combineFilters =
  (filters: Filter['filter'][], {filtered, level}: {filtered?: boolean; level: string}) =>
  (token: TransformedToken) => {
    const levelFilter = ({path: [ctg]}: TransformedToken) => !level || ctg === level;
    const allFilters = filtered ? [levelFilter, ...filters] : filters;
    return allFilters.map((filter: any) => filter(token)).every((result: boolean) => result);
  };
