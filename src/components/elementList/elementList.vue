<template>
    <div>
        <div class="page-header header-root">
            <h3 class="header-left">元素管理</h3>
            <div class="header-right">
                <div class="input-group search-box">
                    <input type="text" class="form-control" placeholder="Recipient's username"
                           aria-describedby="basic-addon2">
                    <span class="input-group-addon" id="basic-addon2"><span
                            class="glyphicon glyphicon-search"></span></span>
                </div>
            </div>
        </div>
        <div style="maxHeight:500px;overflow:auto;">
            <h4>元素列表  <router-link :to="{name:'editElement',params:{content:{}}}"><button type="button" class="btn btn-default">添加元素</button></router-link></h4>
            <table class="table table table-hover table-striped table-bordered">
                <thead>
                <th class="text-center">序号</th>
                <th class="text-center">元素名称</th>
                <th class="text-center">详情</th>
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
                    <td>{{item.element_name}}</td>
                    <td style="max-width:300px;"><p class="td-disc">{{item.element_desc}}</p></td>
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
            <button type="button" class="btn btn-default" @click="prePage($refs.pageInputSecond,'currentPage')">上一页
            </button>
            <input type="text" v-model="currentPage" ref="pageInputSecond" style="width: 60px;">
            <button type="button" class="btn btn-default" @click="nextPage($refs.pageInputSecond,'currentPage')">下一页
            </button>
        </div>

    </div>
</template>
<script>
    import {getElementList, hideElement} from '../../api/api'

    export default {
        data() {
            return {
                elementList: [],
                currentPage: 1,

            };
        },
        created() {
            getElementList(this.currentPage).then(res => {
                this.elementList = res.data.data.data
            })
        },
        methods: {
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
                getElementList(n)
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
