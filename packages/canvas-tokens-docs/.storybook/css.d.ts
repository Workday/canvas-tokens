// Allow side-effect imports of plain CSS files (e.g. `import './global.css'`)
declare module '*.css';

declare module '*.module.css' {
  const classes: {readonly [key: string]: string};
  export default classes;
}
