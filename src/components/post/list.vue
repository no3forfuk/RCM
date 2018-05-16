<template>
    <div>
        <div class="page-header header-root">
            <h3 class="header-left" v-text="TEXT.listTitle"></h3>
            <div class="header-right">
                <div class="input-group search-box">
                    <input type="text" class="form-control" placeholder="请输入POST"
                           aria-describedby="basic-addon2">
                    <span class="input-group-addon" id="basic-addon2"><span
                            class="glyphicon glyphicon-search"></span></span>
                </div>
                <button type="button" class="btn btn-primary" v-text="TEXT.addPost" style="margin-left: 15px;"
                        @click="goAdd"></button>
            </div>
        </div>
        <div>
            <table class="table table-bordered table-striped table-hover">
                <thead>
                <th class="text-center" v-for="(item,index) in TEXT.table" :key="index">
                    <span v-text="item.name" v-if="!item.select"></span>
                    <el-select v-model="item.name" v-if="item.select" style="border: 0 none;width: 100px;" size="mini">
                        <el-option
                                v-for="(subItem,index) in item.item"
                                :key="index"
                                :label="subItem"
                                :value="subItem">
                        </el-option>
                    </el-select>
                </th>
                </thead>
                <tbody>
                <tr>
                    <td>star</td>
                    <td>
                        <router-link :to="{name:'postDetails',query:{id:'id'}}">name</router-link>
                    </td>
                    <td>father</td>
                    <td>hot</td>
                    <td>type</td>
                    <td>from</td>
                    <td>builder</td>
                    <td>lastEditTime</td>
                    <td>
                        <button type="button" class="btn btn-default">显示</button>
                        <button type="button" class="btn btn-default">删除</button>
                        <button type="button" class="btn btn-default">编辑</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
    import POSTLIST from './text'

    export default {
        data() {
            return {
                rankList: [],
            };
        },
        created() {
            //页面初始化
            this.init();
        },
        methods: {
            init() {
                this.TEXT = POSTLIST;
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
