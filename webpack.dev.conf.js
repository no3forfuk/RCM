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
            //添加推送
            app.post('/api/Push/add', (req, res) => {
                res.json({
                    code: '1',
                    message: 'chenggong1'
                })
            })
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
                                "operate_type": 1,
                                "admin": {
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
            //隐藏一级榜单
            app.post('/api/Ranking/FirstHide/1', (req, res) => {
                res.json({
                    code: '001',
                    message: 'success'
                })
            })
            app.post('/api/Ranking/FirstHide/0', (req, res) => {
                res.json({
                    code: '001',
                    message: 'success'
                })
            });
            //添加一级榜单
            app.post('/api/Ranking/FirstAdd', (req, res) => {
                res.json({
                    code: '001',
                    message: '添加成功'
                })
            })
            //编辑一级榜单
            app.post('/api/Ranking/FirstEdit/2', (req, res) => {
                res.json({
                    code: '001',
                    massage: '修改成功'
                })
            })
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
                                },
                                {
                                    "id": 23,
                                    "name": "推送任务",
                                    "route_name": "PushTask"
                                }
                            ]
                        },
                        {
                            "id": 21,
                            "name": "元素管理",
                            "route_name": "element",
                            "menu": [
                                {
                                    "id": 22,
                                    "name": "元素列表",
                                    "route_name": "ElementList"
                                },
                                {
                                    "id": 33,
                                    "name": "POST列表",
                                    "route_name": "PostList"
                                }
                            ]
                        },
                        // {
                        //     "id": 21,
                        //     "name": "POST管理",
                        //     "route_name": "post",
                        //     "menu": [
                        //         {
                        //             "id": 22,
                        //             "name": "POST列表",
                        //             "route_name": "postList"
                        //         }
                        //     ]
                        // },
                        // {
                        //     "id": 21,
                        //     "name": "统计",
                        //     "route_name": "post",
                        //     "menu": [
                        //         {
                        //             "id": 22,
                        //             "name": "统计列表",
                        //             "route_name": "countList"
                        //         }
                        //     ]
                        // }
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
                                "operate_type": 1,
                                "admin": {
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
            });
            //获取二级榜单详情
            app.get('/api/Ranking/SecondDetails/', (req, res) => {
                res.json({
                    "status_code": 1,
                    "message": "获取详情成功！",
                    "data": {
                        "id": 2,
                        "ranking_name": "猫粮品牌排行榜",
                        "ranking_desc": "猫咪是人们最爱的宠物之一，为了伺候好猫主子，口粮的选择是很重要的。好的猫粮能让猫咪健康成长。",
                        "ranking_level": 2,
                        "exponent": 0,
                        "is_check": 0,
                        "is_hide": 1,
                        "asterisk": 0,
                        "updated_at": "2018-05-15 15:12:13",
                        "operate_type": 1,
                        "admin": {
                            "name": "admin"
                        }
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
            app.post('/api/Ranking/SecondHide/1', (req, res) => {
                res.json({
                    code: '001',
                    message: 'success'
                })
            })
            app.post('/api/Ranking/SecondHide/0', (req, res) => {
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
                                "element_name": "菲洛嘉 柔滑亮泽焕颜面膜",
                                "element_desc": "大名鼎鼎的十全大补面膜",
                                "exponent": 0,
                                "is_check": 0,
                                "is_hide": 0,
                                "asterisk": 0,
                                "created_at": "2018-05-04 10:11:59",
                                "updated_at": "2018-05-04 10:11:59",
                                "operate_name": {
                                    "name": "admin"
                                },
                                "second_ranking": [
                                    {
                                        "id": 1,
                                        "ranking_name": "涂抹式面膜人气榜单",
                                        "ranking_desc": "涂抹式面膜是日常护肤必不可少的一个环节～一起来看看大家最喜欢的是哪几种哪？",
                                        "exponent": 0,
                                        "is_check": 0,
                                        "is_hide": 1,
                                        "asterisk": 0,
                                        "created_at": "2018-05-04 10:11:59",
                                        "updated_at": "2018-05-04 10:11:59",
                                        "pivot": {
                                            "element_id": 1,
                                            "ranking_id": 1
                                        }
                                    }
                                ]
                            },
                            {
                                "id": 2,
                                "element_name": "香奈儿熨斗面膜",
                                "element_desc": "涂抹式面膜中的经典单品",
                                "exponent": 0,
                                "is_check": 0,
                                "is_hide": 1,
                                "asterisk": 0,
                                "created_at": "2018-05-04 10:11:59",
                                "updated_at": "2018-05-04 10:11:59",
                                "operate_name": {
                                    "name": "admin"
                                },
                                "second_ranking": [
                                    {
                                        "id": 1,
                                        "ranking_name": "涂抹式面膜人气榜单",
                                        "ranking_desc": "涂抹式面膜是日常护肤必不可少的一个环节～一起来看看大家最喜欢的是哪几种哪？",
                                        "exponent": 0,
                                        "is_check": 0,
                                        "is_hide": 1,
                                        "asterisk": 0,
                                        "created_at": "2018-05-04 10:11:59",
                                        "updated_at": "2018-05-04 10:11:59",
                                        "pivot": {
                                            "element_id": 2,
                                            "ranking_id": 1
                                        }
                                    }
                                ]
                            },
                            {
                                "id": 3,
                                "element_name": "彼得罗夫青瓜啫喱面膜",
                                "element_desc": "深层补水啫喱状面膜",
                                "exponent": 0,
                                "is_check": 0,
                                "is_hide": 0,
                                "asterisk": 0,
                                "created_at": "2018-05-04 10:11:59",
                                "updated_at": "2018-05-04 10:11:59",
                                "operate_name": {
                                    "name": "admin"
                                },
                                "second_ranking": [
                                    {
                                        "id": 1,
                                        "ranking_name": "涂抹式面膜人气榜单",
                                        "ranking_desc": "涂抹式面膜是日常护肤必不可少的一个环节～一起来看看大家最喜欢的是哪几种哪？",
                                        "exponent": 0,
                                        "is_check": 0,
                                        "is_hide": 1,
                                        "asterisk": 0,
                                        "created_at": "2018-05-04 10:11:59",
                                        "updated_at": "2018-05-04 10:11:59",
                                        "pivot": {
                                            "element_id": 3,
                                            "ranking_id": 1
                                        }
                                    }
                                ]
                            },
                            {
                                "id": 4,
                                "element_name": "碧欧泉奇迹面膜",
                                "element_desc": "奇迹面膜，含有 35 种营养成分，5%的高浓度活源精粹 LIFE PLANKTON，能加速肌底细胞新陈代谢，激活肌肤自主吸收源动力，增强肌肤抵抗力。",
                                "exponent": 0,
                                "is_check": 0,
                                "is_hide": 0,
                                "asterisk": 0,
                                "created_at": "2018-05-04 10:11:59",
                                "updated_at": "2018-05-04 10:11:59",
                                "operate_name": {
                                    "name": "admin"
                                },
                                "second_ranking": [
                                    {
                                        "id": 1,
                                        "ranking_name": "涂抹式面膜人气榜单",
                                        "ranking_desc": "涂抹式面膜是日常护肤必不可少的一个环节～一起来看看大家最喜欢的是哪几种哪？",
                                        "exponent": 0,
                                        "is_check": 0,
                                        "is_hide": 1,
                                        "asterisk": 0,
                                        "created_at": "2018-05-04 10:11:59",
                                        "updated_at": "2018-05-04 10:11:59",
                                        "pivot": {
                                            "element_id": 4,
                                            "ranking_id": 1
                                        }
                                    }
                                ]
                            },
                            {
                                "id": 5,
                                "element_name": "科颜氏金盏花舒缓保湿面膜",
                                "element_desc": "科颜氏金盏花舒缓保湿面膜，其配方保留了看得见的金盏花瓣，佐以芦荟汁配制，集镇静，舒缓，保湿，调理于一体，为肌肤注入焕颜活力，犹如浸浴在金盏花田一般清爽滋润，舒缓日常生活中的皮肤\"小情绪”。",
                                "exponent": 0,
                                "is_check": 0,
                                "is_hide": 0,
                                "asterisk": 0,
                                "created_at": "2018-05-04 10:11:59",
                                "updated_at": "2018-05-04 10:11:59",
                                "operate_name": {
                                    "name": "admin"
                                },
                                "second_ranking": [
                                    {
                                        "id": 1,
                                        "ranking_name": "涂抹式面膜人气榜单",
                                        "ranking_desc": "涂抹式面膜是日常护肤必不可少的一个环节～一起来看看大家最喜欢的是哪几种哪？",
                                        "exponent": 0,
                                        "is_check": 0,
                                        "is_hide": 1,
                                        "asterisk": 0,
                                        "created_at": "2018-05-04 10:11:59",
                                        "updated_at": "2018-05-04 10:11:59",
                                        "pivot": {
                                            "element_id": 5,
                                            "ranking_id": 1
                                        }
                                    }
                                ]
                            },
                            {
                                "id": 6,
                                "element_name": "悦木之源水润畅饮夜间密集修护面膜",
                                "element_desc": "悦木之源水润畅饮夜间密集滋养面膜乳霜质地，细腻幼滑，容易推开，能有效深层补水滋润，让肌肤瞬间恢复水嫩充盈状态，平衡肌肤水油分泌，明显改善肤质状况。",
                                "exponent": 0,
                                "is_check": 0,
                                "is_hide": 0,
                                "asterisk": 0,
                                "created_at": "2018-05-04 10:11:59",
                                "updated_at": "2018-05-04 10:11:59",
                                "operate_name": {
                                    "name": "admin"
                                },
                                "second_ranking": [
                                    {
                                        "id": 1,
                                        "ranking_name": "涂抹式面膜人气榜单",
                                        "ranking_desc": "涂抹式面膜是日常护肤必不可少的一个环节～一起来看看大家最喜欢的是哪几种哪？",
                                        "exponent": 0,
                                        "is_check": 0,
                                        "is_hide": 1,
                                        "asterisk": 0,
                                        "created_at": "2018-05-04 10:11:59",
                                        "updated_at": "2018-05-04 10:11:59",
                                        "pivot": {
                                            "element_id": 6,
                                            "ranking_id": 1
                                        }
                                    }
                                ]
                            },
                            {
                                "id": 7,
                                "element_name": "馥蕾诗 红茶抗皱紧致修护面膜",
                                "element_desc": "馥蕾诗红茶抗皱紧致修护面膜给予肌肤高效紧致，即刻柔软顺滑，幼嫩饱满。",
                                "exponent": 0,
                                "is_check": 0,
                                "is_hide": 0,
                                "asterisk": 0,
                                "created_at": "2018-05-04 10:11:59",
                                "updated_at": "2018-05-04 10:11:59",
                                "operate_name": {
                                    "name": "admin"
                                },
                                "second_ranking": [
                                    {
                                        "id": 1,
                                        "ranking_name": "涂抹式面膜人气榜单",
                                        "ranking_desc": "涂抹式面膜是日常护肤必不可少的一个环节～一起来看看大家最喜欢的是哪几种哪？",
                                        "exponent": 0,
                                        "is_check": 0,
                                        "is_hide": 1,
                                        "asterisk": 0,
                                        "created_at": "2018-05-04 10:11:59",
                                        "updated_at": "2018-05-04 10:11:59",
                                        "pivot": {
                                            "element_id": 7,
                                            "ranking_id": 1
                                        }
                                    }
                                ]
                            },
                            {
                                "id": 8,
                                "element_name": "皇家猫粮",
                                "element_desc": "皇家宠物食品有限公司全球总部于1967年成立，坐落在法国南部的埃玛哥共占地24公顷，集中了所有的重要设施并集结了所有的资源，一切都为了给犬猫提供最好的服务。皇家总部是由研发、营运、财务、人力资源部，以及四个销售部组成的将近500人大团队，为将近90个国家的60个分公司提供服务与支持。从Royal Canin这一品牌自1968年成立以来，经过40多年的发展已经成为全球宠物食品行业的领军人物。皇家另一大特色就是在总部设有大规模的犬场和猫场。犬猫场有160多只犬和180多只猫。皇家提供了最好的环境和最优质的食物，让这些犬猫在总部的犬猫场自在生活。",
                                "exponent": 0,
                                "is_check": 0,
                                "is_hide": 0,
                                "asterisk": 0,
                                "created_at": "2018-05-04 10:11:59",
                                "updated_at": "2018-05-04 10:11:59",
                                "operate_name": {
                                    "name": "admin"
                                },
                                "second_ranking": [
                                    {
                                        "id": 2,
                                        "ranking_name": "猫粮品牌排行榜",
                                        "ranking_desc": "猫咪是人们最爱的宠物之一，为了伺候好猫主子，口粮的选择是很重要的。好的猫粮能让猫咪健康成长。",
                                        "exponent": 0,
                                        "is_check": 0,
                                        "is_hide": 1,
                                        "asterisk": 0,
                                        "created_at": "2018-05-04 10:11:59",
                                        "updated_at": "2018-05-04 10:11:59",
                                        "pivot": {
                                            "element_id": 8,
                                            "ranking_id": 2
                                        }
                                    }
                                ]
                            },
                            {
                                "id": 9,
                                "element_name": "伟嘉猫粮",
                                "element_desc": "含有丰富的有机物，是小动物就能吃，只要它愿意吃喜欢这个味道。",
                                "exponent": 0,
                                "is_check": 0,
                                "is_hide": 0,
                                "asterisk": 0,
                                "created_at": "2018-05-04 10:11:59",
                                "updated_at": "2018-05-04 10:11:59",
                                "operate_name": {
                                    "name": "admin"
                                },
                                "second_ranking": [
                                    {
                                        "id": 2,
                                        "ranking_name": "猫粮品牌排行榜",
                                        "ranking_desc": "猫咪是人们最爱的宠物之一，为了伺候好猫主子，口粮的选择是很重要的。好的猫粮能让猫咪健康成长。",
                                        "exponent": 0,
                                        "is_check": 0,
                                        "is_hide": 1,
                                        "asterisk": 0,
                                        "created_at": "2018-05-04 10:11:59",
                                        "updated_at": "2018-05-04 10:11:59",
                                        "pivot": {
                                            "element_id": 9,
                                            "ranking_id": 2
                                        }
                                    }
                                ]
                            },
                            {
                                "id": 10,
                                "element_name": "雪山",
                                "element_desc": "美国雪山公司从1989年开始研制Natural Balance宠物食品，希望制造出世界上品质最优良和最健康的宠物食品。",
                                "exponent": 0,
                                "is_check": 0,
                                "is_hide": 0,
                                "asterisk": 0,
                                "created_at": "2018-05-04 10:11:59",
                                "updated_at": "2018-05-04 10:11:59",
                                "operate_name": {
                                    "name": "admin"
                                },
                                "second_ranking": [
                                    {
                                        "id": 2,
                                        "ranking_name": "猫粮品牌排行榜",
                                        "ranking_desc": "猫咪是人们最爱的宠物之一，为了伺候好猫主子，口粮的选择是很重要的。好的猫粮能让猫咪健康成长。",
                                        "exponent": 0,
                                        "is_check": 0,
                                        "is_hide": 1,
                                        "asterisk": 0,
                                        "created_at": "2018-05-04 10:11:59",
                                        "updated_at": "2018-05-04 10:11:59",
                                        "pivot": {
                                            "element_id": 10,
                                            "ranking_id": 2
                                        }
                                    }
                                ]
                            },
                            {
                                "id": 11,
                                "element_name": "凌采",
                                "element_desc": "美国Natura公司生产的宠物食品品种齐全、品质保证已有十多年历史，旗下有露华系列、露华EVO系列、加州天然系列、健盈系列、卡玛系列的猫粮、犬粮，罐头、饼干等纯天然产品，并一直处于同行业的领头羊位置。",
                                "exponent": 0,
                                "is_check": 0,
                                "is_hide": 0,
                                "asterisk": 0,
                                "created_at": "2018-05-04 10:11:59",
                                "updated_at": "2018-05-04 10:11:59",
                                "operate_name": {
                                    "name": "admin"
                                },
                                "second_ranking": [
                                    {
                                        "id": 2,
                                        "ranking_name": "猫粮品牌排行榜",
                                        "ranking_desc": "猫咪是人们最爱的宠物之一，为了伺候好猫主子，口粮的选择是很重要的。好的猫粮能让猫咪健康成长。",
                                        "exponent": 0,
                                        "is_check": 0,
                                        "is_hide": 1,
                                        "asterisk": 0,
                                        "created_at": "2018-05-04 10:11:59",
                                        "updated_at": "2018-05-04 10:11:59",
                                        "pivot": {
                                            "element_id": 11,
                                            "ranking_id": 2
                                        }
                                    }
                                ]
                            },
                            {
                                "id": 12,
                                "element_name": "珍宝SANPO",
                                "element_desc": null,
                                "exponent": 0,
                                "is_check": 0,
                                "is_hide": 0,
                                "asterisk": 0,
                                "created_at": "2018-05-04 10:11:59",
                                "updated_at": "2018-05-04 10:11:59",
                                "operate_name": {
                                    "name": "admin"
                                },
                                "second_ranking": [
                                    {
                                        "id": 2,
                                        "ranking_name": "猫粮品牌排行榜",
                                        "ranking_desc": "猫咪是人们最爱的宠物之一，为了伺候好猫主子，口粮的选择是很重要的。好的猫粮能让猫咪健康成长。",
                                        "exponent": 0,
                                        "is_check": 0,
                                        "is_hide": 1,
                                        "asterisk": 0,
                                        "created_at": "2018-05-04 10:11:59",
                                        "updated_at": "2018-05-04 10:11:59",
                                        "pivot": {
                                            "element_id": 12,
                                            "ranking_id": 2
                                        }
                                    }
                                ]
                            },
                            {
                                "id": 13,
                                "element_name": "比瑞吉猫粮",
                                "element_desc": null,
                                "exponent": 0,
                                "is_check": 0,
                                "is_hide": 0,
                                "asterisk": 0,
                                "created_at": "2018-05-04 10:11:59",
                                "updated_at": "2018-05-04 10:11:59",
                                "operate_name": {
                                    "name": "admin"
                                },
                                "second_ranking": [
                                    {
                                        "id": 2,
                                        "ranking_name": "猫粮品牌排行榜",
                                        "ranking_desc": "猫咪是人们最爱的宠物之一，为了伺候好猫主子，口粮的选择是很重要的。好的猫粮能让猫咪健康成长。",
                                        "exponent": 0,
                                        "is_check": 0,
                                        "is_hide": 1,
                                        "asterisk": 0,
                                        "created_at": "2018-05-04 10:11:59",
                                        "updated_at": "2018-05-04 10:11:59",
                                        "pivot": {
                                            "element_id": 13,
                                            "ranking_id": 2
                                        }
                                    }
                                ]
                            },
                            {
                                "id": 14,
                                "element_name": "美滋元 宠物猫粮",
                                "element_desc": null,
                                "exponent": 0,
                                "is_check": 0,
                                "is_hide": 0,
                                "asterisk": 0,
                                "created_at": "2018-05-04 10:11:59",
                                "updated_at": "2018-05-04 10:11:59",
                                "operate_name": {
                                    "name": "admin"
                                },
                                "second_ranking": [
                                    {
                                        "id": 2,
                                        "ranking_name": "猫粮品牌排行榜",
                                        "ranking_desc": "猫咪是人们最爱的宠物之一，为了伺候好猫主子，口粮的选择是很重要的。好的猫粮能让猫咪健康成长。",
                                        "exponent": 0,
                                        "is_check": 0,
                                        "is_hide": 1,
                                        "asterisk": 0,
                                        "created_at": "2018-05-04 10:11:59",
                                        "updated_at": "2018-05-04 10:11:59",
                                        "pivot": {
                                            "element_id": 14,
                                            "ranking_id": 2
                                        }
                                    }
                                ]
                            },
                            {
                                "id": 15,
                                "element_name": "妙多乐 宠物猫粮",
                                "element_desc": null,
                                "exponent": 0,
                                "is_check": 0,
                                "is_hide": 0,
                                "asterisk": 0,
                                "created_at": "2018-05-04 10:11:59",
                                "updated_at": "2018-05-04 10:11:59",
                                "operate_name": {
                                    "name": "admin"
                                },
                                "second_ranking": [
                                    {
                                        "id": 2,
                                        "ranking_name": "猫粮品牌排行榜",
                                        "ranking_desc": "猫咪是人们最爱的宠物之一，为了伺候好猫主子，口粮的选择是很重要的。好的猫粮能让猫咪健康成长。",
                                        "exponent": 0,
                                        "is_check": 0,
                                        "is_hide": 1,
                                        "asterisk": 0,
                                        "created_at": "2018-05-04 10:11:59",
                                        "updated_at": "2018-05-04 10:11:59",
                                        "pivot": {
                                            "element_id": 15,
                                            "ranking_id": 2
                                        }
                                    }
                                ]
                            }
                        ],
                        "first_page_url": "http://rcm.cc/api/Element/index?page=1",
                        "from": 1,
                        "last_page": 24,
                        "last_page_url": "http://rcm.cc/api/Element/index?page=24",
                        "next_page_url": "http://rcm.cc/api/Element/index?page=2",
                        "path": "http://rcm.cc/api/Element/index",
                        "per_page": 15,
                        "prev_page_url": null,
                        "to": 15,
                        "total": 357
                    }
                })
            })
            //获取元素详情
            app.get('/api/Element/details', (req, res) => {
                res.json({
                    "status_code": 1,
                    "message": "获取详情成功！",
                    "data": {
                        "id": 1,
                        "element_name": "菲洛嘉 柔滑亮泽焕颜面膜",
                        "element_desc": "大名鼎鼎的十全大补面膜",
                        "exponent": 0,
                        "is_check": 0,
                        "is_hide": 0,
                        "asterisk": 0,
                        "created_at": "2018-04-28 17:58:12",
                        "updated_at": "2018-05-10 17:10:16",
                        "operate_type": 1
                    }
                })
            })
            //编辑元素
            app.post('/api/Element/edit', (req, res) => {
                res.json({
                    "status_code": 1,
                    "message": "编辑成功"
                })
            })
            //编辑二级榜单
            app.post('/api/Ranking/SecondEdit', (req, res) => {
                res.json({
                    status_code: 1,
                    message: '修改成功'
                })
            })
            //元素
            app.post('/api/Element/hide/1', (req, res) => {
                res.json({
                    code: '001',
                    message: 'success'
                })
            })
            app.post('/api/Element/hide/0', (req, res) => {
                res.json({
                    code: '001',
                    message: 'success'
                })
            });
            app.post('/api/pushTask/list', (req, res) => {
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
                                "operate_type": 1,
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
            });
            app.post('/api/search/ranking', (req, res) => {
                res.json({
                    "status_code": 1,
                    "message": "获取成功！",
                    "data": [
                        {
                            "id": 1,
                            "ranking_name": "涂抹式面膜人气榜单",
                            "ranking_desc": "涂抹式面膜是日常护肤必不可少的一个环节～一起来看看大家最喜欢的是哪几种哪？",
                            "ranking_level": 2,
                            "exponent": 0,
                            "is_check": 0,
                            "is_hide": 1,
                            "asterisk": 0,
                            "created_at": "2018-05-04 18:25:45",
                            "updated_at": "2018-05-04 18:25:45",
                            "operate_type": 1,
                            "operate_name": {
                                "name": "admin"
                            }
                        }
                    ]
                })
            })
            //获取七牛token
            app.get('/api/Qiniu/getUploadToken', (res, req) => {
                const qiniu = require('qiniu');
                var ak = 'CCfyEudIXBbtgJVlJjLyKrxsiIT1a-X3gfQBeXKU';
                var sk = '9DJlV0wjgouH1NlZE8taDXKHn5DK24lGbFiXclt9';
                var mac = new qiniu.auth.digest.Mac(ak, sk);
                var options = {
                    scope: 'yyrcm',
                };
                var putPolicy = new qiniu.rs.PutPolicy(options);
                var uploadToken = putPolicy.uploadToken(mac);
                req.json({
                    "status_code": 1,
                    "message": 'success',
                    data: {
                        "qiniu_token": uploadToken,
                        "bucket": 'yyrcm'
                    }
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