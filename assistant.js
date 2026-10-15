(() => {
  const panel = document.getElementById('assistantPanel');
  const toggle = document.getElementById('assistantToggle');
  const close = document.getElementById('assistantClose');
  const form = document.getElementById('assistantForm');
  const input = document.getElementById('assistantInput');
  const messages = document.getElementById('assistantMessages');

  if (!panel || !toggle || !form || !input || !messages) return;

  const answers = [
    { keys: ['evus', '登记'], text: 'EVUS 通常适用于持中国护照和10年有效 B-1、B-2 或 B-1/B-2 访客签证的旅客。L-1 等其他签证类别通常不需要。出发前请在 EVUS 官方网站核实当前要求：https://www.evus.gov/' },
    { keys: ['中国驾照', '大陆驾照', '国际驾照', '开车', '驾驶'], text: '德州 DPS 的外国驾照互惠规则适用于其列明的国际协议/地区；中国大陆不在该页面列出的名单中。请先向 Texas DPS 核实你的具体情况，未确认驾驶资格前先使用其他交通方式。翻译件本身不等于驾驶许可。官方说明：https://www.dps.texas.gov/section/driver-license/driving-privilege-reciprocity' },
    { keys: ['德州驾照', '考驾照', '驾照申请', 'dps', '路考', '笔试'], text: '新德州居民通常需在90天内申请德州驾照以继续驾驶。申请常见材料包括合法停留证明、身份、SSN或DPS认可的说明、两份德州住址证明，以及有车时的保险证明。需要路考时，DPS要求先完成相应 ITD 课程，证书有效90天。请使用DPS材料检查和预约流程核对个人要求：https://www.dps.texas.gov/section/driver-license/apply-texas-driver-license' },
    { keys: ['i-94', '入境记录', '入境后'], text: '抵达后可在 CBP 官网查询电子 I-94，核对姓名、入境身份类别和获准停留期限。如有不一致，请尽快联系 CBP、TOYO Solar HR 或公司移民顾问：https://i94.cbp.dhs.gov/' },
    { keys: ['l-1', 'l1a', 'l1b', '移民', '签证'], text: 'L-1A 通常对应公司内部调派的经理/高管岗位，L-1B 通常对应专业知识岗位。具体资格、文件和职位变更影响取决于个人案件；请联系 TOYO Solar HR 和公司移民顾问，不要仅凭聊天答案作出移民决定。' }
    { keys: ['入境材料', '带什么文件', '海关', 'cbp', '护照', '签证'], text: '护照、签证、雇主提供的批准/调派文件、美国公司联系人、工作地点和首晚住址放在随身行李中。具体材料按你的签证类别和个案清单准备。入境问题请如实、简洁回答；签证不保证一定获准入境。个案问题请联系 TOYO Solar HR/移民顾问。' },
    { keys: ['租车', '租车保险'], text: '预约前分别确认租车公司的文件要求和你在德州的实际驾驶资格。比较总价、押金、额外驾驶人、收费道路账单、事故流程和保险覆盖；租车公司交车不代表你已获准在德州驾驶。' },
    { keys: ['买车', '购车', '买汽车'], text: '除车价外也预算保险、注册、税费、维修和停车。签约前核对 VIN/车辆历史、产权与留置权、融资总成本和合同，并考虑独立验车。新迁入德州的车辆注册说明：https://www.txdmv.gov/motorists/new-to-texas' },
    { keys: ['公寓', '住址', '住房', '维修', '入住'], text: '请联系 TOYO Solar 落地支持联系人确认临时住址、门禁、物业联系方式、通勤和安全问题。当前网页还没有填写经核实的值班电话；如果你遇到紧急危险，请拨打911。' },
    { keys: ['911', '紧急', '急救', '危险'], text: '如有立即危险或需要紧急救援，请直接拨打911。确保安全后，再联系 TOYO Solar 指定支持人员。此聊天演示没有人工值守，不是紧急求助渠道。' },
    { keys: ['手机', '银行', '超市', '生活', '接机', '交通', '保险'], text: '我可以先根据网页上的休斯顿指南提供一般提示。具体公司接机、报销、住房或保险福利政策需要 TOYO Solar HR 确认；请联系落地支持联系人，避免按一般信息自行假设公司会承担费用。' },
  ];

  function appendMessage(text, who) {
    const item = document.createElement('div');
    item.className = `assistant-message ${who}`;
    item.textContent = text;
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
  }

  function answerFor(question) {
    const q = question.toLowerCase();
    const match = answers.find(item => item.keys.some(key => q.includes(key)));
    return match ? match.text : '这个问题还不在已核实的指南范围内，我不想猜测。请联系 TOYO Solar HR 或落地支持联系人；如果涉及签证/个人移民情况，请联系公司移民顾问。请不要在聊天中发送护照号、签证号、I-94号、SSN、银行密码或验证码。';
  }

  function submitQuestion(question) {
    const value = question.trim();
    if (!value) return;
    appendMessage(value, 'user');
    input.value = '';
    window.setTimeout(() => appendMessage(answerFor(value), 'bot'), 180);
  }

  toggle.addEventListener('click', () => {
    const isOpen = panel.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) input.focus();
  });
  close.addEventListener('click', () => {
    panel.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.focus();
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    submitQuestion(input.value);
  });
  messages.addEventListener('click', event => {
    const chip = event.target.closest('[data-question]');
    if (chip) submitQuestion(chip.dataset.question);
  });
})();
