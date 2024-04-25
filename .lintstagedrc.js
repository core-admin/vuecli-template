module.exports = {
  'src/**/*.{ts,tsx,js,jsx}': ['eslint --fix', 'prettier --write'],
  'src/**/*.vue': ['eslint --fix', 'prettier --write'],
  'src/**/*.{scss,less,css,styl,html,json}': ['prettier --write'],
};
