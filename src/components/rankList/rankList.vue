<template>
    <div>
        <div class="page-header header-root">
            <h3 class="header-left">榜单管理</h3>
            <div class="header-right">
                <div class="input-group search-box">
                    <input type="text" class="form-control" placeholder="Recipient's username"
                           aria-describedby="basic-addon2">
                    <span class="input-group-addon" id="basic-addon2"><span
                            class="glyphicon glyphicon-search"></span></span>
                </div>
                <button class="btn btn-primary add-ranklist" data-toggle="modal" data-target=".bs-modal-lg"
                        @click="creatRankModal">添加榜单
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
                <th class="text-center">
                    <y-dropdown :dropdown="rankLv"></y-dropdown>
                </th>
                <th class="text-center">操作人</th>
                <th class="text-center">最后编辑时间</th>
                <th class="text-center">被推送次数</th>
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
                    <td>2</td>
                    <td></td>
                    <td>{{item.updated_at.date}}</td>
                    <td></td>
                    <td>{{item.star}}</td>
                    <td>
                        <div class="btn-group" role="group">
                            <button type="button" class="btn btn-success" @click="showOrHidden">{{isShow}}</button>
                            <button type="button" class="btn btn-danger" @click="deleteItem(item,index)">删除</button>
                            <button type="button" class="btn btn-info" data-toggle="modal" data-target=".bs-modal-lg"
                                    @click="editRankModal(item)">编辑
                            </button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <y-modal v-bind:modal="rankdata" v-bind:tabData="rankList"></y-modal>
    </div>

</template>
<script>
    import {getRankList} from '../../api/api'

    export default {
        data() {
            return {
                rankList: [],
                isShow: "",
                belongData: [],
                belongArr: [],
                eleData: [],
                eleArr: [],
                submitData: {
                    name: "",
                    who: "",
                    star: "",
                    time: "time",
                    level: "",
                    disc: ""
                },
                rankdata: {
                    name: "",
                    todo: "",
                    data: {}
                }
            };
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
            //获取首页榜单数据
            getRankList() {
                return new Promise((resolve, reject) => {
                    getRankList()
                        .then(res => {
                            let temp = res.data;
                            this.rankList = temp.data;
                        })
                        .catch(err => {
                        });
                });
            },
            //添加榜单
            creatRankModal() {
                this.rankdata.name = "添加榜单";
                this.rankdata.todo = "添加";
                this.rankdata.data = {};
            },
            //编辑榜单
            editRankModal(element) {
                this.rankdata.name = "编辑榜单";
                this.rankdata.todo = "修改";
                this.rankdata.data = element;
            },
            //删除当前单元行
            deleteItem(targrt, index) {
                this.rankList.splice(index, 1);
            },
            setRankLv(e) {
                this.rankLv = e.target.innerText;
            },
            //显示隐藏
            showOrHidden() {
                if (this.isShow == "隐藏") {
                    this.isShow = "显示";
                }
                if (this.isShow == "显示") {
                    this.isShow = "隐藏";
                }
            },

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

    .btn-size {
        width: 100%;
        height: 100%;
    }

    .left-size {
        width: 80%;
        float: left;
        font-size: 1.5rem;
    }

    .right-size {
        width: 20%;
        float: left;
    }

    .select-menu {
        position: absolute;
        right: 0;
    }

    .belong_rank {
        max-height: 200px;
        overflow-y: auto;
    }

    .buffer_rank {
        float: left;
        margin-right: 1rem;
    }

    .ele-btn {
        display: block;
        width: 70%;
    }

    .ele-buffer {
        max-height: 200px;
        overflow: auto;
    }

    .td-disc {
        max-width: 600px;
        max-height: 50px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
</style>
