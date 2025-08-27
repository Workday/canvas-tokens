# @workday/canvas-tokens-web

## 3.0.0-alpha.17

### Major Changes

- ### Documentation

  - docs: Add llm txt file to overview page
    ([#187](https://github.com/Workday/canvas-tokens/pull/187))
    ([@RayRedGoose](https://github.com/RayRedGoose))

## 3.0.0-alpha.16

### Major Changes

- ### Documentation

  - docs: Add v3 Upgrade guide ([#184](https://github.com/Workday/canvas-tokens/pull/184))
    ([@RayRedGoose](https://github.com/RayRedGoose),
    [@mannycarrera4](https://github.com/mannycarrera4))

## 3.0.0-alpha.15

### Major Changes

- ### Components

  - feat: Sync tokens from canvas-tokens-studio
    ([#183](https://github.com/Workday/canvas-tokens/pull/183))
    ([@RayRedGoose](https://github.com/RayRedGoose))

## 3.0.0-alpha.13

### Major Changes

- ### Components

  - feat: Sync tokens from canvas-tokens-studio
    ([#181](https://github.com/Workday/canvas-tokens/pull/181))
    ([@RayRedGoose](https://github.com/RayRedGoose))

## 3.0.0-alpha.12

### Major Changes

- ### Components

  - fix: Fix transparent transform ([@RayRedGoose](https://github.com/RayRedGoose))

## 3.0.0-alpha.11

### Major Changes

- ### Components

  - chore: Sync tokens from canvas-tokens-studio
    ([#178](https://github.com/Workday/canvas-tokens/pull/178))
    ([@RayRedGoose](https://github.com/RayRedGoose))
  - fix: Update transparent descriptions ([@RayRedGoose](https://github.com/RayRedGoose))

## 3.0.0-alpha.10

### Major Changes

- ### Components

  - feat: Sync tokens from canvas-tokens-studio
    ([#176](https://github.com/Workday/canvas-tokens/pull/176))
    ([@RayRedGoose](https://github.com/RayRedGoose))

## 3.0.0-alpha.9

### Major Changes

- ### Components

  - feat: Sync tokens from canvas-tokens-studio
    ([#174](https://github.com/Workday/canvas-tokens/pull/174))
    ([@RayRedGoose](https://github.com/RayRedGoose),
    [@mannycarrera4](https://github.com/mannycarrera4))

## 3.0.0-alpha.8

### Major Changes

- ### Components

  - feat: Sync tokens from canvas-tokens-studio
    ([#173](https://github.com/Workday/canvas-tokens/pull/173))
    ([@RayRedGoose](https://github.com/RayRedGoose), manuel.carrera,
    [@mannycarrera4](https://github.com/mannycarrera4))

## 3.0.0-alpha.7

### Major Changes

- ### Web Tokens

  - fix: Filter action tokens from css files
    ([#171](https://github.com/Workday/canvas-tokens/pull/171))
    ([@mannycarrera4](https://github.com/mannycarrera4), manuel.carrera)

## 3.0.0-alpha.6

### Major Changes

- ### Components

  - feat: Deprecate old fruit based tokens and map them to new color palette value
    ([#159](https://github.com/Workday/canvas-tokens/pull/159))
    ([@mannycarrera4](https://github.com/mannycarrera4), manuel.carrera,
    [@alanbsmith](https://github.com/alanbsmith), [@RayRedGoose](https://github.com/RayRedGoose))
    We've deprecated the fruit based color tokens and provided a mapping to new base tokens for the
    new color palette. In the docs, we provide a mapping of the new CSS token and JS token.

## 3.0.0-alpha.5

### Major Changes

- ### Components

  - chore: Sync tokens from canvas-tokens-studio
    ([@mannycarrera4](https://github.com/mannycarrera4))
  - feat: Sync tokens from canvas-tokens-studio ([@mannycarrera4](https://github.com/mannycarrera4))

## 3.0.0-alpha.4

### Major Changes

- ### Components

  - fix: Update red base color to be 600 ([@mannycarrera4](https://github.com/mannycarrera4))

## 3.0.0-alpha.3

### Major Changes

- ### Components

  - feat: Sync tokens from canvas-tokens-studio
    ([#163](https://github.com/Workday/canvas-tokens/pull/163))
    ([@RayRedGoose](https://github.com/RayRedGoose))

## 3.0.0-alpha.2

### Major Changes

- ### Tokens

  - fix: Fix transparent values ([#162](https://github.com/Workday/canvas-tokens/pull/162))
    ([@RayRedGoose](https://github.com/RayRedGoose)) values with opacity 0 have been changed to
    'transparent' value in css.

## 3.0.0-alpha.1

### Major Changes

- ### Components

  - chore: Skip release on chore commits ([@RayRedGoose](https://github.com/RayRedGoose))
  - fix: Return default token for fg critical ([@RayRedGoose](https://github.com/RayRedGoose))
  - fix: Fix release script ([@RayRedGoose](https://github.com/RayRedGoose))

## 3.0.0-alpha.0

### Major Changes

- ### Components

  - chore: Fix release ([@RayRedGoose](https://github.com/RayRedGoose))
  - chore: Use npm tokens ([@RayRedGoose](https://github.com/RayRedGoose))

  ### Infrastructure

  - chore: Add updated release action ([#145](https://github.com/Workday/canvas-tokens/pull/145))
    ([@RayRedGoose](https://github.com/RayRedGoose), Raisa Primerova)

  ### Tokens

  - chore: Sync tokens from canvas-tokens-studio
    ([#151](https://github.com/Workday/canvas-tokens/pull/151))
    ([@RayRedGoose](https://github.com/RayRedGoose)) Alpha version of new color tokens.

## 2.1.1

### Patch Changes

- **Infrastructure**

  - chore: Remove parser ([#139](https://github.com/Workday/canvas-tokens/pull/139))
    ([@RayRedGoose](https://github.com/RayRedGoose))

## 2.1.0

### Minor Changes

- **Infrastructure**

  - fix: Fix issue with layer opacity presenting in json
    ([#135](https://github.com/Workday/canvas-tokens/pull/135))
    ([@RayRedGoose](https://github.com/RayRedGoose), Raisa Primerova)

  **Web Tokens**

  - chore: Sync Tokens Studio config 🤖 ([#137](https://github.com/Workday/canvas-tokens/pull/137))
    ([@RayRedGoose](https://github.com/RayRedGoose)) We've added new `action` tokens to brand. While
    these tokens are available, limit their use and in most cases the default brand tokens should be
    used for theming.

    - `brand.action.lightest`
    - `brand.action.light`
    - `brand.action.base`
    - `brand.action.dark`
    - `brand.action.darkest`
    - `brand.action.accent`

## 2.0.2

### Patch Changes

- **Documentation**

  - docs: Add Version Support SLA ([#123](https://github.com/Workday/canvas-tokens/pull/123))
    ([@alanbsmith](https://github.com/alanbsmith))

  **Web Tokens**

  - fix(web): Fix type and breakpoints tokens
    ([#124](https://github.com/Workday/canvas-tokens/pull/124))
    ([@RayRedGoose](https://github.com/RayRedGoose), Raisa Primerova) Type tokens have been fixed to
    refer to system font tokens instead of base. Breakpoints tokens have been fixed to have px value
    instead of rem.

## 2.0.1

### Patch Changes

- **Web Tokens**

  - fix: Fix type file generation to export types instead of declarations
    ([#120](https://github.com/Workday/canvas-tokens/pull/120))
    ([@RayRedGoose](https://github.com/RayRedGoose)) Type generation has been updated to fix a type
    issue happening for user who doesn't use `--skipLibCheck`. Now generated type files contains
    types (`export declare const cinnamon100: "--cnvs-base-palette-cinnamon-100";`) instead of value
    declarations
    (`export declare const cinnamon100 = "--cnvs-base-palette-cinnamon-100" as const;`).

## 2.0.0

### Major Changes

- **Web Tokens**

  - chore: Sync tokens and update SD config to handle new changes
    ([#115](https://github.com/Workday/canvas-tokens/pull/115))
    ([@alanbsmith](https://github.com/alanbsmith), [@RayRedGoose](https://github.com/RayRedGoose))
    `⚠️ BREAKING CHANGES:`

    - `color.bg.positive.soft` has been renamed to `color.bg.positive.softer` for consistency.
    - Figma specific tokens: `typescale`, `level`, `shadow` has been excluded from base web tokens.
    - Depth token values has been updated from the base token reference to raw value.

    Other Changes:

    - JSDoc has been updated to include the base token info

## 1.3.1

### Patch Changes

- **Documentation**

  - docs: Add system color stories ([#102](https://github.com/Workday/canvas-tokens/pull/102))
    ([@alanbsmith](https://github.com/alanbsmith))

  **Infrastructure**

  - chore: Add workflow for project board
    ([#104](https://github.com/Workday/canvas-tokens/pull/104))
    ([@jaclynjessup](https://github.com/jaclynjessup))
  - chore: Add Figma-only tokens to filter out
    ([#108](https://github.com/Workday/canvas-tokens/pull/108))
    ([@RayRedGoose](https://github.com/RayRedGoose)) Sync script has been updated by adding
    Figma-only token to filter. This change will exclude Figma-only tokens from the web token json.
  - chore: Update Style Dictionary transform
    ([#110](https://github.com/Workday/canvas-tokens/pull/110))
    ([@RayRedGoose](https://github.com/RayRedGoose)) Bug fixing of generating wrong value for colors
    with alpha and replacing transparent colors by `transparent` value. New transforms has been
    added to handle text values of `font-weight` and px values of `line-height`. Transforms for
    `font-family` and `letter-spacing` have been updated to support different token types, transform
    for `flatten-rgba` has been updated to handle spaces and percentage alpha.
  - chore: Sync Tokens Studio config 🤖 ([#112](https://github.com/Workday/canvas-tokens/pull/112))
    ([@alanbsmith](https://github.com/alanbsmith), [@RayRedGoose](https://github.com/RayRedGoose))
    Incorrect value of `sys.color.static.orange.default` token has been changed to the correct
    `cantaloupe.400`. Token Studio structure has been updated for Figma only (types and
    `font-weight`, `line-height` values changes).

## 1.3.0

### Minor Changes

- **Infrastructure**

  - chore: Add transform to handle opacity as percentage
    ([#100](https://github.com/Workday/canvas-tokens/pull/100))
    ([@RayRedGoose](https://github.com/RayRedGoose))

  **Other**

  - feat: Add missing system color tokens ([@alanbsmith](https://github.com/alanbsmith))

## 1.2.0

### Minor Changes

- **Infrastructure**

  - chore: Fix tokens-config sync script ([@alanbsmith](https://github.com/alanbsmith))

  **Other**

  - chore: Retry 1.1.1 release ([@alanbsmith](https://github.com/alanbsmith))
  - chore: Fix forward-merge action ([@alanbsmith](https://github.com/alanbsmith))

## 1.1.1

### Patch Changes

- **Infrastructure**

  - chore: Add Token Studio sync action ([#85](https://github.com/Workday/canvas-tokens/pull/85))
    ([@alanbsmith](https://github.com/alanbsmith))
  - chore: Bump actions/checkout to v4 ([#89](https://github.com/Workday/canvas-tokens/pull/89))
    ([@alanbsmith](https://github.com/alanbsmith))
  - chore: Update Release Automation ([#91](https://github.com/Workday/canvas-tokens/pull/91))
    ([@alanbsmith](https://github.com/alanbsmith))

## 1.1.0

### Minor Changes

- **Infrastructure**

  - chore: Update build and release scripts
    ([#72](https://github.com/Workday/canvas-tokens/pull/72))
    ([@alanbsmith](https://github.com/alanbsmith))
  - feat: Add skip condition to forward merge
    ([#74](https://github.com/Workday/canvas-tokens/pull/74))
    ([@RayRedGoose](https://github.com/RayRedGoose))

  **Other**

  - chore: Sync Tokens Studio config 🤖 ([#79](https://github.com/Workday/canvas-tokens/pull/79))
    ([@alanbsmith](https://github.com/alanbsmith), [@RayRedGoose](https://github.com/RayRedGoose),
    [@mannycarrera4](https://github.com/mannycarrera4))

## 1.0.2

### Patch Changes

- **Infrastructure**

  - fix: Fix release script ([#70](https://github.com/Workday/canvas-tokens/pull/70))
    ([@alanbsmith](https://github.com/alanbsmith))

## 1.0.1

### Patch Changes

- **Documentation**

  - docs: Fix Getting Started doc ([@alanbsmith](https://github.com/alanbsmith))
  - docs: Add consumer documentation ([#60](https://github.com/Workday/canvas-tokens/pull/60))
    ([@alanbsmith](https://github.com/alanbsmith))
  - docs: Fix broken doc link ([@alanbsmith](https://github.com/alanbsmith))
  - docs: Add contributing doc to Storybook ([@alanbsmith](https://github.com/alanbsmith))

  **Infrastructure**

  - fix: Update release action ([#59](https://github.com/Workday/canvas-tokens/pull/59))
    ([@RayRedGoose](https://github.com/RayRedGoose))
  - feat: Add forward-merge action ([#67](https://github.com/Workday/canvas-tokens/pull/67))
    ([@RayRedGoose](https://github.com/RayRedGoose))

  **Web Documentation**

  - fix: Fix JS Doc comment and value order
    ([#62](https://github.com/Workday/canvas-tokens/pull/62))
    ([@RayRedGoose](https://github.com/RayRedGoose))

## 1.0.0

### Major Changes

- **Other**

  - chore: Migrate from npm to yarn ([#40](https://github.com/Workday/canvas-tokens/pull/40))
    ([@alanbsmith](https://github.com/alanbsmith), Raisa Primerova)
  - chore: Add yarn.lock ([@alanbsmith](https://github.com/alanbsmith))
  - chore: Remove Storybook composition ([@alanbsmith](https://github.com/alanbsmith))
  - chore: Update merge workflow action ([@alanbsmith](https://github.com/alanbsmith))
  - chore: Update Storybook preview ([@alanbsmith](https://github.com/alanbsmith))
  - chore: Update merge.yml ([@alanbsmith](https://github.com/alanbsmith))
  - fix: Fix token-sync utils ([#52](https://github.com/Workday/canvas-tokens/pull/52))
    ([@alanbsmith](https://github.com/alanbsmith))

  **Documentation**

  - chore: Add Storybook and Chromatic ([#43](https://github.com/Workday/canvas-tokens/pull/43))
    ([@alanbsmith](https://github.com/alanbsmith))
  - docs: Fix computed value bug in docs ([@alanbsmith](https://github.com/alanbsmith))
  - docs: Update Contributing guidelines ([#49](https://github.com/Workday/canvas-tokens/pull/49))
    ([@alanbsmith](https://github.com/alanbsmith))

  **Infrastructure**

  - chore: Sync Tokens Studio config 🤖 ([#50](https://github.com/Workday/canvas-tokens/pull/50))
    ([@alanbsmith](https://github.com/alanbsmith), [@RayRedGoose](https://github.com/RayRedGoose))
  - feat: Update configurations to improve DX
    ([#53](https://github.com/Workday/canvas-tokens/pull/53))
    ([@RayRedGoose](https://github.com/RayRedGoose), [@alanbsmith](https://github.com/alanbsmith))
  - feat: Update changelog generator ([#54](https://github.com/Workday/canvas-tokens/pull/54))
    ([@RayRedGoose](https://github.com/RayRedGoose))

## 0.1.6

### Patch Changes

- **Other**

  - feat(web): Make type definitions of objects static
    ([#42](https://github.com/Workday/canvas-tokens/pull/42))
    ([@NicholasBoll](https://github.com/NicholasBoll), [@alanbsmith](https://github.com/alanbsmith))

  **Web Infrastructure**

  - chore(web): Remove publish on push ([#37](https://github.com/Workday/canvas-tokens/pull/37))
    ([@RayRedGoose](https://github.com/RayRedGoose))

## 0.1.5

### Patch Changes

- **Web Infrastructure**

  - feat(web): Add GH release step to release action
    ([#35](https://github.com/Workday/canvas-tokens/pull/35))
    ([@RayRedGoose](https://github.com/RayRedGoose))

## 0.1.4

### Patch Changes

- **Web Infrastructure**

  - fix(web): Update release job ([#33](https://github.com/Workday/canvas-tokens/pull/33))
    ([@RayRedGoose](https://github.com/RayRedGoose))

## 0.1.3

### Patch Changes

- **Web Infrastructure**

  - fix(web): Fix letter-spacing transformer
    ([#25](https://github.com/Workday/canvas-tokens/pull/25))
    ([@alanbsmith](https://github.com/alanbsmith))

## 0.1.2

### Patch Changes

- **Other**

  - chore: Add changesets ([#10](https://github.com/Workday/canvas-tokens/pull/10))
    ([@alanbsmith](https://github.com/alanbsmith))
  - chore: Initial release ([@alanbsmith](https://github.com/alanbsmith))
  - fix: Update canvas-tokens-web exports ([@alanbsmith](https://github.com/alanbsmith))
  - feat: Add automerge workflow ([#17](https://github.com/Workday/canvas-tokens/pull/17))
    ([@RayRedGoose](https://github.com/RayRedGoose))

  **Web Infrastructure**

  - fix(web): Fix the common-js module path
    ([#20](https://github.com/Workday/canvas-tokens/pull/20))
    ([@NicholasBoll](https://github.com/NicholasBoll))
  - feat(web): Add release action ([#32](https://github.com/Workday/canvas-tokens/pull/32))
    ([@RayRedGoose](https://github.com/RayRedGoose), [@alanbsmith](https://github.com/alanbsmith))

## 0.1.1

### Patch Changes

- Updating package exports to include our stylesheets

## 0.1.0

### Minor Changes

- Initial release of @workday/canvas-tokens-web
