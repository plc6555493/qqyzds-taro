const devURL = "https://biz.258m.com/"; // 开发环境，需要开启mock server（执行：gulp mock）
// const devURL = "https://www.easy-mock.com/mock/5c90765427f7cd15bd94be45/api"; // 开发环境，easy-mock，真机调试时切换
const prodURL = "https://api.258m.com/"; // 生产环境，线上服务器

const BASE_URL = process.env.NODE_ENV === "development" ? devURL : prodURL;

export default BASE_URL;