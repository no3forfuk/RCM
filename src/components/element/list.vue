<template>
    <div>
        <div class="page-header header-root">
            <h3 class="header-left">元素管理</h3>
            <div class="header-right">
                <div class="input-group search-box">
                    <input type="text" class="form-control" placeholder="Search"
                           aria-describedby="basic-addon2" v-model="keyWords">
                    <span class="input-group-addon" id="basic-addon2" @click="searchElementByKeyWord(currentPage)"
                          style="cursor: pointer;"><span
                            class="glyphicon glyphicon-search"></span></span>
                </div>
                &nbsp;&nbsp;
                <router-link :to="{name:'addElement'}">
                    <button type="button" class="btn btn-default">添加元素</button>
                </router-link>
                &nbsp;&nbsp;
                <button type="button" class="btn btn-default" data-toggle="modal" data-target="#editExp">指数规则管理</button>
            </div>
        </div>
        <h4><b>元素列表</b>
        </h4>
        <div style="max-height: 600px;overflow: auto;">
            <table class="table table table-hover table-striped table-bordered">
                <thead>
                <th class="text-center">序号</th>
                <th class="text-center">元素名称</th>
                <th class="text-center">详情</th>
                <th class="text-center">指数</th>
                <th class="text-center">所属榜单</th>
                <th class="text-center">操作人</th>
                <th class="text-center">最后编辑时间</th>
                <th class="text-center">
                    操作
                </th>
                </thead>
                <tbody class="text-left">
                <tr v-for="(item,index) in elementList" :key="index">
                    <td>{{(index + 1) + (currentPage - 1) * per_page}}</td>
                    <td>
                        <router-link :to="{name:'elementDetails',query:{id:item.id}}">{{item.element_name}}
                        </router-link>
                    </td>
                    <td style="max-width:300px;"><p class="td-disc">{{item.element_desc}}</p></td>
                    <td>
                        <a href="#" data-toggle="modal" data-target="#eleExp">666</a>
                    </td>
                    <td>
                        <ul class="list-group">
                            <li class="list-group-item" v-for="(list,index) in item.second_ranking" :key="index">
                                <router-link :to="{name:'secondRankDetails',query:{id:list.id}}">{{list.ranking_name}}
                                </router-link>
                            </li>
                        </ul>
                    </td>
                    <td>{{item.operate_name.name}}</td>
                    <td>{{item.updated_at}}</td>
                    <td>
                        <router-link :to="{name:'elementDetails',query:{id:item.id}}">
                            <button type="button" class="btn btn-info">编辑</button>
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
                        <button type="button" class="btn btn-default" @click="openDeleteElementAlert(item.id,index)">
                            删除
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <hr>
        <button type="button" class="btn btn-default" @click="prePage($refs.pageInputSecond,'currentPage')">上一页
        </button>
        <input type="number" :max="totalPage" min="1" v-model="currentPage" ref="pageInputSecond" style="width: 60px;">
        <button type="button" class="btn btn-default" @click="nextPage($refs.pageInputSecond,'currentPage')">下一页
        </button>
        <span>共{{totalPage}}页</span>
        <element-exp></element-exp>
        <edit-exp></edit-exp>
    </div>
</template>
<script>
    import {getElementList, hideElement, deleteElementById} from '../../api/api'

    export default {
        data() {
            return {
                elementList: [],
                currentPage: 1,
                totalPage: 0,
                keyWords: '',
                per_page: ''
            }
        },
        created() {
            this.getElementListIndex(this.currentPage);
        },
        methods: {
            //获取元素列表
            getElementListIndex(page) {
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
                getElementList(params).then(res => {
                    if (res.status == 200 && res.data.status_code == 1) {
                        this.elementList = res.data.data.data;
                        this.totalPage = res.data.data.last_page;
                        this.per_page = res.data.data.per_page;
                    }
                })
            },
            //关键字查询
            searchElementByKeyWord(page) {
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
                getElementList(params).then(res => {
                    if (res.status == 200 && res.data.status_code == 1) {
                        this.elementList = res.data.data.data;
                        this.totalPage = res.data.data.last_page;
                    }
                }).catch(err => {
                    throw err;
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
            //显示隐藏
            toggleHide(item) {
                var params = {};
                params.id = item.id;
                if (item.is_hide == 0) {
                    params.is_hide = 0;
                    this.$set(item, 'is_hide', 1);
                } else {
                    params.is_hide = 1;
                    this.$set(item, 'is_hide', 0);
                }
                hideElement(params).then(res => {
                    if (res.status == 200 && res.data.status_code == 1) {
                        this.$alert('', '操作成功', {
                            confirmButtonText: '确定'
                        })
                    }
                }).catch(err => {
                    throw err;
                });
            },
            //删除元素
            openDeleteElementAlert(id, i) {
                this.$confirm('您确定要删除该元素吗?', '删除', {
                    type: 'warning',
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    var params = {};
                    params.id = id
                    deleteElementById(params).then(res => {
                        this.elementList.splice(i, 1);
                        this.$message('删除成功');
                        this.getElementListIndex(this.currentPage);
                    }).catch(err => {
                        throw err;
                    })
                }).catch(() => {
                    return;
                })
            }
        },
        watch: {
            currentPage: function (n, o) {
                if (n >= this.totalPage) {
                    n = this.totalPage;
                    this.currentPage = this.totalPage;
                    this.getElementListIndex(n)
                }
                if (n < 1) {
                    n = 1;
                    this.currentPage = 1;
                    this.getElementListIndex(n)
                }
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

    .td-disc {
        max-width: 600px;
        max-height: 50px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
</style>
