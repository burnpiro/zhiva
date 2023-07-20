module.exports = {
  stories: [],
  addons: ['@storybook/addon-essentials'],
  // uncomment the property below if you want to apply some webpack config globally
  // core: {
  //   crossOriginIsolated: true,
  // },
  webpackFinal: async (config, props) => {
    // Make whatever fine-grained changes you need that should apply to all storybook configs

    // Return the altered config
    config.target = 'web';
    console.log(config)
    return config;
  },
};
