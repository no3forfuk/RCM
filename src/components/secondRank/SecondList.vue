<template>
    <div>
        <div class="page-header header-root">
            <h3 class="header-left">二级榜单管理</h3>
            <div class="header-right">
                <div class="input-group search-box">
                    <input type="text" class="form-control" placeholder="Recipient's username"
                           aria-describedby="basic-addon2">
                    <span class="input-group-addon" id="basic-addon2"><span
                            class="glyphicon glyphicon-search"></span></span>
                </div>
                <button class="btn btn-primary add-ranklist" data-toggle="modal" data-target=".bs-modal-lg">添加榜单
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

        <div class="modal fade bs-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="gridSystemModalLabel">添加</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal">
                            <div class="form-group">
                                <label for="rankName" class="col-sm-2 control-label">榜单名称</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="rankName" placeholder="榜单名称">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputPassword3" class="col-sm-2 control-label">Password</label>
                                <div class="col-sm-10">
                                    <input type="password" class="form-control" id="inputPassword3"
                                           placeholder="Password">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="rankDesc" class="col-sm-2 control-label">榜单详情</label>
                                <div class="col-sm-10">
                                    <textarea name="" id="rankDesc" cols="30" rows="3"></textarea>
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="col-sm-10 text-right">
                                    <button type="button" class="btn btn-danger" @click="creatRankModal()">确 定</button>
                                    <button type="button" class="btn btn-success" data-dismiss="modal">取 消</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>


    </div>

</template>
<script>
    import {getSecondRank, addSecondRank} from '../../api/api'

    export default {
        data() {
            return {
                rankList: [],
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
            //获取二级榜单数据
            getRankList() {
                return new Promise((resolve, reject) => {
                    getSecondRank()
                        .then(res => {

                            this.rankList = res.data.data.data;
                        })
                        .catch(err => {
                        });
                });
            },
            //添加榜单
            creatRankModal() {
                return new Promise((resolve, reject) => {
                    addSecondRank()
                        .then(res => {
                           if(res.data.code == '001'){
                               alert('添加成功')
                               $('.bs-modal-lg').modal('hide')
                           }
                        })
                        .catch(err => {
                        });
                });
            },
            //编辑榜单
            editRankModal(element) {
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

    .td-disc {
        max-width: 600px;
        max-height: 50px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
</style>
