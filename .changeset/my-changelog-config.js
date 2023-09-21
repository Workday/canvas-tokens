async function getDependencyReleaseLine() {}

async function getReleaseLine(changeset) {
  return changeset.summary;
}

module.exports = {
  getReleaseLine,
  getDependencyReleaseLine,
};
