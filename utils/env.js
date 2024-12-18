let isTest = false;
let apiBaseUrl = "http://www.deyunhub.cn";

// 测试环境
// isTest = true;

if(isTest) {
  apiBaseUrl = ""
}
export {
  apiBaseUrl
}