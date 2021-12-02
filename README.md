# REACT WITHOUT CRA

## what is Webpack
여러개 파일을 하나의 파일로 합쳐주는 모듈 번들러
*모듈 번들링: html 안에 들어가는 모든 js 파일을 하나의 js 파일로 만들어주는 방식

### why Webpack?
1. SPA(Single Page Application) 하나의 html 페이지에 연관된 js 종속성 있는 파일들을 하나의 파일로 묶어줘서 관리가 편하다.
2. 컴파일할 때 여러 모듈의 파일을 읽어오는데 오래걸리는 문제가 있는데, 이를 여러 개의 파일을 하나의 파일로 번들링하여 해결한다.
3. 하나의 js 파일로 만들어서 페이지 성능을 최적화한다.

## what is Babel?
ES6 문법을 ES5 문법으로 변환

### why Babel?
ES5를 지원하지 않는(...) 브라우저를 위함

# START

## 폴더 생성 및 초기화

```
mkdir cra
cd cra
npm init -y

mkdir src
mkdir dist
mkdir public
```

`./public/index.html`

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>react w/webpack</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

## 리액트 설치

`npm i react react-dom`

1. react: 리액트 코어
2. react-dom: 리액트와 DOM 연결

## 바벨 설치

`npm i @babel/core @babel/preset-react @babel/preset-env -D`

1. @babel/core: 바벨 코어
2. @babel/preset-react: react jsx 트랜스파일링
3. @babel/preset-env: es6코드 es5 트랜스파일링

### 설정

`./babel.config.js`

```js
module.export = {
  presets: ["@babel/preset-react", "@babel/preset.env"],
};
```

이거 안돼서 구글링

`./babelrc`

```js
{
  "presets": ["@babel/react", "@babel/env"]
}
```

is worked

## 웹팩

### webpack

`npm i webpack webpack-cli webpack-dev-server -D`

1. webpack: 웹팩 코어
2. webpack-cli: 웹팩 커맨드라인에서 사용
3. webpack-dev-server: 웹팩을 메모리 상에 빌드 후 개발 서버 구동

## 로더

`npm i babel-loader style-loader css-loader file-loader -D`

1. babel-loader: jsx 및 es6+ 트랜스파일링
2. style-loader: css 파일을 <style> 태그로 감싸서 삽입
3. css-loader: css 파일을 js가 이해할 수 있도록 변환
4. file-loader: 이미지 및 폰트 등 로딩

### 플러그인

`npm i html-webpack-plugin clean-webpack-plugin mini-css-extract-plugin -D`

1. html-webpack-plugin: html파일에 번들링된 js 파일을 삽입 후 결과가 저장되는 폴더에 옮김
2. clean-webpack-plugin: 번들링을 할 때마다 이전 번들링 결과를 제거
3. mini-css-extract-plugin: css파일로 변환해줌

### 웹팩 설정

`./webpack.config.js`

```js
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
    port: 5500,
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
```

## 리액트 컴포넌트 생성

`./src/App.jsx`

```js
import React from "react";
import "./App.css";

const App = () => {
  return <div className="container" />;
};

export default App;
```

`./src/App.css`

```css
.container {
  width: 500px;
  height: 200px;
  margin: 0 auto;
  background-image: url(../public/bg.png);
  background-size: cover;
}
```

`./index.js`

```js
import React from "react";
import ReactDom from "react-dom";
import App from "./App";

ReactDom.render(<App />, document.getElementById("root"));
```

## 실행

```
npm run dev
```
