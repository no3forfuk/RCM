const express = require('express');

const app = express();

const expressArtTemplate = require('express-art-template');
const router = express.Router();

const apiRouter = express.Router();

app.engine('html', expressArtTemplate);


app.set('view options', {
    debug: process.env.NODE_ENV !== 'production',
    extname: '.html',
});
app.set('view engine', 'html');
router.get('/', (req, res, next) => {
    res.render('index');
})

app.use(router);
app.use('/api', apiRouter);

app.use('/views', express.static('./views'));

app.use('/static', express.static('./static'));
const bodyParser = require('body-parser');
router.post('/api/Admin/Login',function(req,res){
    res.json({
        code:'001',
        msg: 'bingo'
    })
})


app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.listen(80, () => {
    console.log('服务器已启动')
})