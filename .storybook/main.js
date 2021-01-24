module.exports = {
  stories: ['../src/**/*.stories.@(js|mdx)', '../src/**/*.stories.jsx', '../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-docs',
    {
      "name": '@storybook/preset-create-react-app',
      "options": {
        "craOverrides": {
          "fileLoaderExcludes": ["less"]
        }
      }
    },
    '@storybook/addon-actions',
    '@storybook/addon-links'
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push(
      {
        test: /\.(ts|tsx)$/,
        loader: require.resolve("babel-loader"),
        options: {
          presets: [["react-app", { flow: false, typescript: true }]],
          plugins: [
            [
              "import",
              {
                libraryName: "antd",
                libraryDirectory: "es",
                style: true
              }
            ]
          ]
        }
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1
            },
          },
          require.resolve('less-loader')
        ]
      },
      {
        test: /\.less$/,
        include: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            },
          },
        ],
      });
    // Return the altered config
    return config;
  },
};
