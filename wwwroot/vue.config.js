module.exports = {
  transpileDependencies: ["vuetify"],
  runtimeCompiler: true,
  devServer: {
    proxy: {
      "^/api": {
        target: "https://gitlab.iue.fh-kiel.de:443/projects/659/pipeline?ref=master",
        ws: true,
        changeOrigin: true,
        pathRewrite: { "^/api": "/" },
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        logLevel: "debug",
      },
    },
  },
};
