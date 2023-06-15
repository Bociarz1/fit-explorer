/** @type {import('next').NextConfig} */
// const path =require("path");

// const nextConfig = {
//   sassOptions: {
//     includePaths: [path.join(__dirname, "styles")],
//   },
// };

// module.exports = nextConfig;

module.exports = {
  webpack(config, { isServer }) {
    if (!isServer) {
      config.module.rules.forEach((rule) => {
        if (rule.test && rule.test.toString().includes(".scss")) {
          rule.use.push({
            loader: "ignore-loader",
          });
        }
      });
    }
    return config;
  },
};
