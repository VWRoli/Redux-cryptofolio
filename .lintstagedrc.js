module.exports = {
  // format all file types recognized by prettier
  '*': ['prettier --ignore-unknown --write'],

  // lint javascript after formatting
  '*.{ts,tsx}': ['eslint --fix src'],

  // lint entire project if eslint settings changed
  '.eslint*': ['eslint src'],
};
