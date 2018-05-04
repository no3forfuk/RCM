<template>
    <div>
        <div class="page-header header-root">
            <h3 class="header-left">一级榜单管理</h3>
            <div class="header-right">
                <div class="input-group search-box">
                    <input type="text" class="form-control" placeholder="Recipient's username"
                           aria-describedby="basic-addon2">
                    <span class="input-group-addon" id="basic-addon2"><span
                            class="glyphicon glyphicon-search"></span></span>
                </div>
                <button class="btn btn-primary add-ranklist" data-toggle="modal" data-target=".bs-modal-lg"
                        @click="operate($event)">添加榜单
                </button>
                <button class="btn btn-default">
                    <router-link :to="{name:'upload'}">导入榜单</router-link>
                </button>
            </div>
        </div>
        <div style="maxHeight:500px;overflow:auto;">
            <table class="table table table-hover table-striped table-bordered">
                <thead>
                <th class="text-center">序号</th>
                <th class="text-center">榜单名称</th>
                <th class="text-center">详情</th>
                <th class="text-center">操作人</th>
                <th class="text-center">最后编辑时间</th>
                <th class="text-center">
                    <y-dropdown :dropdown="starmark"></y-dropdown>
                </th>
                <th class="text-center">
                    操作
                </th>
                </thead>
                <tbody class="text-left">
                <tr v-for="(item,index) in rankList" :key="index">
                    <td>{{index+1}}</td>
                    <td>{{item.ranking_name}}</td>
                    <td style="max-width:300px;"><p class="td-disc">{{item.ranking_desc}}</p></td>
                    <td>{{item.operate_name.name}}</td>
                    <td>{{item.updated_at}}</td>
                    <td>{{item.star}}</td>
                    <td>
                        <div class="btn-group" role="group">
                            <button type="button" class="btn btn-info" data-toggle="modal" data-target=".bs-modal-lg"
                                    @click="editRank($event,item)">编辑
                            </button>
                            <button type="button" class="btn"
                                    :class="{'btn-success':!item.is_hide,'btn-danger':item.is_hide}"
                                    @click="showOrHidden($event,item)">
                                {{item.is_hide ==
                                1?'隐藏':'显示'}}
                            </button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <div class="modal fade bs-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="gridSystemModalLabel">{{doOperate}}</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal">
                            <div class="form-group">
                                <label for="rankName" class="col-sm-2 control-label">榜单名称</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="rankName" placeholder="榜单名称"
                                           v-model="addSecondParams.ranking_name">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="rankDesc" class="col-sm-2 control-label">榜单详情</label>
                                <div class="col-sm-10">
                                    <textarea name="" id="rankDesc" cols="30" rows="3"
                                              v-model="addSecondParams.ranking_desc"></textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">添加二级榜单</label>
                                <div class="col-sm-10" style="position: relative; height: 300px;">
                                    <div style="width: 40%;">
                                        <ul class="list-group" v-if="addSubList.length"
                                            style="height: 288px;overflow: auto">
                                            <li class="list-group-item" v-for="(item,index) in addSubList">
                                            <span class="badge" style="backgroundColor: #C9302C;">
                                                <i class="glyphicon glyphicon-remove"
                                                   style="cursor: pointer;" @click="deleteSubList(index)"></i>
                                            </span>
                                                {{item.ranking_name}}
                                            </li>
                                        </ul>
                                    </div>
                                    <div style="width: 40%; position: absolute;top: 0;right: 60px;">
                                        <div class="input-group">
                                            <input type="text" class="form-control" placeholder="Search for...">
                                            <span class="input-group-btn">
        <button class="btn btn-default" type="button" @click="getSecondRankList(page)">Go!</button>
      </span>
                                        </div>
                                        <ul class="list-group" v-if="secondRankLsit.length"
                                            style="height: 288px;overflow: auto">
                                            <li class="list-group-item" v-for="(item,index) in secondRankLsit"
                                                :key="index">
                                            <span class="badge" style="backgroundColor: #5cb85c;cursor: pointer;"><i
                                                    class="glyphicon glyphicon-plus"
                                                    @click="add_subRank(index)"></i></span>
                                                {{item.ranking_name}}
                                            </li>
                                            <button type="button" class="btn btn-default" @click="prePage(page)">上一页
                                            </button>
                                            <button type="button" class="btn btn-default" @click="nextPage(page)">下一页
                                            </button>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <div class="col-sm-10 text-right">
                            <button type="button" class="btn btn-danger" @click="confirm">确 定
                            </button>
                            <button type="button" class="btn btn-success" data-dismiss="modal">取 消</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>

</template>
<script>
    import {getSecondRank, getFirstRankList} from '../../api/api'

    export default {
        data() {
            return {
                rankList: [],
                isShow: '',
                secondRankLsit: [],
                page: 1,
                addSubList: [],
                addSecondParams: {
                    ranking_name: '',
                    ranking_level: 2,
                    ranking_desc: '',
                    id: '',
                    data: []
                },
                doOperate: '添加'

            }
        },
        created() {

            const vm = this;
            //获取首页榜列表
            this.getRankList();
            this.isShow = "隐藏";

            //下拉框构造函数
            class Dropdown {
                constructor(title, lists, position) {
                    this.title = title;
                    this.menu = lists;
                    this.position = position;
                }
            }

            //构建星标数据
            this.starmark = new Dropdown("星标", ["最热", "最新"], "20px");
            //构建级别数据
            this.rankLv = new Dropdown("一级榜单", ["一级榜单", "二级榜单"], "20px");


        },
        methods: {
            //add or edit
            operate(e) {
                this.doOperate = '添加'
            },
            //确认
            confirm() {
                if (this.doOperate == '添加') {
                    this.addSecondParams.data = this.addElementList;
                    this.addSecondRank(this.addSecondParams);
                }
                if (this.doOperate == '编辑') {
                    this.addSecondParams.data = this.addElementList;
                    editSecondRank(this.addSecondParams).then(res => {
                        alert('修改成功');
                        $('.bs-modal-lg').modal('hide');
                        this.addSecondParams.ranking_name = '';
                        this.addSecondParams.ranking_desc = '';
                        this.addElementList = []
                        this.getRankList();
                    }).catch(err => {
                    })
                }
            },
            //获取一级榜单数据
            getRankList() {
                return new Promise((resolve, reject) => {
                    getFirstRankList()
                        .then(res => {
                            this.rankList = res.data.data.data;
                            console.log(this.rankList);
                        })
                        .catch(err => {
                        });
                });
            },
            //添加二级榜单
            addSecondRank(params) {
                if (params.ranking_name == '') {
                    alert('请填写榜单名称')
                    return
                }
                if (params.ranking_desc == '') {
                    alert('请填写榜单详情')
                    return
                }
                return new Promise((resolve, reject) => {
                    addSecondRank(params)
                        .then(res => {
                            console.log(res.data);
                            if (res.data.code == '001') {
                                alert('添加成功')
                                $('.bs-modal-lg').modal('hide');
                                this.addSecondParams.ranking_name = '';
                                this.addSecondParams.ranking_desc = '';
                                this.addElementList = [];
                                this.getRankList();
                            }
                        })
                        .catch(err => {
                        });
                });
            },
            //编辑榜单
            editRank(e, element) {
                this.doOperate = '编辑';
                this.addSecondParams.ranking_name = element.ranking_name;
                this.addSecondParams.ranking_level = element.ranking_level;
                this.addSecondParams.ranking_desc = element.ranking_desc;
                this.addSecondParams.id = element.id;
            },
            setRankLv(e) {
                this.rankLv = e.target.innerText;
            },
            //显示隐藏
            showOrHidden(e, item) {
                var params = 0;
                if (e.target.innerText == '隐藏') {
                    params = 1;
                    return new Promise((resolve, reject) => {
                        hideSecondRank(params).then(res => {
                            alert('隐藏成功')
                            e.target.innerText = '显示';
                            item.is_hide = false;
                        }).catch(err => {
                        })
                    })
                }
                if (e.target.innerText == '显示') {
                    params = 0;
                    return new Promise((resolve, reject) => {
                        hideSecondRank(params).then(res => {
                            alert('显示成功')
                            e.target.innerText = '隐藏';
                            item.is_hide = true;
                        }).catch(err => {
                        })
                    })
                }
            },
            //获取二级榜单列表
            getSecondRankList(params) {
                return new Promise((resolve, reject) => {
                    getSecondRank(params).then(res => {
                            if (res.data.status_code == 1 && res.data.data.data.length > 0) {
                                this.secondRankLsit = res.data.data.data;
                            } else {
                                reject();
                            }
                        }
                    ).catch(err => {
                    })
                })
            },
            //上一页
            prePage(page) {
                if (page == 1) {
                    return;
                } else {
                    page--;
                    this.page = page;
                    this.getSecondRankList(this.page);
                }
            },
            //下一页
            nextPage(page) {
                page++;
                this.page = page;
                this.getSecondRankList(this.page);
            },
            //添加元素
            add_subRank(index) {

                this.addSubList.push(this.secondRankLsit[index]);
                this.addSubList = [...new Set(this.addSubList)];
            },
            //删除元素
            deleteSubList(index) {
                this.addSubList.splice(index, 1);
            }

        },
        computed: {}
    };
</script>
<style scoped>
    .header-root {
        position: relative;
    }

    .header-right {
        position: absolute;
        top: 0px;
        left: 180px;
    }

    .search-box {
        width: 60%;
        float: left;
    }

    .add-ranklist {
        margin: 0 1rem;
    }

    .td-disc {
        max-width: 600px;
        max-height: 50px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
</style>
