<template>
    <div>
        <div class="page-header header-root">
            <h3 class="header-left">元素管理</h3>
            <div class="header-right">
                <div class="input-group search-box">
                    <input type="text" class="form-control" placeholder="Search"
                           aria-describedby="basic-addon2" v-model="keyWords">
                    <span class="input-group-addon" id="basic-addon2" @click="searchElementByKeyWord(currentPage)"><span
                            class="glyphicon glyphicon-search"></span></span>
                </div>
                &nbsp;&nbsp;
                <button type="button" class="btn btn-default" data-toggle="modal" data-target="#editExp">指数规则管理</button>
            </div>
        </div>
        <div style="maxHeight:500px;overflow:auto;">
            <h4>元素列表
                <router-link :to="{name:'editElement',params:{content:{}}}">
                    <button type="button" class="btn btn-default">添加元素</button>
                </router-link>
            </h4>
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
                    <td>{{index+1}}</td>
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
                                {{list.ranking_name}}
                            </li>
                        </ul>
                    </td>
                    <td>{{item.operate_name.name}}</td>
                    <td>{{item.updated_at}}</td>
                    <td>
                        <router-link :to="{name:'editElement',params:{content:item}}">
                            <button type="button" class="btn btn-info">编辑</button>
                        </router-link>
                        <div class="btn-group" role="group">
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
    import {getElementList, hideElement} from '../../api/api'

    export default {
        data() {
            return {
                elementList: [],
                currentPage: 1,
                totalPage: 0,
                keyWords: ''
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
            showOrHidden(e, item) {
                var params = 0;
                if (e.target.innerText == '隐藏') {
                    params = 1;
                    return new Promise((resolve, reject) => {
                        hideElement(params).then(res => {
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
                        hideElement(params).then(res => {
                            alert('显示成功')
                            e.target.innerText = '隐藏';
                            item.is_hide = true;
                        }).catch(err => {
                        })
                    })
                }
            },
        },
        watch: {
            currentPage: function (n, o) {
                this.getElementListIndex(n)
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
