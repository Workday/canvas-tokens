import{j as e,a,F as s}from"./jsx-runtime-86dfebf6.js";import{M as r,U as i,d as u}from"./index-cdfb4ba6.js";import{u as c}from"./index-2ef8b458.js";import"./index-1b03fe98.js";import"./iframe-d777feca.js";import"../sb-preview/runtime.js";import"./index-91af8003.js";import"./index-356e4a49.js";const l=`# Contributing

Whether you're a first-time contributor or need a refresher, this guide will walk you through the process of making a contribution.

## First-Time Contributions

If you're a first-time contributor, welcome! We use the
["good first issue" label](https://github.com/workday/canvas-tokens/labels/good%20first%20issue)
to identify issues that you can pick up any time. If the issue is unclear, feel free to reach out in
our #canvas-kit-contrib Slack channel. We're happy to help you get started! If there are no
\`good first issue\`s, we always appreciate documentation updates. If our docs are unclear,
incomplete, or incorrect, you can submit a pull request to make an update. If you'd like to work on
something else, please reach out in our #canvas-kit-contrib Slack channel, and we'll help you find
something. Please read our contribution guidelines below for more detailed information on making a
contribution.

## How to Contribute

To make a contribution, you'll need to find or create an issue, fork the repo, make updates, and submit a PR. That can feel like a lot, but this guide will give you step-by-step directions.

### Finding an Issue

You can find all the issues for this repository in our
[GitHub Issues](https://github.com/workday/canvas-tokens/issues).

### Creating an Issue

If you find something you'd like added, feel free to
[create an issue](https://github.com/workday/canvas-tokens/issues/new/choose), but please be
sure to [review existing issues](https://github.com/workday/canvas-tokens/issues) first to
reduce duplicates.

### Forking the Repo

Once you have an issue, you're ready to start working your contribution! If this is your first contribution, you'll need to fork this repo. You can either do this through GitHub's UI or the [\`gh\` CLI](https://cli.github.com/manual/gh_repo_fork).

\`\`\`sh
gh fork repo Workday/canvas-tokens
\`\`\`

Once forked, you can clone it locally, and set upstream and set your remotes

\`\`\`sh
# clone the repo
gh repo clone Workday/canvas-tokens
# change the directory
cd canvas-tokens
# rename the origin remote to upstream
git remote rename origin upstream
# set the origin remote to your fork
git remote add origin git@github.com:[your-username]/canvas-tokens.git
\`\`\`

### Making Updates

Before making updates, be sure you're up to date with the latest base branch and have updated your dependencies. If you are working on the current major version, please use \`main\` as your base branch. If you are working on the next major version, use \`prerelease/major\`. Below, we're pulling from the latest upstream \`main\` and updating dependencies.

\`\`\`sh
# pull the latest updates from the main branch
git pull upstream main
# install dependencies
yarn install
\`\`\`

Now you're ready to create a new branch. By convention, we use GitHub issue numbers as branch names. For example, if you were working on issue #4, you'd create a branch called \`ISSUE-4\`. You can also be more descriptive if you'd like.

\`\`\`sh
git checkout -b ISSUE-4
\`\`\`

Now you're ready to make your updates! Please keep changes relevant to the issue being resolved. This streamlines the review process and creates fewer opportunities for error. As you're making changes, consider whether you should include updates to documentation and tests.

### Committing Changes

Once you complete your changes, you're ready to commit! We use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) to keep commit messages consistent and for automation. If you're making changes to \`@workday/canvas-tokens-web\`, please use the \`(web)\` scope. This helps us automatically generate a changelog for the change. In the example below, we're committing a non-breaking patch update to \`canvas-tokens-web\`.

\`\`\`sh
# stage your changes
git add .
# create a commit
git commit -m "fix(web): Fixes release action"
# push your changes
git push
\`\`\`

### Submitting a Pull Request

After committing your changes, you can push them up and create a pull request. You can either create a PR in [GitHub's UI](https://github.com/Workday/canvas-tokens/pulls) or [the \`gh\` CLI](https://cli.github.com/manual/gh_pr_create). When creating a PR, please allow edits by maintainers, so we can add small nits and suggestions as we review.

\`\`\`sh
gh pr create
\`\`\`

If you'd like early feedback, please create a draft PR. And when you're ready for review, add a \`ready for review\` label. We triage open pull requests daily and assign owners to ensure they move along in a timely manner. Once the CI checks pass and changes are approved, we'll merge your branch and create a new release, if needed.

Please follow the provided pull request template. The Issue section connects the pull request to the associated issue. The Summary and Release Category sections are used by our release automation to generate our changelog. All other sections below are intended for the reviewer and help the review process move along smoothly.

### Thank You!

We know contributions can feel intimidating, especially first one, and really appreciate your support.
`;function o(n){return a(s,{children:[e(r,{title:"Docs/Contributing"}),`
`,e(i,{children:e(u,{children:l})})]})}function k(n={}){const{wrapper:t}=Object.assign({},c(),n.components);return t?e(t,Object.assign({},n,{children:e(o,n)})):o()}export{k as default};
//# sourceMappingURL=Contributing-ffda42da.js.map
