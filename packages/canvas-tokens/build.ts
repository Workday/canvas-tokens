import StyleDictionary from 'style-dictionary';

const build = async () => {
  await new StyleDictionary({}).buildAllPlatforms();
};

build().catch(error => {
  console.error(error);
});
