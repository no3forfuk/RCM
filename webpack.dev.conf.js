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
                                "ranking_name": "今日热点",
                                "ranking_desc": "今日热点事件排行榜",
                                "exponent": 0,
                                "is_hide": 1,
                                "asterisk": 0,
                                "created_at": "2018-05-03 10:21:41",
                                "updated_at": "2018-05-03 10:21:41",
                                "operate_name": {
                                    "name": "admin"
                                }
                            }
                        ],
                        "first_page_url": "http://rcm.bantangtv.com/api/Ranking/SecondIndex?page=1",
                        "from": 1,
                        "last_page": 1,
                        "last_page_url": "http://rcm.bantangtv.com/api/Ranking/SecondIndex?page=1",
                        "next_page_url": null,
                        "path": "http://rcm.bantangtv.com/api/Ranking/SecondIndex",
                        "per_page": 15,
                        "prev_page_url": null,
                        "to": 1,
                        "total": 1
                    }
                })
            })
            //添加二级榜单
            app.post('/api/Ranking/SecondAdd', (req, res) => {
                res.json({
                    code: '001',
                    message:'添加成功'
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
                    data:[]
                })
            });
            app.post("/api/Ranking/importRanking", (req, res) => {
                res.json({
                    code: '001',
                    msg: 'success',
                    data: req.body
                })
            });

        }
    }
})