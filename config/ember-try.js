/* eslint-env node */
const getChannelURL = require('ember-source-channel-url');

module.exports = function () {
  return Promise.all([
    getChannelURL('release'),
    getChannelURL('beta'),
    getChannelURL('canary')
  ]).then((urls) => ({
    useYarn: true,
    scenarios: [
      {
        name: 'ember-lts-2.16',
        npm: {
          devDependencies: {
            'ember-source':'~2.16'
          }
        }
      },
      {
        name: 'ember-lts-2.18',
        npm: {
          devDependencies: {
            'ember-source': '~2.18'
          }
        }
      },
      {
        name: 'ember-release',
        bower: {
          dependencies: {
            'ember': 'components/ember#release'
          },
          resolutions: {
            'ember': 'release'
          }
        },
        npm: {
          devDependencies: {
            'ember-source': urls[0]
          }
        }
      },
      {
        name: 'ember-beta',
        bower: {
          dependencies: {
            'ember': 'components/ember#beta'
          },
          resolutions: {
            'ember': 'beta'
          }
        },
        npm: {
          devDependencies: {
            'ember-source': urls[1]
          }
        }
      },
      {
        name: 'ember-canary',
        bower: {
          dependencies: {
            'ember': 'components/ember#canary'
          },
          resolutions: {
            'ember': 'canary'
          }
        },
        npm: {
          devDependencies: {
            'ember-source': urls[2]
          }
        }
      },
      {
        name: 'ember-default',
        npm: {
          devDependencies: {}
        }
      }
    ]
  }))
};
