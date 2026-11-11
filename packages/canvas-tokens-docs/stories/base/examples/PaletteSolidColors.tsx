import {ThemeControl} from '../../../components/ThemeControl';
import {ColorPaletteCard} from '../../../components/ColorPaletteCard';

const FAMILIES = [
  'azure',
  'blue',
  'teal',
  'green',
  'indigo',
  'magenta',
  'purple',
  'coral',
  'red',
  'orange',
  'amber',
] as const;

const PaletteSolidColors = () => {
  return (
    <ThemeControl stack="horizontal">
      {FAMILIES.map(family => (
        <ColorPaletteCard key={family} colorFamily={family} />
      ))}
    </ThemeControl>
  );
};

export default PaletteSolidColors;
