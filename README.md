
## mocker-api-json

`mocker-api-json` that creates mocks for REST APIs. It will be helpful when you try to test your application without the actual REST API server.

PS: 最新更新请在 语雀yuwangi 中查看

## 特此声明

本`npm`包依赖于[mocker-api](https://www.npmjs.com/package/mocker-api)

喜大普奔,我的[npm](https://www.npmjs.com/package/mocker-api-json "mocker-api-json")包上线啦~！！！

![991271764c504b5ba6e36ca1f37a58fd.jpeg](https://yuwangi.github.io/images/991271764c504b5ba6e36ca1f37a58fd.jpeg)

## 有什么用

![56846851486484.png](https://yuwangi.github.io/images/56846851486484.png)

这样的场景，相信大家会觉得似曾相识。此时就需要Mock来帮我做数据模拟

本npm包主要做自定义json,然后Mock化解耦，一键配置，方便实用，快快推广吧~

## 攻略

```bash
npm install mocker-api-json --save-dev
```

`webpack dev`文件

```js
const path = require('path');

const webpack = require('webpack');

const merge = require('webpack-merge');

const BaseConfig = require('./webpack.base.js');

const apiMocker = require('mocker-api-json');
//webpack配置
mode: 'development',
  devServer: {
    host: '0.0.0.0',
    port: 9001,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    historyApiFallback: {
      rewrites: [{
        from: /.*/g,
        to: '/www/view/index.html'
      }]
    },
    proxy: {
      '/api': {
        target: 'http://test01.test.com:8091/'
      }
    },
    before(app) {//此处是重点`!!!!!!!!!!!!!!!
      //https://www.webpackjs.com/configuration/dev-server/#devserver-before
      apiMocker.mockServer(app, path.resolve(__dirname, '../mock/index.js'));
    }
  },
```

`mock/index.js`文件

```js
const json=require('mocker-api-json');
module.exports =json({
    mock:true,//全局打开mock
    dirname:__dirname,//当前文件路径
    baseUrl:'api/',//公共请求链接
    delay:10//延迟时间
});
```

额... 目前只加了这几个配置，后续提issues再加吧

Mock资源文件配置

![52646541651634.png](https://yuwangi.github.io/images/52646541651634.png)

`json`文件就这样

```json
{
  "err_code": 0,
  "err_msg": "ok",
  "mock": true,//控制单个文件mock开关
  "data": {
    "poi": {
      "z_id": "111111111111",
      "name": "中国技术交易大厦大厦大厦",
      "province": "",
      "city": "北京市",
      "district": "海淀区",
      "longitude": 116.307499005,
      "latitude": 39.111,
      "addr": "",
      "category": "房产小区:商务楼宇",
      "category_code": 281200,
      "expiration_label": 0,
      "phone": ""
    }
  }
}
```

## 后记

大概就这些啦，如有问题[yuwangi.github.io](https://yuwangi.github.io/about/ "mocker-api-json") 联系我
