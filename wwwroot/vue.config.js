module.exports = {
  transpileDependencies: ["vuetify"],
  runtimeCompiler: true,
  devServer: {
    proxy: {
      "^/api": {
        target: "https://gitlab.iue.fh-kiel.de/",
        ws: true,
        changeOrigin: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        logLevel: "debug",
      },
    },
  },
};
