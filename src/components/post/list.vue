<template>
    <div>
        <div class="page-header header-root">
            <h3 class="header-left" v-text="TEXT.listTitle"></h3>
            <div class="header-right">
                <div class="input-group search-box">
                    <input type="text" class="form-control" placeholder="请输入POST"
                           aria-describedby="basic-addon2" v-model="keyWords">
                    <span class="input-group-addon" id="basic-addon2" style="cursor: pointer;"
                          @click="getPostListByPage(currentPage)">
                        <span class="glyphicon glyphicon-search"></span>
                    </span>
                </div>
                <button type="button" class="btn btn-primary" v-text="TEXT.addPost" style="margin-left: 15px;"
                        @click="goAdd"></button>
            </div>
        </div>
        <h4><b>POST列表</b></h4>
        <div style="max-height: 500px;overflow: auto;">
            <table class="table table-bordered table-striped table-hover">
                <thead>
                <th class="text-center" v-for="(item,index) in TEXT.table" :key="index">
                    <span v-text="item.name" v-if="!item.select"></span>
                    <el-select v-model="item.name" v-if="item.select" style="border: 0 none;width: 100px;" size="mini">
                        <el-option
                                v-for="(subItem,index) in item.item"
                                :key="subItem"
                                :label="subItem"
                                :value="subItem">
                        </el-option>
                    </el-select>
                </th>
                </thead>
                <tbody>
                <tr v-for="(item,index) in postList" :key="index">
                    <td>{{index+1}}</td>
                    <td>star</td>
                    <td style="max-width: 150px; white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                        <router-link :to="{name:'postDetails',query:{id:item.id}}">{{item.post_content}}</router-link>
                    </td>
                    <!--<td style="max-width: 150px; white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">-->
                    <!--{{item.post_content}}-->
                    <!--</td>-->
                    <td>
                        <router-link :to="{name:'elementDetails',query:{id:item.element.id}}">
                            {{item.element.element_name}}
                        </router-link>
                    </td>
                    <td>hot</td>
                    <td>
                        {{item.type}}
                    </td>
                    <td>from</td>
                    <td>builder</td>
                    <td style="width: 100px;">{{item.updated_at}}</td>
                    <td>
                        <button type="button" class="btn btn-default">显示</button>
                        <button type="button" class="btn btn-default">删除</button>
                        <button type="button" class="btn btn-default">编辑</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <hr>
        <el-pagination
                background
                @current-change="getPostListByPage"
                :page-size="15"
                :total="total"
                layout="prev, pager, next">
        </el-pagination>
    </div>
</template>
<script>
    import POSTLIST from './text'
    import {getPostList} from '../../api/api'

    export default {
        data() {
            return {
                postList: [],
                currentPage: 1,
                totalPage: 0,
                total: 0,
                keyWords: '',
                value: ''
            };
        },
        created() {
            //页面初始化
            this.init();
        },
        methods: {
            init() {
                this.TEXT = POSTLIST;
                var params = {};
                params.page = 1;
                getPostList(params).then(res => {
                    if (res.status == 200 && res.data.status_code == 1) {
                        this.postList = res.data.data.data;
                        this.totalPage = parseInt(res.data.data.last_page);
                        this.total = res.data.data.total;
                    }
                }).catch(err => {
                    throw err;
                })
            },
            getPostListByPage(val) {
                this.currentPage = val;
                var params = {};
                params.page = val;
                if (this.keyWords != '') {
                    params.like = this.keyWords;
                }
                getPostList(params).then(res => {
                    if (res.status == 200 && res.data.status_code == 1) {
                        this.postList = res.data.data.data;
                        this.totalPage = parseInt(res.data.data.last_page);
                        this.total = res.data.data.total;
                    }
                }).catch(err => {
                    throw err;
                })
            },
            goAdd() {
                this.$router.replace('/home/addPost')
            },
            goDetails() {
                this.$router.replace('/home/postDetails')
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
</style>
