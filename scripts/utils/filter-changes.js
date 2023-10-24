const {CHANGESET_BODY = '', PACKAGE = ''} = process.env;

const allowedTitles = [PACKAGE, 'all', 'other', 'infrastructure', 'documentation'];

// Regex to find blocks that starts from package name or non-specified categories
const titleRegex = new RegExp(`^# (${allowedTitles.join('|')})`, 'i');

// Canvas Kit's changelog generator creates changelog based on all commits
// For a given package changelog should only contain related chages
// The default section name headings to "Components",
// so we're updating that default with use "Other" instead.
// Changelog sections are sorted alphabetically
const changelogBody = CHANGESET_BODY.replace('# Components', '# Other')
  .split('##')
  .filter(block => titleRegex.test(block))
  .sort((a, b) => (a > b ? 1 : -1))
  .map(b =>
    // Removes extra line breaks and changes a section heading to a bold text
    b.replace(/\n+$/g, '').replace(/# [a-zA-Z0-9_ ]*\n/g, a => `**${a.replace(/# |\n/g, '')}**\n`)
  )
  .join('\n\n');

const oneLineChangelog = changelogBody.replace(/\n/g, '<br>');

console.log(oneLineChangelog);
