<template>
    <div>
        <div class="page-header header-root">
            <h3 class="header-left">二级榜单管理</h3>
            <div class="header-right">
                <div class="input-group search-box">
                    <input type="text" class="form-control" placeholder="Search"
                           aria-describedby="basic-addon2" v-model="keyWords">
                    <span class="input-group-addon" id="basic-addon2" @click="searchInkeyWords(page)"
                          style="cursor: pointer;"><span
                            class="glyphicon glyphicon-search"></span></span>
                </div>
                <button class="btn btn-default add-ranklist" data-toggle="modal" data-target=".bs-modal-lg"
                        @click="operate($event)">添加榜单
                </button>
                <button class="btn btn-default">
                    <router-link :to="{name:'upload'}">导入榜单</router-link>
                </button>
                <button class="btn btn-default" type="button" data-toggle="modal" data-target="#editRate">评级规则管理
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
                    星标
                </th>
                <th class="text-center">
                    评级
                </th>
                <th class="text-center">
                    操作
                </th>
                </thead>
                <tbody class="text-left">
                <tr v-for="(item,index) in rankList" :key="index">
                    <td>{{index+1}}</td>
                    <td>
                        {{item.ranking_name}}
                    </td>
                    <td style="max-width:300px;">
                        <router-link :to="{name:'secondRankDetails',query:{id:item.id}}">
                            <p class="td-disc">{{item.ranking_desc}}</p>
                        </router-link>
                    </td>
                    <td>{{item.admin.name}}</td>
                    <td>{{item.updated_at}}</td>
                    <td></td>
                    <td>
                        <a href="#" data-toggle="modal" data-target="#secondRate" @click="showRate(item)">S+</a>
                    </td>
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
                            <button type="button" class="btn btn-warning"
                                    @click="addPushTask($event,item)">推送
                            </button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <button type="button" class="btn btn-default" @click="prePage($refs.pageInputSecond,'currentPage')">上一页
        </button>
        <input type="number" :max="totalPage" min="1" v-model="currentPage" ref="pageInputSecond" style="width: 60px;">
        <button type="button" class="btn btn-default" @click="nextPage($refs.pageInputSecond,'currentPage')">下一页
        </button>
        <span>共{{totalPage}}页</span>
        <second-rate v-bind:info="rateTarget"></second-rate>
        <editsecond-rate></editsecond-rate>
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
                                <label class="col-sm-2 control-label">添加元素</label>
                                <div class="col-sm-10" style="position: relative; height: 300px;">
                                    <div style="width: 40%;">
                                        <ul class="list-group" v-if="addElementList.length"
                                            style="height: 288px;overflow: auto">
                                            <li class="list-group-item" v-for="(item,index) in addElementList"
                                                :key="index">
                                            <span class="badge" style="backgroundColor: #C9302C;">
                                                <i class="glyphicon glyphicon-remove"
                                                   style="cursor: pointer;" @click="deleteElement(index)"></i>
                                            </span>
                                                {{item.element_name}}
                                            </li>
                                        </ul>
                                    </div>
                                    <div style="width: 40%; position: absolute;top: 0;right: 60px;">
                                        <div class="input-group">
                                            <input type="text" class="form-control" placeholder="Search for...">
                                            <span class="input-group-btn">
        <button class="btn btn-default" type="button" @click="getElementList(page)">Go!</button>
      </span>
                                        </div>
                                        <ul class="list-group" v-if="elementLsit.length"
                                            style="height: 288px;overflow: auto">
                                            <li class="list-group-item" v-for="(item,index) in elementLsit"
                                                :key="index">
                                            <span class="badge" style="backgroundColor: #5cb85c;cursor: pointer;"><i
                                                    class="glyphicon glyphicon-plus"
                                                    @click="addElement(index)"></i></span>
                                                {{item.element_name}}
                                            </li>
                                            <button type="button" class="btn btn-default"
                                                    @click="prePage($refs.elementList,'page')">上一页
                                            </button>
                                            <input type="text" v-model="page" ref="elementList" style="width: 35%;">
                                            <button type="button" class="btn btn-default"
                                                    @click="nextPage($refs.elementList,'page')">下一页
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
    import {getSecondRank, addSecondRank, hideSecondRank, getElementList, editSecondRank} from '../../api/api'

    export default {
        data() {
            return {
                rankList: [],
                isShow: '',
                elementLsit: [],
                page: 1,
                addElementList: [],
                addSecondParams: {
                    ranking_name: '',
                    ranking_level: 2,
                    ranking_desc: '',
                    id: '',
                    data: []
                },
                doOperate: '添加',
                currentPage: 1,
                totalPage: 0,
                rateTarget: {},
                keyWords: ''
            }
        },
        created() {

            const vm = this;
            //获取首页榜列表
            this.getRankList(this.currentPage);

        },
        methods: {
            //关键字查询
            searchInkeyWords(page) {
                var params;
                if (this.keyWords == '') {
                    params = {
                        page: page
                    }
                } else {
                    params = {
                        page: page,
                        like: this.keyWords
                    }
                }
                getSecondRank(params).then(res => {
                    if (res.status == 200 && res.data.status_code == 1) {
                        this.rankList = res.data.data.data;
                        this.totalPage = res.data.data.last_page;
                    }
                }).catch(err => {
                    throw err
                })
            },
            //展示评级
            showRate(item) {
                this.rateTarget = item;
            },
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
                        this.getRankList(this.currentPage);
                    }).catch(err => {
                    })
                }
            },
            //获取二级榜单数据
            getRankList(page) {
                var params;
                if (this.keyWords == '') {
                    params = {
                        page: page
                    }
                } else {
                    params = {
                        page: page,
                        like: this.keyWords
                    }
                }
                return new Promise((resolve, reject) => {
                    getSecondRank(params)
                        .then(res => {
                            if (res.status == 200 && res.data.status_code == 1) {
                                this.rankList = res.data.data.data;
                                this.totalPage = res.data.data.last_page;
                            }
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
            //获取元素列表
            getElementList(params) {
                return new Promise((resolve, reject) => {
                    getElementList(params).then(res => {
                            if (res.data.status_code == 1 && res.data.data.data.length > 0) {
                                this.elementLsit = res.data.data.data;
                            } else {
                                reject();
                            }
                        }
                    ).catch(err => {
                    })
                })
            },
            //上一页
            prePage(target, page) {
                if (target.value == 1) {
                    return;
                } else {
                    target.value--;
                    this[page] = target.value;
                }
            },
            //下一页
            nextPage(target, page) {
                if (target.value >= this.totalPage) {
                    return
                }
                target.value++;
                this[page] = target.value;
            },
            //添加元素
            addElement(index) {
                this.addElementList.push(this.elementLsit[index]);
                this.addElementList = [...new Set(this.addElementList)];
            },
            //删除元素
            deleteElement(index) {
                this.addElementList.splice(index, 1);
            },
            //添加推送
            addPushTask(e, target) {
                e.target.disabled = true;
                e.target.innerText = '已推送';
                const str = localStorage.getItem('pushTaskArr');
                const arr = JSON.parse(str);
                arr.push(target);
                JSON.stringify(arr);
                localStorage.setItem('pushTaskArr', JSON.stringify(arr));
            }

        },
        computed: {},
        watch: {
            currentPage: function (n, o) {
                this.getRankList(n)
            },
            page: function (n, o) {
                this.getElementList(n)
            }
        }
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
