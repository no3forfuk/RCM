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
        new HtmlWebpackPlugin({ template: './index.html', filename: 'index.html' }),
    ],
    devServer: {
        contentBase: './views',
        before(app) {
            const bodyParser = require('body-parser');
            app.use(bodyParser.urlencoded({ extended: false }));
            app.use(bodyParser.json());
            //登陆

            app.post('/api/Login', function (req, res) {
                let token = parseInt(Math.random() * 9635423165465452).toString(16);
                let user = req.body;
                if (user.username == 'admin' && user.password == '123456') {
                    res.json({
                        code: '001',
                        msg: 'bingo',
                        token,
                        username: user.username
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
                    data: [{
                        ranking_name: 'aa',
                        ranking_desc: 'bb'
                    }]
                })
            });
            app.get('/query/r1', (req, res) => {
                res.json(mock)
            });
            app.get('/query/r1/belong', (req, res) => {
                res.json(mock)
            });
            app.get('/query/r1/ele', (req, res) => {
                res.json(mock)
            });
            app.post('/submit/add_rank', (req, res) => {
                res.json({
                    code: '001',
                    msg: 'success'
                })
            });
            app.post('/submit/edit_rank', (req, res) => {
                res.json({
                    code: '001',
                    msg: 'success'
                })
            });
            app.post("/api/Ranking/importRinking", (req, res) => {
                res.json({
                    code: '001',
                    msg: 'success'
                })
            });
        }
    }
})