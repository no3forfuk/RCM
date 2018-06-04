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
            const rp = require('request-promise');
            var baseUrl = 'http://test.bantangtv.com';
            const go = function (requset, response) {
                var method = requset.method;
                var options;
                if (method == 'GET') {
                    options = {
                        "method": method,
                        "qs": requset.query,
                        "json": true,
                        "uri": baseUrl + requset.url,
                        "headers": {
                            "authorization": requset.headers.authorization
                        }
                    }
                }
                if (method == 'POST') {
                    options = {
                        "method": method,
                        "body": requset.body,
                        "json": true,
                        "uri": baseUrl + requset.url,
                        "headers": requset.headers,
                        "headers": {
                            "authorization": requset.headers.authorization
                        }
                    }
                }
                rp(options).then(data => {
                    response.json(data)
                }).catch(err => {
                    throw err;
                })
            }
            //登陆
            app.post('/api/Login', function (req, res) {
                go(req, res)
            });
            //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>一级榜单API
            //获取一级榜单
            app.get('/api/Ranking/FirstIndex', (req, res) => {
                go(req, res)
            })
            //隐藏一级榜单
            app.post('/api/Ranking/FirstHide/1', (req, res) => {
                go(req, res)
            })
            app.post('/api/Ranking/FirstHide/0', (req, res) => {
                go(req, res)
            });
            //添加一级榜单
            app.post('/api/Ranking/FirstAdd', (req, res) => {
                go(req, res)
            })
            //编辑一级榜单
            app.post('/api/Ranking/FirstEdit/2', (req, res) => {
                go(req, res)
            })
            //获取侧边栏
            app.get('/api/index/getMenu', (req, res) => {
                go(req, res)
            });

            //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>二级榜单API
            //导入榜单
            app.post("/api/Ranking/importRanking", (req, res) => {
                go(req, res)
            });
            //获取二级榜单
            app.get('/api/Ranking/SecondIndex', (req, res) => {
                go(req, res)
            });
            //获取二级榜单详情
            app.get('/api/Ranking/SecondDetails/', (req, res) => {
                go(req, res)
            })
            //添加二级榜单
            app.post('/api/Ranking/SecondAdd', (req, res) => {
                go(req, res)
            })
            //显示隐藏二级榜单
            app.post('/api/Ranking/SecondHide', (req, res) => {
                go(req, res)
            })
            //删除二级榜单
            app.post('/api/Ranking/SecondDel', (req, res) => {
                go(req, res)
            })
            //获取元素列表
            app.get('/api/Element/index', (req, res) => {
                go(req, res)
            })
            //获取元素详情
            app.get('/api/Element/details', (req, res) => {
                go(req, res)
            })
            //编辑元素
            app.post('/api/Element/edit', (req, res) => {
                go(req, res)
            })
            app.post('/api/Element/del', (req, res) => {
                go(req, res)
            })
            //添加元素
            app.post('/api/Element/add', (req, res) => {
                go(req, res)
            })
            //编辑二级榜单
            app.post('/api/Ranking/SecondEdit', (req, res) => {
                go(req, res)
            })
            //元素
            app.post('/api/Element/hide/1', (req, res) => {
                go(req, res)
            })
            //元素显示隐藏
            app.post('/api/Element/hide', (req, res) => {
                go(req, res)
            });
            //获取推送列表
            app.post('/api/Push/index', (req, res) => {
                go(req, res)
            });
            app.post('/api/Push/add', (req, res) => {
                go(req, res)
            })
            app.post('/api/Push/edit', (req, res) => {
                go(req, res)
            })
            app.post('/api/search/ranking', (req, res) => {
                go(req, res)
            })
            //获取POST列表
            app.get('/api/Post/index', (req, res) => {
                go(req, res)
            })
            //获取POST详情
            app.get('/api/Post/details', (req, res) => {
                go(req, res)
            })
            //编辑post
            app.post('/api/Post/edit', (req, res) => {
                go(req, res)
            })
            //隐藏POST
            app.post('/api/Post/hide', (req, res) => {
                go(req, res)
            })
            //添加POST
            app.post('/api/Post/add', (req, res) => {
                go(req, res)
            })
            //添加评论
            app.post('/api/Comment/adminAdd', (req, res) => {
                go(req, res)
            })
            app.post('/api/Qiniu/getUploadToken', (res, req) => {
                const qiniu = require('qiniu');
                var ak = 'CCfyEudIXBbtgJVlJjLyKrxsiIT1a-X3gfQBeXKU';
                var sk = '9DJlV0wjgouH1NlZE8taDXKHn5DK24lGbFiXclt9';
                var mac = new qiniu.auth.digest.Mac(ak, sk);
                var options = {
                    scope: 'yyrcm',
                };
                var putPolicy = new qiniu.rs.PutPolicy(options);
                var uploadToken = putPolicy.uploadToken(mac);
                go(req, res)
            })

            /////////////////////////////////////
            app.post('/submit/add_rank', (req, res) => {
                go(req, res)
            });
            app.post('/submit/edit_rank', (req, res) => {
                go(req, res)
            });


        }
    }
})