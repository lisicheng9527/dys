// 时间格式化
function formatTime(timestamp = Date.now(), format = 'YYYY-MM-DD ') {
  const date = new Date(timestamp);
  
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  
  // 替换格式字符串中的占位符
  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

function getWeek(timestamp = Date.now()) {
  let date = new Date(timestamp)
  let weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  return weekDays[date.getDay()];
}
 
module.exports = {
  formatTime,
  getWeek
};