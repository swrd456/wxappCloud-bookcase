// 云函数入口文件
const cloud = require('wx-server-sdk')
let rp = require('request-promise')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log('begin call bookinfo.');
  console.log(event);
  console.log(context);
  const wxContext = cloud.getWXContext();

  let res = rp('http://isbn.szmesoft.com/isbn/query?isbn=' + event.isbn).then(html => {
    if (html == undefined || html == null) {
      coonsole.log("failed to get book info.");
    }
    return html;
  }).catch(err => {
    console.log(err);
  });
  return res;
}