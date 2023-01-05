/*
 * @Description:
 * @Date: 2022-12-12 17:41:07
 */
const JsonToTS = require('./build/packages/core/src/index').default;
const { parse } = require('@babel/parser');
debugger;

const data = JsonToTS(`{
  code: '1',
  data: {
    showOrderAudit: true, 
    showTerminalPayMgr: true, //是否展示终端支付管理
    showSettlementCenter: true //是否展示结算中心
  },
  message: '操作成功',
  status: 1 
}`);
data.forEach(item => {
  console.log(item);
});
