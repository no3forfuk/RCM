/*Created By Jsir on 2018/5/15*/
'use strict'
const postText = {};
postText.listTitle = 'POST列表';
postText.addPost = '添加POST'
postText.table = [
    {
        name: '星标'
    },
    {
        name: '名称'
    },
    {
        name: '隶属元素'
    },
    {
        name: '热度',
        select: true,
        item: ['点赞', '转发', '浏览', '评论']
    },
    {
        name: '种类',
        select: true,
        item: ['图文', '帖子', '音频']
    },
    {
        name: '来源',
        select: true,
        item: ['编辑发布', '外站', '爬取']
    },
    {
        name: '创建者'
    },
    {
        name: '最后编辑时间'
    },
    {
        name: '操作'
    }
];
postText.detailsText = {
    type: [{
        value: '类型1',
        label: '图文'
    }, {
        value: '类型2',
        label: '视频'
    }, {
        value: '类型3',
        label: '纯文字'
    }],
    selectValue: ''
}
module.exports = postText;