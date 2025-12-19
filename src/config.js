/**
 * 博客配置文件，没有说明的就是必填项
 * @type {Object}
 * @property {String} title         博客标题
 * @property {String} subtitle      博客副标题
 * @property {String} description   博客描述
 * @property {String} keywords      博客关键字
 * @property {String} logo          博客图标 180x180
 * @property {String} favicon16     博客图标 16x16
 * @property {String} favicon32     博客图标 32x32
 * @property {String} createdTime   博客创建时间
 * @property {String} icp           ICP 备案号
 * @property {String} icpLink       ICP 备案链接
 * @property {String} beian         [选填] 公安备案号 '京公网安备 00000000000000号'
 * @property {String} beianLink     [选填] 公安备案链接 'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=00000000000000'
 * @property {String} username      GitHub 用户名
 * @property {String} repository    GitHub 仓库名
 * @property {String} friendsRepo   友链仓库名
 * @property {String} author        博客作者
 * @property {String} email         博客作者邮箱
 * @property {String} link          个人链接
 * @property {String} github        GitHub 链接
 * @property {String} name          友链名称
 * @property {String} url           友链链接
 * @property {String} avatar        友链头像
 * @property {String} desc          友链描述
 * @property {String} pageSize      文章列表每页显示文章数
 * @property {String} defaultCover  文章默认封面图
 */

export default {
  // 博客基础配置
  title: 'ZSXの小站',
  subtitle: '钟神秀的博客',
  description: '钟神秀在这里记录生活日常、踩坑教程和资源分享。',
  keywords: '钟神秀, 博客',
  logo: './logo.jpg',
  favicon16: './logo.jpg',
  favicon32: './logo.jpg',
  createdTime: '2025-12-18',
  icp: '',
  icpLink: '',
  beian: '',
  beianLink: '',
  // 关于页二维码
  alipay_qr: 'https://imgbed.mcyzsx.top/file/custom/Vuaj4DpO.jpg',
  // GitHub Issues 配置
  username: 'zsxcoder',
  repository: 'zsxcoder-blog',
  friendsRepo: 'ethereal-friends', // 留空则默认使用上方仓库获取
  // 您的信息
  author: '钟神秀',
  email: 'me@mcyzsx.top',
  link: 'https://myblog.mcyzsx.top',
  github: 'https://github.com/zsxcoder',
  // 友链信息
  name: 'ZSXの小站',
  url: 'https://myblog.mcyzsx.top',
  avatar: 'https://imgbed.mcyzsx.top/file/avatar/1765626136745_zsxcoder.jpg',
  desc: '每一段旅行，都有终点~',
  // 文章相关
  pageSize: 12,
  defaultCover: '/images/cover.jpg',
  errorImg: '/images/error.gif',
  // Twikoo 评论配置
  twikoo: {
    src: '//cdn.staticfile.org/twikoo/1.6.44/twikoo.all.min.js',
  },
}
