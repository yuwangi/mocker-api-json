const delay = require("mocker-api/utils/delay");
const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const color = require("colors-cli/safe");

let defaultConf = {
  baseUrl: "api/",
  mock: false,
  delay: 10
};

function createProxy(conf = {}) {
  if (_.isObject(conf) && !_.isEmpty(conf)) {
    Object.assign(defaultConf, conf);
  } else {
    console.error(`${color.red("未传__dirname")}`);
    return false;
  }
  console.log(`defaultConf ${color.green(JSON.stringify(defaultConf))}`);

  let apiList = {};
  let dirCur = fs.readdirSync(conf.dirname);
  dirCur.forEach(item => {
    const basename = path.basename(item, ".json");
    if (basename !== "index.js") {
      const apiName =
        "POST /" +
        conf.baseUrl +
        basename.replace(/[A-Z]/g, math => {
          return "/" + math.toLowerCase();
        });
      let apiData = fs.readFileSync(path.join(conf.dirname, item), "utf8");
      try {
        apiData = JSON.parse(apiData);
      } catch (e) {
        console.log(item, e);
      }
      if (conf.mock || apiData.mock) {
        apiList[apiName] = (req, res, next) => {
          res.json(apiData);
        };
      }
    }
  });

  return delay(apiList, conf.delay);
}

module.exports = createProxy;
