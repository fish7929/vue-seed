/**
 * 本地服务默认使用代理(指向到qa环境)
 * 如果不使用代理, 只需将本地配置改为非空即可
 * local: {    本地mock 服务
 *   apiServerUrl: "http://localhost:2929",
 *   nodeApiServerUrl: "http://localhost:2929",
 * }
 */
const envUrls = {
  local: {
    apiServerUrl: "http://localhost:8686",  //http://localhost:8686
    nodeApiServerUrl: "http://localhost:8686",  //http://localhost:8686
  },
  dev: {
    apiServerUrl: "",
    nodeApiServerUrl: ""
  },
  qa: {
    apiServerUrl: "http://crd.tottot.xyz:28083",
    assetsUrl: "",
    nodeApiServerUrl: "",
  },
  staging: {
    apiServerUrl: "http://crd.tottot.xyz:28083",
    assetsUrl: "",
    nodeApiServerUrl: "",
  },
  prod: {
    apiServerUrl: "http://crd.tottot.xyz:28083",
    assetsUrl: "",
    nodeApiServerUrl: "",
  }
}

const getApiHost = () => {
  return envUrls[BUILD_ENV].apiServerUrl
}

const getNodeApiHost = () => {
  return envUrls[BUILD_ENV].nodeApiServerUrl
}
//  relativePath   eg: "/fe/scaffold/"
const getAssetsUrl = (env = BUILD_ENV, relativePath) => {
  const assetsUrl = envUrls[env].assetsUrl || ""
  const suffix = env === "local" ? "/" : relativePath
  return assetsUrl + suffix
}
//路由的模式
let routerMode = 'history';  //'history' 'hash'
module.exports = {
  routerMode,
  getApiHost,
  getNodeApiHost,
  getAssetsUrl,
}
