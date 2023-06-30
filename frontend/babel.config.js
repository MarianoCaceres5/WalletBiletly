module.exports = function (api) {
  api.cache(true);
  const presets = ['@babel/preset-react', '@babel/preset-flow'];
  const plugins = [
    ["module:react-native-dotenv", {
      "envName": "APP_ENV",
      "moduleName": "@env",
      "path": ".env",
      "safe": false,
      "allowUndefined": true,
      "verbose": false
    }],
    ['@babel/plugin-transform-class-properties', { loose: true }],
    ['@babel/plugin-transform-private-methods', { loose: true }],
    ['@babel/plugin-transform-private-property-in-object', { loose: true }]
  ];

  return {
    presets,
    plugins
  };
};