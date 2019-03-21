"use strict"

const { disableEsLint, addBabelPlugins, override } = require('customize-cra');

module.exports = override(
  disableEsLint(),
  addBabelPlugins(
    "babel-plugin-transform-react-pug",
    "@babel/plugin-transform-react-jsx"
  ),
);
