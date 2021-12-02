const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const cleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;
const miniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development", // devleopment(개발용), production(배포용), none
  entry: "./src/index.js", // 웹팩을 실행할 대상 파일
  output: {
    // 웹팩의 결과물에 대한 정보
    path: path.resolve(__dirname, "./dist"), // 결과물 경로
    filename: "bundle.js", // 결과물 파일명
  },
  resolve: {
    // 웹펙이 모듈을 처리하는 방식을 설정, 확장자를 생략해도 인식하도록
    extensions: [".js", ".jsx"],
  },
  devtool: "eval-cheap-source-map", // source-map을 설정하는 부분으로 에러가 발생했을 때 어느 부분에 났는지 쉽게 확인할 수 있게 해줌
  devServer: {
    // webpack-dev-server의 옵션 설정
    port: 5500, // 포트
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
  },
  module: {
    // 모듈에 적용할 로더들과 그 옵션들을 설정
    rules: [
      {
        test: /\.(js|jsx)$/, // 어떤 파일에 적용할지
        exclude: "/node_modules/", // 로더에서 제외할 파일
        loader: "babel-loader", // 적용할 로더가 한 개 loader
      },
      {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader'],
        use: [miniCssExtractPlugin.loader, "css-loader"], // 적용할 로더가 두 개 이상 use
      },
      {
        test: /\.(jpeg|jpg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },
      },
    ],
  },
  plugins: [
    new cleanWebpackPlugin(),
    new htmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new miniCssExtractPlugin({ filename: "app.css" }),
  ],
};
