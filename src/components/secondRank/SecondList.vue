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
                <router-link :to="{name:'addRank',query:{ranking_level:2}}">
                    <button class="btn btn-default add-ranklist">添加榜单
                    </button>
                </router-link>
                <button class="btn btn-default">
                    <router-link :to="{name:'upload'}">导入榜单</router-link>
                </button>
                <button class="btn btn-default" type="button" data-toggle="modal" data-target="#editRate">评级规则管理
                </button>
            </div>
        </div>
        <h4><b>榜单列表</b></h4>
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
                    指数
                </th>
                <th class="text-center">
                    操作
                </th>
                </thead>
                <tbody class="text-left">
                <tr v-for="(item,index) in rankList" :key="index">
                    <td>{{(index + 1) + (currentPage - 1) * per_page}}</td>

                    <td>
                        <router-link :to="{name:'secondRankDetails',query:{id:item.id}}">
                            {{item.ranking_name}}
                        </router-link>

                    </td>
                    <td style="max-width:300px;">
                        <p class="td-disc">{{item.ranking_desc}}</p>

                    </td>
                    <td>{{item.admin.name}}</td>
                    <td>{{item.updated_at}}</td>
                    <td></td>
                    <td>
                        <a href="#" data-toggle="modal" data-target="#secondRate" @click="showRate(item)">{{item.rating}}</a>
                    </td>
                    <td>{{item.exponent}}</td>
                    <td>

                        <router-link :to="{name:'secondRankDetails',query:{id:item.id}}">
                            <button type="button" class="btn btn-default">编辑</button>
                        </router-link>
                        <button type="button"
                                v-if="!item.is_hide"
                                @click="toggleHide(item)"
                                class="btn btn-success">显示
                        </button>
                        <button type="button"
                                v-if="!!item.is_hide"
                                @click="toggleHide(item)"
                                class="btn btn-danger">隐藏
                        </button>
                        <button type="button" class="btn btn-default" @click="openDeteleAlert(item.id,index)">删除
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <hr>
        <el-pagination
                background
                :page-size="per_page"
                layout="prev, pager, next"
                @current-change="getRankList"
                :total="total">
        </el-pagination>
        <second-rate v-bind:info="rateTarget"></second-rate>
        <editsecond-rate></editsecond-rate>

    </div>

</template>
<script>
    import {
        getSecondRank,
        addSecondRank,
        hideSecondRank,
        getElementList,
        editSecondRank,
        deleteSecondRank
    } from '../../api/api'

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
                keyWords: '',
                per_page: 0,
                total: 0
            }
        },
        updated() {

        },
        created() {
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
                this.currentPage = page;
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
                                this.per_page = res.data.data.per_page;
                                this.total = res.data.data.total;
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
            setRankLv(e) {
                this.rankLv = e.target.innerText;
            },
            //显示隐藏
            toggleHide(item) {
                this.$confirm('请确定此次操作', '提示', {
                    confirmButtonText: '确定',
                    type: 'warning',
                    cancelButtonText: '取消',
                }).then(() => {
                    var params = {};
                    params.id = item.id;
                    if (item.is_hide == 0) {
                        params.is_hide = 0;
                        this.$set(item, 'is_hide', 1);
                    } else {
                        params.is_hide = 1;
                        this.$set(item, 'is_hide', 0);
                    }
                    hideSecondRank(params).then(res => {
                        if (res.status == 200 && res.data.status_code == 1) {
                            this.$message({
                                type: 'success',
                                message: '操作成功',
                                duration: 1500
                            })
                            this.getRankList(this.currentPage);
                        }
                    }).catch(err => {
                        throw err;
                    });
                }).catch(() => {
                    return;
                })

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
            openDeteleAlert(id, i) {
                this.$confirm('您确定要删除这个榜单吗', '删除', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var params = {};
                    params.id = id
                    deleteSecondRank(params).then(res => {
                        if (res.status == 200 && res.data.status_code == 1) {
                            this.$message({
                                message: '删除成功',
                                type: 'success',
                                duration: 1500
                            });
                            this.rankList.splice(i, 1);
                            this.getRankList(this.currentPage);
                        }
                    }).catch(err => {
                        throw err;
                    })
                }).catch(() => {
                    return;
                })
            }
        },
        computed: {},
        watch: {
            currentPage: function (n, o) {
                if (n >= this.totalPage) {
                    n = this.totalPage;
                    this.currentPage = this.totalPage;
                    this.getRankList(n)
                }
                if (n < 1) {
                    n = 1;
                    this.currentPage = 1;
                    this.getRankList(n)
                }
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
