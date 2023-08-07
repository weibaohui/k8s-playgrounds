/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
  directories: {
    output: 'dist/electron',
  },
  publish: null,
  npmRebuild: false,
  files: [
    'dist/backend/**/*',
    'dist/preload/**/*',
    'dist/frontend/**/*',
  ],
}

module.exports = config
