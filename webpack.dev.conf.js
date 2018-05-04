const merge = require('webpack-merge');
const path = require('path');
const base = require('./webpack.base.conf.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const express = require('express');

const app = express();

const router = express.Router();

const apiRouter = express.Router();

app.use(router);
app.use('/api', apiRouter);

const mock = require('./mock/mock.js');

module.exports = merge(base, {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({template: './index.html', filename: 'index.html'}),
    ],
    devServer: {
        contentBase: './dist/Admin',
        before(app) {
            const bodyParser = require('body-parser');
            app.use(bodyParser.urlencoded({extended: false}));
            app.use(bodyParser.json());
            //登陆
            app.post('/api/Login', function (req, res) {
                let token = parseInt(Math.random() * 9635423165465452).toString(16);
                let user = req.body;
                if (user.username == 'admin' && user.password == '123456') {
                    res.json({
                        "status_code": 1,
                        "message": "登录成功！",
                        "data": {
                            "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vcmNtLmNjL2FwaS9Mb2dpbiIsImlhdCI6MTUyNDcyMzczNiwiZXhwIjoxNTI0NzI3MzM2LCJuYmYiOjE1MjQ3MjM3MzYsImp0aSI6IjNyem1mcjdkc1JrMERWWUkiLCJzdWIiOjEsInBydiI6ImRmODgzZGI5N2JkMDVlZjhmZjg1MDgyZDY4NmM0NWU4MzJlNTkzYTkifQ.cjEZ_ZevnfnkxZVMLf0CuOOFw6bAzC8AvXNIgYbQHzY",
                            "expires_in": 3600
                        }
                    })
                } else {
                    res.json({
                        code: '002',
                        msg: 'go out'
                    })
                }
            });
            //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>一级榜单API
            //获取一级榜单
            app.get('/api/Ranking/FirstIndex', (req, res) => {
                res.json({
                    "status_code": 1,
                    "message": "获取一级成功！",
                    "data": {
                        "current_page": 1,
                        "data": [
                            {
                                "id": 1,
                                "ranking_name": "其他",
                                "ranking_desc": null,
                                "exponent": 0,
                                "is_check": 0,
                                "is_hide": 0,
                                "asterisk": 0,
                                "created_at": "2018-05-04 18:25:45",
                                "updated_at": "2018-05-04 18:25:45",
                                "operate_name": {
                                    "name": "admin"
                                }
                            },
                            {
                                "id": 2,
                                "ranking_name": "知乎",
                                "ranking_desc": "知乎",
                                "exponent": 0,
                                "is_check": 0,
                                "is_hide": 0,
                                "asterisk": 0,
                                "created_at": "2018-05-04 18:25:45",
                                "updated_at": "2018-05-04 18:25:45",
                                "operate_name": {
                                    "name": "admin"
                                }
                            },
                            {
                                "id": 3,
                                "ranking_name": "其他",
                                "ranking_desc": null,
                                "exponent": 0,
                                "is_check": 0,
                                "is_hide": 0,
                                "asterisk": 0,
                                "created_at": "2018-05-04 18:26:16",
                                "updated_at": "2018-05-04 18:26:16",
                                "operate_name": {
                                    "name": "admin"
                                }
                            },
                            {
                                "id": 4,
                                "ranking_name": "知乎",
                                "ranking_desc": "知乎",
                                "exponent": 0,
                                "is_check": 0,
                                "is_hide": 0,
                                "asterisk": 0,
                                "created_at": "2018-05-04 18:26:16",
                                "updated_at": "2018-05-04 18:26:16",
                                "operate_name": {
                                    "name": "admin"
                                }
                            }
                        ],
                        "first_page_url": "http://rcm.bantangtv.com/api/Ranking/FirstIndex?page=1",
                        "from": 1,
                        "last_page": 1,
                        "last_page_url": "http://rcm.bantangtv.com/api/Ranking/FirstIndex?page=1",
                        "next_page_url": null,
                        "path": "http://rcm.bantangtv.com/api/Ranking/FirstIndex",
                        "per_page": 15,
                        "prev_page_url": null,
                        "to": 4,
                        "total": 4
                    }
                })
            })
            //获取榜单/api/Ranking/index
            app.get('/api/Ranking/index', (req, res) => {
                res.json({
                    code: 1,
                    data: [
                        {
                            "ranking_name": "膜是日常",
                            "ranking_desc": "涂抹式面膜是日常护肤必不可少的一个环节～一起来看看大家最喜欢的是哪几种哪？",
                            "operate_id": "admin",
                            "is_hide": 1,
                            "asterisk": 0,
                            "updated_at": {
                                "date": "2018-04-24 12:55:26.000000",
                                "timezone_type": 3,
                                "timezone": "UTC"
                            }
                        },
                        {
                            "ranking_name": "看看大家最喜欢",
                            "ranking_desc": "涂抹式面膜是日常护肤必不可少的一个环节～一起来看看大家最喜欢的是哪几种哪？",
                            "operate_id": "admin",
                            "is_hide": 1,
                            "asterisk": 0,
                            "updated_at": {
                                "date": "2018-04-24 12:55:26.000000",
                                "timezone_type": 3,
                                "timezone": "UTC"
                            }
                        },
                        {
                            "ranking_name": "日常护肤必不可",
                            "ranking_desc": "涂抹式面膜是日常护肤必不可少的一个环节～一起来看看大家最喜欢的是哪几种哪？",
                            "operate_id": "admin",
                            "is_hide": 1,
                            "asterisk": 0,
                            "updated_at": {
                                "date": "2018-04-24 12:55:26.000000",
                                "timezone_type": 3,
                                "timezone": "UTC"
                            }
                        },
                        {
                            "ranking_name": "的一个环节～一起来看看大家最喜欢的是哪几种哪",
                            "ranking_desc": "涂抹式面膜是日常护肤必不可少的一个环节～一起来看看大家最喜欢的是哪几种哪？",
                            "operate_id": "admin",
                            "is_hide": 1,
                            "asterisk": 0,
                            "updated_at": {
                                "date": "2018-04-24 12:55:26.000000",
                                "timezone_type": 3,
                                "timezone": "UTC"
                            }
                        },
                        {
                            "ranking_name": "面膜是日常护肤必不可少的一个环节～一起来看看大家最喜欢",
                            "ranking_desc": "涂抹式面膜是日常护肤必不可少的一个环节～一起来看看大家最喜欢的是哪几种哪？",
                            "operate_id": "admin",
                            "is_hide": 1,
                            "asterisk": 0,
                            "updated_at": {
                                "date": "2018-04-24 12:55:26.000000",
                                "timezone_type": 3,
                                "timezone": "UTC"
                            }
                        }
                    ]
                })
            });
            //获取侧边栏
            app.get('/api/index/getMenu', (req, res) => {
                res.json({
                    "code": 1,
                    "msg": "获取成功",
                    "data": [
                        {
                            "id": 1,
                            "name": "角色管理",
                            "route_name": "role",
                            "menu": [
                                {
                                    "id": 2,
                                    "name": "角色列表",
                                    "route_name": "RoleList"
                                }
                            ]
                        },
                        {
                            "id": 7,
                            "name": "榜单管理",
                            "route_name": "ranking",
                            "menu": [
                                {
                                    "id": 8,
                                    "name": "一级榜单列表",
                                    "route_name": "FirstList"
                                },
                                {
                                    "id": 14,
                                    "name": "二级榜单列表",
                                    "route_name": "SecondList"
                                }
                            ]
                        },
                        {
                            "id": 21,
                            "name": "推送管理",
                            "route_name": "push",
                            "menu": [
                                {
                                    "id": 22,
                                    "name": "推送列表",
                                    "route_name": "PushList"
                                }
                            ]
                        }
                    ]
                })
            });

            //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>二级榜单API
            //导入榜单
            app.post("/api/Ranking/importRanking", (req, res) => {
                res.json({
                    code: '001',
                    msg: 'success',
                    data: req.body
                })
            });
            //获取二级榜单
            app.get('/api/Ranking/SecondIndex', (req, res) => {
                res.json({
                    "status_code": 1,
                    "message": "获取二级成功！",
                    "data": {
                        "current_page": 1,
                        "data": [
                            {
                                "id": 1,
                                "ranking_name": "涂抹式面膜人气榜单",
                                "ranking_desc": "涂抹式面膜是日常护肤必不可少的一个环节～一起来看看大家最喜欢的是哪几种哪？",
                                "exponent": 0,
                                "is_check": 0,
                                "is_hide": 1,
                                "asterisk": 0,
                                "created_at": "2018-05-04 18:25:45",
                                "updated_at": "2018-05-04 18:25:45",
                                "operate_name": {
                                    "name": "admin"
                                }
                            },
                            {
                                "id": 2,
                                "ranking_name": "猫粮品牌排行榜",
                                "ranking_desc": "猫咪是人们最爱的宠物之一，为了伺候好猫主子，口粮的选择是很重要的。好的猫粮能让猫咪健康成长。",
                                "exponent": 0,
                                "is_check": 0,
                                "is_hide": 1,
                                "asterisk": 0,
                                "created_at": "2018-05-04 18:25:45",
                                "updated_at": "2018-05-04 18:25:45",
                                "operate_name": {
                                    "name": "admin"
                                }
                            },
                            {
                                "id": 3,
                                "ranking_name": "789798797",
                                "ranking_desc": "天然猫粮一般是指肉类和蛋白质韩流比较丰富，有蔬菜、全麦粉、纤维等成分的猫粮。不含人工添加剂，成分安全，对猫咪的成长很有好处的。",
                                "exponent": 0,
                                "is_check": 0,
                                "is_hide": 1,
                                "asterisk": 0,
                                "created_at": "2018-05-04 18:25:45",
                                "updated_at": "2018-05-04 18:25:45",
                                "operate_name": {
                                    "name": "admin"
                                }
                            },
                            {
                                "id": 4,
                                "ranking_name": "耐养便宜的宠物排行榜",
                                "ranking_desc": "没钱没时间还想养宠物？那你一定需要这个榜单",
                                "exponent": 0,
                                "is_check": 0,
                                "is_hide": 1,
                                "asterisk": 0,
                                "created_at": "2018-05-04 18:25:45",
                                "updated_at": "2018-05-04 18:25:45",
                                "operate_name": {
                                    "name": "admin"
                                }
                            },
                            {
                                "id": 5,
                                "ranking_name": "长寿宠物排行榜",
                                "ranking_desc": "世界上最长寿的宠物是？",
                                "exponent": 0,
                                "is_check": 0,
                                "is_hide": 1,
                                "asterisk": 0,
                                "created_at": "2018-05-04 18:25:45",
                                "updated_at": "2018-05-04 18:25:45",
                                "operate_name": {
                                    "name": "admin"
                                }
                            },
                            {
                                "id": 6,
                                "ranking_name": "理科热门专业",
                                "ranking_desc": "高中文理分科时每个人都会面临着究竟是学文还是学理的纠结。很多人认为学文不如学理，理由是理科范围广好就业。那么理科最热门的专业有哪些呢?",
                                "exponent": 0,
                                "is_check": 0,
                                "is_hide": 1,
                                "asterisk": 0,
                                "created_at": "2018-05-04 18:25:45",
                                "updated_at": "2018-05-04 18:25:45",
                                "operate_name": {
                                    "name": "admin"
                                }
                            },
                            {
                                "id": 7,
                                "ranking_name": "美国医科专业学校排行",
                                "ranking_desc": "想去美国留学学习医科专业，哪所学校的医学院最好呢？",
                                "exponent": 0,
                                "is_check": 0,
                                "is_hide": 1,
                                "asterisk": 0,
                                "created_at": "2018-05-04 18:25:45",
                                "updated_at": "2018-05-04 18:25:45",
                                "operate_name": {
                                    "name": "admin"
                                }
                            },
                            {
                                "id": 8,
                                "ranking_name": "女生热门专业",
                                "ranking_desc": "在这些专业里，可能90%以上都是女生，男女比例严重失调…",
                                "exponent": 0,
                                "is_check": 0,
                                "is_hide": 1,
                                "asterisk": 0,
                                "created_at": "2018-05-04 18:25:45",
                                "updated_at": "2018-05-04 18:25:45",
                                "operate_name": {
                                    "name": "admin"
                                }
                            },
                            {
                                "id": 9,
                                "ranking_name": "热门小语种",
                                "ranking_desc": "由于小语种人才稀缺，因此身怀\"绝技\"的人才不但有机会在外交部、商务部等国家相关部委就职，还能报考公务员、进外企、做陪同翻译等，待遇也很好。你看好哪些小语种呢？",
                                "exponent": 0,
                                "is_check": 0,
                                "is_hide": 1,
                                "asterisk": 0,
                                "created_at": "2018-05-04 18:25:45",
                                "updated_at": "2018-05-04 18:25:45",
                                "operate_name": {
                                    "name": "admin"
                                }
                            },
                            {
                                "id": 10,
                                "ranking_name": "英语教育机构",
                                "ranking_desc": "英语学习了解一下？",
                                "exponent": 0,
                                "is_check": 0,
                                "is_hide": 1,
                                "asterisk": 0,
                                "created_at": "2018-05-04 18:25:45",
                                "updated_at": "2018-05-04 18:25:45",
                                "operate_name": {
                                    "name": "admin"
                                }
                            },
                            {
                                "id": 11,
                                "ranking_name": "中国各省份高考难度",
                                "ranking_desc": "高考就像一群人在玩闯关游戏，同样在通关但你打的是困难模式别人打的是easy模式而且还自带外挂！不是你不努力，实在是敌人太狡猾啊～～～",
                                "exponent": 0,
                                "is_check": 0,
                                "is_hide": 1,
                                "asterisk": 0,
                                "created_at": "2018-05-04 18:25:45",
                                "updated_at": "2018-05-04 18:25:45",
                                "operate_name": {
                                    "name": "admin"
                                }
                            },
                            {
                                "id": 12,
                                "ranking_name": "中国含金量高的资格证书",
                                "ranking_desc": "截至目前，我国已有272项各类职业资格取消。那么现在问题来了：取消了这么多职业资格证书，还有哪些证书含金量高?值得去考证的呢?",
                                "exponent": 0,
                                "is_check": 0,
                                "is_hide": 1,
                                "asterisk": 0,
                                "created_at": "2018-05-04 18:25:45",
                                "updated_at": "2018-05-04 18:25:45",
                                "operate_name": {
                                    "name": "admin"
                                }
                            },
                            {
                                "id": 13,
                                "ranking_name": "国产天然狗粮",
                                "ranking_desc": "国产狗粮品牌很多，也有很多非常优质的天然狗粮品牌，吃天然狗粮对狗狗的健康比较好。",
                                "exponent": 0,
                                "is_check": 0,
                                "is_hide": 1,
                                "asterisk": 0,
                                "created_at": "2018-05-04 18:25:45",
                                "updated_at": "2018-05-04 18:25:45",
                                "operate_name": {
                                    "name": "admin"
                                }
                            },
                            {
                                "id": 14,
                                "ranking_name": "进口天然口粮",
                                "ranking_desc": "在喂养狗狗的时候，选择狗粮是很重要的。很多人在经济条件允许的时候，都会选择天然狗粮。而相比较来说，国外的天然狗粮名气更大一些。",
                                "exponent": 0,
                                "is_check": 0,
                                "is_hide": 1,
                                "asterisk": 0,
                                "created_at": "2018-05-04 18:25:45",
                                "updated_at": "2018-05-04 18:25:45",
                                "operate_name": {
                                    "name": "admin"
                                }
                            },
                            {
                                "id": 15,
                                "ranking_name": "顶级狗粮品牌",
                                "ranking_desc": null,
                                "exponent": 0,
                                "is_check": 0,
                                "is_hide": 1,
                                "asterisk": 0,
                                "created_at": "2018-05-04 18:25:45",
                                "updated_at": "2018-05-04 18:25:45",
                                "operate_name": {
                                    "name": "admin"
                                }
                            }
                        ],
                        "first_page_url": "http://rcm.bantangtv.com/api/Ranking/SecondIndex?page=1",
                        "from": 1,
                        "last_page": 4,
                        "last_page_url": "http://rcm.bantangtv.com/api/Ranking/SecondIndex?page=4",
                        "next_page_url": "http://rcm.bantangtv.com/api/Ranking/SecondIndex?page=2",
                        "path": "http://rcm.bantangtv.com/api/Ranking/SecondIndex",
                        "per_page": 15,
                        "prev_page_url": null,
                        "to": 15,
                        "total": 60
                    }
                })
            })
            //添加二级榜单
            app.post('/api/Ranking/SecondAdd', (req, res) => {
                res.json({
                    code: '001',
                    message: '添加成功'
                })
            })
            //显示隐藏
            app.put('/api/Ranking/FirstHide/1', (req, res) => {
                res.json({
                    code: '001',
                    message: 'success'
                })
            })
            app.put('/api/Ranking/FirstHide/0', (req, res) => {
                res.json({
                    code: '001',
                    message: 'success'
                })
            });
            //获取元素列表
            app.get('/api/Element/index', (req, res) => {
                res.json({
                    "status_code": 1,
                    "message": "获取元素成功！",
                    "data": {
                        "current_page": 1,
                        "data": [
                            {
                                "id": 1,
                                "element_name": "詹姆斯 我累了",
                                "element_desc": null,
                                "exponent": 270039,
                                "is_hide": 0,
                                "asterisk": 0,
                                "created_at": "2018-05-03 10:21:41",
                                "updated_at": "2018-05-03 10:21:41",
                                "operate_name": {
                                    "name": "admin"
                                }
                            },
                            {
                                "id": 2,
                                "element_name": "新歌被批曲风过时",
                                "element_desc": null,
                                "exponent": 237120,
                                "is_hide": 0,
                                "asterisk": 0,
                                "created_at": "2018-05-03 10:21:41",
                                "updated_at": "2018-05-03 10:21:41",
                                "operate_name": {
                                    "name": "admin"
                                }
                            },
                            {
                                "id": 3,
                                "element_name": "朝鲜将用首尔时间",
                                "element_desc": null,
                                "exponent": 189724,
                                "is_hide": 0,
                                "asterisk": 0,
                                "created_at": "2018-05-03 10:21:41",
                                "updated_at": "2018-05-03 10:21:41",
                                "operate_name": {
                                    "name": "admin"
                                }
                            },
                            {
                                "id": 4,
                                "element_name": "范丞丞晒自拍付费",
                                "element_desc": null,
                                "exponent": 164764,
                                "is_hide": 0,
                                "asterisk": 0,
                                "created_at": "2018-05-03 10:21:41",
                                "updated_at": "2018-05-03 10:21:41",
                                "operate_name": {
                                    "name": "admin"
                                }
                            },
                            {
                                "id": 5,
                                "element_name": "惠若琪 大婚",
                                "element_desc": null,
                                "exponent": 142250,
                                "is_hide": 0,
                                "asterisk": 0,
                                "created_at": "2018-05-03 10:21:41",
                                "updated_at": "2018-05-03 10:21:41",
                                "operate_name": {
                                    "name": "admin"
                                }
                            },
                            {
                                "id": 6,
                                "element_name": "诺贝尔文学奖丑闻",
                                "element_desc": null,
                                "exponent": 121256,
                                "is_hide": 0,
                                "asterisk": 0,
                                "created_at": "2018-05-03 10:21:41",
                                "updated_at": "2018-05-03 10:21:41",
                                "operate_name": {
                                    "name": "admin"
                                }
                            },
                            {
                                "id": 7,
                                "element_name": "张若昀斥隐私被泄",
                                "element_desc": null,
                                "exponent": 117976,
                                "is_hide": 0,
                                "asterisk": 0,
                                "created_at": "2018-05-03 10:21:41",
                                "updated_at": "2018-05-03 10:21:41",
                                "operate_name": {
                                    "name": "admin"
                                }
                            },
                            {
                                "id": 8,
                                "element_name": "游客偷香蕉遭殴打",
                                "element_desc": null,
                                "exponent": 117346,
                                "is_hide": 0,
                                "asterisk": 0,
                                "created_at": "2018-05-03 10:21:41",
                                "updated_at": "2018-05-03 10:21:41",
                                "operate_name": {
                                    "name": "admin"
                                }
                            },
                            {
                                "id": 9,
                                "element_name": "阚清子称重新认识",
                                "element_desc": null,
                                "exponent": 109231,
                                "is_hide": 0,
                                "asterisk": 0,
                                "created_at": "2018-05-03 10:21:41",
                                "updated_at": "2018-05-03 10:21:41",
                                "operate_name": {
                                    "name": "admin"
                                }
                            },
                            {
                                "id": 10,
                                "element_name": "陈怡蓉宣布怀孕",
                                "element_desc": null,
                                "exponent": 101736,
                                "is_hide": 0,
                                "asterisk": 0,
                                "created_at": "2018-05-03 10:21:41",
                                "updated_at": "2018-05-03 10:21:41",
                                "operate_name": {
                                    "name": "admin"
                                }
                            },
                            {
                                "id": 11,
                                "element_name": "孔雀遭游客拔毛",
                                "element_desc": null,
                                "exponent": 79151,
                                "is_hide": 0,
                                "asterisk": 0,
                                "created_at": "2018-05-03 10:21:41",
                                "updated_at": "2018-05-03 10:21:41",
                                "operate_name": {
                                    "name": "admin"
                                }
                            },
                            {
                                "id": 12,
                                "element_name": "特朗普伞被掀翻",
                                "element_desc": null,
                                "exponent": 73511,
                                "is_hide": 0,
                                "asterisk": 0,
                                "created_at": "2018-05-03 10:21:41",
                                "updated_at": "2018-05-03 10:21:41",
                                "operate_name": {
                                    "name": "admin"
                                }
                            },
                            {
                                "id": 13,
                                "element_name": "电视问政引发热议",
                                "element_desc": null,
                                "exponent": 62265,
                                "is_hide": 0,
                                "asterisk": 0,
                                "created_at": "2018-05-03 10:21:41",
                                "updated_at": "2018-05-03 10:21:41",
                                "operate_name": {
                                    "name": "admin"
                                }
                            },
                            {
                                "id": 14,
                                "element_name": "巴西女生桥上自拍",
                                "element_desc": null,
                                "exponent": 54570,
                                "is_hide": 0,
                                "asterisk": 0,
                                "created_at": "2018-05-03 10:21:41",
                                "updated_at": "2018-05-03 10:21:41",
                                "operate_name": {
                                    "name": "admin"
                                }
                            },
                            {
                                "id": 15,
                                "element_name": "逃犯出席朋友婚礼",
                                "element_desc": null,
                                "exponent": 50711,
                                "is_hide": 0,
                                "asterisk": 0,
                                "created_at": "2018-05-03 10:21:41",
                                "updated_at": "2018-05-03 10:21:41",
                                "operate_name": {
                                    "name": "admin"
                                }
                            }
                        ],
                        "first_page_url": "http://rcm.bantangtv.com/api/Element/index?page=1",
                        "from": 1,
                        "last_page": 4,
                        "last_page_url": "http://rcm.bantangtv.com/api/Element/index?page=4",
                        "next_page_url": "http://rcm.bantangtv.com/api/Element/index?page=2",
                        "path": "http://rcm.bantangtv.com/api/Element/index",
                        "per_page": 15,
                        "prev_page_url": null,
                        "to": 15,
                        "total": 50
                    }
                })
            })
            //编辑榜单
            app.post('/api/Ranking/SecondEdit/2', (req, res) => {
                res.json({
                    code: '001',
                    message: '修改成功'
                })
            })
            /////////////////////////////////////
            app.post('/submit/add_rank', (req, res) => {
                res.json(mock.sidebar)
            });
            app.post('/submit/edit_rank', (req, res) => {
                res.json({
                    code: '001',
                    msg: 'success',
                    data: []
                })
            });


        }
    }
})