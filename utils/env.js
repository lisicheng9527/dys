let isTest = false;
let apiBaseUrl = "https://www.deyunhub.cn";

// 测试环境
// isTest = true;

if(isTest) {
  apiBaseUrl = ""
}
export {
  apiBaseUrl
}