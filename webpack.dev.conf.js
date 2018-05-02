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
        contentBase: './views',
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
                            "id": 7,
                            "name": "榜单管理",
                            "route_name": "ranking",
                            "menu": [
                                {
                                    "id": 8,
                                    "name": "榜单列表"
                                }
                            ]
                        },
                        {
                            "id": 7,
                            "name": "推送列表",
                            "route_name": "push",
                            "menu": [
                                {
                                    "id": 8,
                                    "name": "推送列表"
                                }
                            ]
                        }
                    ]
                })
            });
            /////////////////////////////////////
            app.post('/submit/add_rank', (req, res) => {
                res.json(mock.sidebar)
            });
            app.post('/submit/edit_rank', (req, res) => {
                res.json({
                    code: '001',
                    msg: 'success'
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