const MONGO_SERVER_ADDRESS =
  "mongodb+srv://zyc020520:qtppmF9HdmdHRKjP@tcm.bf5ie4c.mongodb.net/?retryWrites=true&w=majority";
const PORT = 10000;
const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const Model = require("./model");
//const cors = require("cors");
const Caoyao = require("./caoyao_model");
const serverless = require("serverless-http");
const morgan = require("morgan");

mongoose.connect(MONGO_SERVER_ADDRESS).then(() => {
  console.log("Mongo服务器连接成功", MONGO_SERVER_ADDRESS);
});

const app = express();

app.use(morgan("dev"));

//app.use(cors());
const suoyinData = [
  { symptoms: "身热肢寒", ID: 0 },
  { symptoms: "腹中痞块", ID: 1 },
  { symptoms: "近视", ID: 2 },
  { symptoms: "顿咳", ID: 3 },
  { symptoms: "耳痛", ID: 4 },
  { symptoms: "气喘", ID: 5 },
  { symptoms: "咽喉白腐", ID: 6 },
  { symptoms: "滑胎", ID: 7 },
  { symptoms: "胎漏", ID: 8 },
  { symptoms: "健忘", ID: 9 },
  { symptoms: "产后身痛", ID: 10 },
  { symptoms: "皮肤紫斑", ID: 11 },
  { symptoms: "臁疮", ID: 12 },
  { symptoms: "骨痛", ID: 13 },
  { symptoms: "角弓反张", ID: 14 },
  { symptoms: "舌肿", ID: 15 },
  { symptoms: "小儿水痘", ID: 16 },
  { symptoms: "痄腮", ID: 17 },
  { symptoms: "舌裂", ID: 18 },
  { symptoms: "干呕", ID: 19 },
  { symptoms: "半身麻木", ID: 20 },
  { symptoms: "呃逆", ID: 21 },
  { symptoms: "经行腹痛", ID: 22 },
  { symptoms: "小便不利", ID: 23 },
  { symptoms: "善太息", ID: 24 },
  { symptoms: "牙龈出血", ID: 25 },
  { symptoms: "臂痛", ID: 26 },
  { symptoms: "面色青", ID: 27 },
  { symptoms: "经期延长", ID: 28 },
  { symptoms: "目羞明", ID: 29 },
  { symptoms: "舌胖", ID: 30 },
  { symptoms: "天疱疮", ID: 31 },
  { symptoms: "便血", ID: 32 },
  { symptoms: "畏寒", ID: 33 },
  { symptoms: "盗汗", ID: 34 },
  { symptoms: "血精", ID: 35 },
  { symptoms: "拳毛倒睫", ID: 36 },
  { symptoms: "鼻衄", ID: 37 },
  { symptoms: "须发早白", ID: 38 },
  { symptoms: "产后血崩", ID: 39 },
  { symptoms: "神昏", ID: 40 },
  { symptoms: "身痛", ID: 41 },
  { symptoms: "舌苔黄", ID: 42 },
  { symptoms: "善疑", ID: 43 },
  { symptoms: "嗳气", ID: 44 },
  { symptoms: "上胞下垂", ID: 45 },
  { symptoms: "寒战", ID: 46 },
  { symptoms: "乳房肿块", ID: 47 },
  { symptoms: "头目胀痛", ID: 48 },
  { symptoms: "舌紫", ID: 49 },
  { symptoms: "鼻塞", ID: 50 },
  { symptoms: "产后浮肿", ID: 51 },
  { symptoms: "唇肿", ID: 52 },
  { symptoms: "身重", ID: 53 },
  { symptoms: "发癍", ID: 54 },
  { symptoms: "阴吹", ID: 55 },
  { symptoms: "腹满", ID: 56 },
  { symptoms: "乳房红肿", ID: 57 },
  { symptoms: "妊娠呕吐", ID: 58 },
  { symptoms: "耳内流脓", ID: 59 },
  { symptoms: "目痒", ID: 60 },
  { symptoms: "舌光", ID: 61 },
  { symptoms: "疳翳", ID: 62 },
  { symptoms: "发癫", ID: 63 },
  { symptoms: "丹毒", ID: 64 },
  { symptoms: "大便下血", ID: 65 },
  { symptoms: "胬肉攀睛", ID: 66 },
  { symptoms: "大便秘结", ID: 67 },
  { symptoms: "胎位不正", ID: 68 },
  { symptoms: "小便浑浊", ID: 69 },
  { symptoms: "尿脓", ID: 70 },
  { symptoms: "肥胖", ID: 71 },
  { symptoms: "小儿多动", ID: 72 },
  { symptoms: "舌苔白", ID: 73 },
  { symptoms: "产后胁痛", ID: 74 },
  { symptoms: "脱发", ID: 75 },
  { symptoms: "漏下", ID: 76 },
  { symptoms: "胎毒", ID: 77 },
  { symptoms: "红鼻", ID: 78 },
  { symptoms: "失语", ID: 79 },
  { symptoms: "小儿丹毒", ID: 80 },
  { symptoms: "痴呆", ID: 81 },
  { symptoms: "经行先后无定期", ID: 82 },
  { symptoms: "目昏", ID: 83 },
  { symptoms: "噎膈", ID: 84 },
  { symptoms: "体臭", ID: 85 },
  { symptoms: "肛门瘙痒", ID: 86 },
  { symptoms: "月经过少", ID: 87 },
  { symptoms: "经行发热", ID: 88 },
  { symptoms: "鼻肿", ID: 89 },
  { symptoms: "产后腹痛", ID: 90 },
  { symptoms: "嗜睡", ID: 91 },
  { symptoms: "吞酸", ID: 92 },
  { symptoms: "瘫痪", ID: 93 },
  { symptoms: "赤脉传睛", ID: 94 },
  { symptoms: "绝汗", ID: 95 },
  { symptoms: "小儿啼哭", ID: 96 },
  { symptoms: "发黄", ID: 97 },
  { symptoms: "发狂", ID: 98 },
  { symptoms: "浮肿", ID: 99 },
  { symptoms: "胁痛", ID: 100 },
  { symptoms: "目干涩", ID: 101 },
  { symptoms: "四肢抽搐", ID: 102 },
  { symptoms: "胞睑肿胀", ID: 103 },
  { symptoms: "舌疮", ID: 104 },
  { symptoms: "战汗", ID: 105 },
  { symptoms: "白内障", ID: 106 },
  { symptoms: "不射精", ID: 107 },
  { symptoms: "痰核流注", ID: 108 },
  { symptoms: "口咸", ID: 109 },
  { symptoms: "妇人腹痛", ID: 110 },
  { symptoms: "足颤", ID: 111 },
  { symptoms: "呵欠", ID: 112 },
  { symptoms: "心下痞", ID: 113 },
  { symptoms: "急惊", ID: 114 },
  { symptoms: "转筋", ID: 115 },
  { symptoms: "毛发脱落", ID: 116 },
  { symptoms: "瞳神散大", ID: 117 },
  { symptoms: "舌痒", ID: 118 },
  { symptoms: "小儿发热", ID: 119 },
  { symptoms: "夜盲", ID: 120 },
  { symptoms: "舌生芒刺", ID: 121 },
  { symptoms: "心悸", ID: 122 },
  { symptoms: "舌痛", ID: 123 },
  { symptoms: "咽干", ID: 124 },
  { symptoms: "皮肤皲裂", ID: 125 },
  { symptoms: "喉痒", ID: 126 },
  { symptoms: "气从少腹上冲", ID: 127 },
  { symptoms: "胃痛", ID: 128 },
  { symptoms: "妊娠头痛", ID: 129 },
  { symptoms: "乳房胀痛", ID: 130 },
  { symptoms: "经间期出血", ID: 131 },
  { symptoms: "牙龈溃烂", ID: 132 },
  { symptoms: "瘰疬", ID: 133 },
  { symptoms: "尿痛", ID: 134 },
  { symptoms: "远视", ID: 135 },
  { symptoms: "小儿五软", ID: 136 },
  { symptoms: "小儿腹痛", ID: 137 },
  { symptoms: "足热", ID: 138 },
  { symptoms: "赤白带", ID: 139 },
  { symptoms: "小儿抽动", ID: 140 },
  { symptoms: "心烦", ID: 141 },
  { symptoms: "消瘦", ID: 142 },
  { symptoms: "口甜", ID: 143 },
  { symptoms: "肠鸣", ID: 144 },
  { symptoms: "头摇", ID: 145 },
  { symptoms: "产后发痉", ID: 146 },
  { symptoms: "脱肛", ID: 147 },
  { symptoms: "五心烦热", ID: 148 },
  { symptoms: "胎水肿满", ID: 149 },
  { symptoms: "小儿脐突", ID: 150 },
  { symptoms: "恶露不断", ID: 151 },
  { symptoms: "头汗", ID: 152 },
  { symptoms: "关节疼痛", ID: 153 },
  { symptoms: "背热", ID: 154 },
  { symptoms: "壮热", ID: 155 },
  { symptoms: "但热不寒", ID: 156 },
  { symptoms: "肛门疼痛", ID: 157 },
  { symptoms: "手舞足蹈", ID: 158 },
  { symptoms: "乳汁不行", ID: 159 },
  { symptoms: "肛漏", ID: 160 },
  { symptoms: "短气", ID: 161 },
  { symptoms: "产后眩晕", ID: 162 },
  { symptoms: "小儿木舌", ID: 163 },
  { symptoms: "鼻痒", ID: 164 },
  { symptoms: "咳血", ID: 165 },
  { symptoms: "阴疮", ID: 166 },
  { symptoms: "痫", ID: 167 },
  { symptoms: "云雾移睛", ID: 168 },
  { symptoms: "目札", ID: 169 },
  { symptoms: "口腻", ID: 170 },
  { symptoms: "项强", ID: 171 },
  { symptoms: "舌干", ID: 172 },
  { symptoms: "月经过多", ID: 173 },
  { symptoms: "囟门不合", ID: 174 },
  { symptoms: "口酸", ID: 175 },
  { symptoms: "黄汗", ID: 176 },
  { symptoms: "恶露不下", ID: 177 },
  { symptoms: "恶心", ID: 178 },
  { symptoms: "鼻臭", ID: 179 },
  { symptoms: "夜间多尿", ID: 180 },
  { symptoms: "大便艰难", ID: 181 },
  { symptoms: "头胀", ID: 182 },
  { symptoms: "阴痒", ID: 183 },
  { symptoms: "恶寒", ID: 184 },
  { symptoms: "妊娠咳嗽", ID: 185 },
  { symptoms: "鼻痛", ID: 186 },
  { symptoms: "掌跖发疱", ID: 187 },
  { symptoms: "漏睛", ID: 188 },
  { symptoms: "妊娠尿血", ID: 189 },
  { symptoms: "少气", ID: 190 },
  { symptoms: "口唇淡白", ID: 191 },
  { symptoms: "皮肤肥厚", ID: 192 },
  { symptoms: "崩中", ID: 193 },
  { symptoms: "小儿口疮", ID: 194 },
  { symptoms: "嘈杂", ID: 195 },
  { symptoms: "头热", ID: 196 },
  { symptoms: "小便不通", ID: 197 },
  { symptoms: "阴痛", ID: 198 },
  { symptoms: "舌纵", ID: 199 },
  { symptoms: "吐血", ID: 200 },
  { symptoms: "少腹痛", ID: 201 },
  { symptoms: "舌淡白", ID: 202 },
  { symptoms: "舌麻", ID: 203 },
  { symptoms: "肩痛", ID: 204 },
  { symptoms: "四肢麻木", ID: 205 },
  { symptoms: "头白秃", ID: 206 },
  { symptoms: "腰冷", ID: 207 },
  { symptoms: "谵语", ID: 208 },
  { symptoms: "腰重", ID: 209 },
  { symptoms: "麻疹", ID: 210 },
  { symptoms: "呕吐", ID: 211 },
  { symptoms: "小儿鹅口", ID: 212 },
  { symptoms: "口淡", ID: 213 },
  { symptoms: "烦躁", ID: 214 },
  { symptoms: "大便失禁", ID: 215 },
  { symptoms: "精液清冷", ID: 216 },
  { symptoms: "口臭", ID: 217 },
  { symptoms: "夏季热", ID: 218 },
  { symptoms: "心下悸", ID: 219 },
  { symptoms: "耳衄", ID: 220 },
  { symptoms: "舌苔黄腻", ID: 221 },
  { symptoms: "背冷", ID: 222 },
  { symptoms: "耳聋", ID: 223 },
  { symptoms: "四肢疼痛", ID: 224 },
  { symptoms: "腰脊痛", ID: 225 },
  { symptoms: "皮肤糜烂", ID: 226 },
  { symptoms: "无名肿毒", ID: 227 },
  { symptoms: "无汗", ID: 228 },
  { symptoms: "腰痛", ID: 229 },
  { symptoms: "舌红绛", ID: 230 },
  { symptoms: "小儿呕吐", ID: 231 },
  { symptoms: "皮肤红斑", ID: 232 },
  { symptoms: "鼻干", ID: 233 },
  { symptoms: "鼻流涕", ID: 234 },
  { symptoms: "偏头痛", ID: 235 },
  { symptoms: "脐疮", ID: 236 },
  { symptoms: "独语", ID: 237 },
  { symptoms: "闭经", ID: 238 },
  { symptoms: "疳积", ID: 239 },
  { symptoms: "蟹睛", ID: 240 },
  { symptoms: "胎萎不长", ID: 241 },
  { symptoms: "小儿多汗", ID: 242 },
  { symptoms: "足痛", ID: 243 },
  { symptoms: "过期不产", ID: 244 },
  { symptoms: "反胃", ID: 245 },
  { symptoms: "背痛", ID: 246 },
  { symptoms: "杨梅疮", ID: 247 },
  { symptoms: "里急后重", ID: 248 },
  { symptoms: "上吐下泻", ID: 249 },
  { symptoms: "小儿腹泻", ID: 250 },
  { symptoms: "面痛", ID: 251 },
  { symptoms: "牙痛", ID: 252 },
  { symptoms: "膝肿痛", ID: 253 },
  { symptoms: "腹泻", ID: 254 },
  { symptoms: "暴盲", ID: 255 },
  { symptoms: "血灌瞳神", ID: 256 },
  { symptoms: "妊娠眩晕", ID: 257 },
  { symptoms: "小便清长", ID: 258 },
  { symptoms: "小儿紫癜", ID: 259 },
  { symptoms: "妇人阴冷", ID: 260 },
  { symptoms: "口渴", ID: 261 },
  { symptoms: "舌强", ID: 262 },
  { symptoms: "五色带", ID: 263 },
  { symptoms: "积滞", ID: 264 },
  { symptoms: "小儿遗尿", ID: 265 },
  { symptoms: "汗血", ID: 266 },
  { symptoms: "产后发热", ID: 267 },
  { symptoms: "多梦", ID: 268 },
  { symptoms: "大便脓血", ID: 269 },
  { symptoms: "疲乏", ID: 270 },
  { symptoms: "头面瘙痒", ID: 271 },
  { symptoms: "舌青", ID: 272 },
  { symptoms: "口流涎", ID: 273 },
  { symptoms: "遗尿", ID: 274 },
  { symptoms: "四肢拘急", ID: 275 },
  { symptoms: "粉刺", ID: 276 },
  { symptoms: "喉中痰鸣", ID: 277 },
  { symptoms: "胎死不下", ID: 278 },
  { symptoms: "不孕", ID: 279 },
  { symptoms: "抱轮红", ID: 280 },
  { symptoms: "乳头破裂", ID: 281 },
  { symptoms: "足跟痛", ID: 282 },
  { symptoms: "口噤", ID: 283 },
  { symptoms: "皮肤瘙痒", ID: 284 },
  { symptoms: "小儿厌食", ID: 285 },
  { symptoms: "舌卷", ID: 286 },
  { symptoms: "鼻翼煽动", ID: 287 },
  { symptoms: "哮鸣", ID: 288 },
  { symptoms: "湿疮", ID: 289 },
  { symptoms: "善怒", ID: 290 },
  { symptoms: "头冷", ID: 291 },
  { symptoms: "四肢强直", ID: 292 },
  { symptoms: "崩漏", ID: 293 },
  { symptoms: "目偏视", ID: 294 },
  { symptoms: "小便失禁", ID: 295 },
  { symptoms: "瞳神缩小", ID: 296 },
  { symptoms: "头重", ID: 297 },
  { symptoms: "恶风", ID: 298 },
  { symptoms: "头皮麻木", ID: 299 },
  { symptoms: "面色红", ID: 300 },
  { symptoms: "经行身痛", ID: 301 },
  { symptoms: "睑弦赤烂", ID: 302 },
  { symptoms: "脑鸣", ID: 303 },
  { symptoms: "朱砂掌", ID: 304 },
  { symptoms: "头痛", ID: 305 },
  { symptoms: "声音嘶哑", ID: 306 },
  { symptoms: "食欲不振", ID: 307 },
  { symptoms: "潮热", ID: 308 },
  { symptoms: "小儿浮肿", ID: 309 },
  { symptoms: "小儿发黄", ID: 310 },
  { symptoms: "胞衣不下", ID: 311 },
  { symptoms: "脏躁", ID: 312 },
  { symptoms: "善恐", ID: 313 },
  { symptoms: "白带", ID: 314 },
  { symptoms: "腿肿痛", ID: 315 },
  { symptoms: "大便溏", ID: 316 },
  { symptoms: "头昏", ID: 317 },
  { symptoms: "腹冷", ID: 318 },
  { symptoms: "小儿痞块", ID: 319 },
  { symptoms: "低热", ID: 320 },
  { symptoms: "红疹", ID: 321 },
  { symptoms: "腰膝无力", ID: 322 },
  { symptoms: "恶寒发热", ID: 323 },
  { symptoms: "面色白", ID: 324 },
  { symptoms: "口苦", ID: 325 },
  { symptoms: "不寐", ID: 326 },
  { symptoms: "多唾", ID: 327 },
  { symptoms: "尿后余沥", ID: 328 },
  { symptoms: "痱子", ID: 329 },
  { symptoms: "脐出血", ID: 330 },
  { symptoms: "脐湿", ID: 331 },
  { symptoms: "弄舌", ID: 332 },
  { symptoms: "交接出血", ID: 333 },
  { symptoms: "口唇焦裂", ID: 334 },
  { symptoms: "腹痛", ID: 335 },
  { symptoms: "阴挺", ID: 336 },
  { symptoms: "咳痰", ID: 337 },
  { symptoms: "肛裂", ID: 338 },
  { symptoms: "小便频数", ID: 339 },
  { symptoms: "牙齿浮动", ID: 340 },
  { symptoms: "咳嗽", ID: 341 },
  { symptoms: "皮肤结节", ID: 342 },
  { symptoms: "善悲", ID: 343 },
  { symptoms: "慢惊", ID: 344 },
  { symptoms: "针眼", ID: 345 },
  { symptoms: "咽喉痛", ID: 346 },
  { symptoms: "小便黄赤", ID: 347 },
  { symptoms: "咽肿", ID: 348 },
  { symptoms: "头晕", ID: 349 },
  { symptoms: "白睛红赤", ID: 350 },
  { symptoms: "喷嚏", ID: 351 },
  { symptoms: "手颤", ID: 352 },
  { symptoms: "手足厥冷", ID: 353 },
  { symptoms: "皮肤甲错", ID: 354 },
  { symptoms: "赤膜下垂", ID: 355 },
  { symptoms: "难产", ID: 356 },
  { symptoms: "自汗", ID: 357 },
  { symptoms: "流泪", ID: 358 },
  { symptoms: "半身不遂", ID: 359 },
  { symptoms: "舌上出血", ID: 360 },
  { symptoms: "妊娠心烦", ID: 361 },
  { symptoms: "善惊", ID: 362 },
  { symptoms: "口中生疮", ID: 363 },
  { symptoms: "囟门下陷", ID: 364 },
  { symptoms: "啮齿", ID: 365 },
  { symptoms: "妊娠心腹胀满", ID: 366 },
  { symptoms: "猫眼疮", ID: 367 },
  { symptoms: "妄想", ID: 368 },
  { symptoms: "憋气", ID: 369 },
  { symptoms: "善食易饥", ID: 370 },
  { symptoms: "牙龈肿痛", ID: 371 },
  { symptoms: "尿血", ID: 372 },
  { symptoms: "小儿青盲", ID: 373 },
  { symptoms: "胸闷", ID: 374 },
  { symptoms: "脐漏", ID: 375 },
  { symptoms: "视瞻昏渺", ID: 376 },
  { symptoms: "耳痒", ID: 377 },
  { symptoms: "寒热往来", ID: 378 },
  { symptoms: "舌苔白腻", ID: 379 },
  { symptoms: "黄带", ID: 380 },
  { symptoms: "带状疱疹", ID: 381 },
  { symptoms: "胸痛", ID: 382 },
  { symptoms: "妊娠小便不通", ID: 383 },
  { symptoms: "小儿重舌", ID: 384 },
  { symptoms: "胎动不安", ID: 385 },
  { symptoms: "晕厥", ID: 386 },
  { symptoms: "单腹胀大", ID: 387 },
  { symptoms: "产后腰痛", ID: 388 },
  { symptoms: "言语错乱", ID: 389 },
];

// app.listen(PORT, () => {
//   console.log(`服务器监听于端口${PORT}`);
// });

//用于根据症候获取对应ID

app.get("/.netlify/functions/server/zhenghou/:name", (req, res, next) => {
  const theId = suoyinData.filter((e) => {
    return String(e.symptoms).includes(req.params.name);
  });

  if (theId) {
    res.status(200).json({
      status: "scuess",
      theId,
    });
    return;
  } else {
    res.status(200).json({
      status: "fail",
      reason: "不存在的症候名",
    });
  }
});

//告知症候ID 返回实际可治疗的草药编号列表

app.get(
  "/.netlify/functions/server/reality/:id",
  catchAsync(async (req, res, next) => {
    const result = await Model.find()
      .where("症候编号")
      .equals(Number(req.params.id))
      .where("实际该草药是否可治疗该疾病")
      .equals(1)
      .select("-预测该草药是否可治疗该疾病");

    res.status(200).json({
      status: "scuess",
      result,
    });
  })
);

//告知症候ID 返回预测可治疗的草药编号列表

app.get(
  "/.netlify/functions/server/prediction/:id",
  catchAsync(async (req, res, next) => {
    let result = await Model.find()
      .where("症候编号")
      .equals(Number(req.params.id))
      .where("预测该草药是否可治疗该疾病")
      .equals(1)
      .select("-实际该草药是否可治疗该疾病");

    res.status(200).json({
      status: "scuess",
      result,
    });
  })
);

//捕获错误

app.all("*", (req, res, next) => {
  res.status(404).send("404 not found");
});

function catchAsync(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch((e) => {
      console.log(e.message);
    });
  };
}

exports.handler = serverless(app);
