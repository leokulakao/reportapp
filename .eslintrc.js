module.exports = {
  root: true,
  extends: ['@react-native-community', 'eslint-config-prettier'],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'react/no-unstable-nested-components': [
      'off' | 'warn' | 'error',
      {
        allowAsProps: true | false,
        customValidators:
          [] /* optional array of validators used for propTypes validation */,
      },
    ],
  },
};
