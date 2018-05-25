<template>
    <div>
        <div class="page-header">
            <h3>{{info.ranking_name}}</h3>
        </div>
        <el-tabs v-model="activeName">
            <el-tab-pane label="基本信息" name="first">
                <el-form label-width="80px" ref="form">
                    <el-form-item label="榜单名称" style="width: 60%;">
                        <el-input v-model="info.ranking_name" :disabled="base.forbidEdit"></el-input>
                    </el-form-item>
                    <el-form-item label="榜单详情" style="width: 60%;">
                        <el-input type="textarea" v-model="info.ranking_desc" :disabled="base.forbidEdit"></el-input>
                    </el-form-item>
                    <el-form-item label="星标" style="width: 60%;">
                        <el-select v-model="base.init_star" :disabled="base.forbidEdit">
                            <el-option label="标记" value="1"></el-option>
                            <el-option label="未标记" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="隐藏/显示" style="width: 60%;">
                        <el-select v-model="base.init_hide" :disabled="base.forbidEdit">
                            <el-option label="显示" value="1"></el-option>
                            <el-option label="隐藏" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="推送次数" style="width: 60%;">
                        <span>2</span>
                    </el-form-item>
                    <el-form-item label="评级" style="width: 60%;">
                        <span>S+</span>
                    </el-form-item>
                </el-form>
                <hr>
                <button type="button" class="btn btn-default" @click="editDetails">编辑</button>
                <button type="button" class="btn btn-default" v-if="!base.forbidEdit" @click="cancelEditDetails">取消
                </button>
                <button type="button" class="btn btn-default" v-if="!base.forbidEdit" @click="submitEditDetails">完成
                </button>
            </el-tab-pane>
            <el-tab-pane label="子元素列表" name="second">
                <router-link :to="{name:'addElement',query:{id:$route.query.id}}">
                    <button class="btn btn-default" type="button">添加元素</button>
                </router-link>

                <hr>
                <table class="table table-hover table-bordered table-striped">
                    <thead>
                    <th>元素名称</th>
                    <th>元素详情</th>
                    <th>操作</th>
                    </thead>
                    <tbody>
                    <tr>
                        <td>name</td>
                        <td>desc</td>
                        <td>
                            <button class="btn btn-default">删除</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </el-tab-pane>
            <el-tab-pane label="指数管理" name="third">指数管理</el-tab-pane>
            <el-tab-pane label="评级管理" name="fourth">评级管理</el-tab-pane>
            <el-tab-pane label="评论管理" name="five">
                <button type="button" class="btn btn-default" @click="addDiscuss">添加评论
                </button>
                <div v-if="discuss.editDiscuss">
                    <textarea class="form-control" rows="3" v-model="rank2DiscussContent"></textarea>
                    <button class="btn btn-default" @click="submitDiscuss">发布评论</button>
                    <button class="btn btn-default" @click="cancelAddDiscuss">取消</button>
                </div>
                <hr>
                <table class="table table-striped table-bordered table-hover">
                    <thead>
                    <th class="text-center">内容</th>
                    <th class="text-center">发布人</th>
                    <th class="text-center">发布时间</th>
                    <th class="text-center">操作</th>
                    </thead>
                    <tbody>
                    <tr>
                        <td style="width: 40%;"></td>
                        <td></td>
                        <td></td>
                        <td class="text-center">
                            <button type="button" class="btn btn-default">删除</button>
                            <button type="button" class="btn btn-default">编辑</button>
                        </td>
                    </tr>
                    </tbody>

                </table>

            </el-tab-pane>
        </el-tabs>
        <add-discuss></add-discuss>
    </div>
</template>

<script>
    import {getSecondRankDetails, editSecondRank, addComment} from '../../api/api'

    export default {
        data() {
            return {
                info: {},
                activeName: 'first',
                user: {},
                base: {
                    init_star: '',
                    init_hide: '',
                    forbidEdit: true
                },
                discuss: {
                    editDiscuss: false
                },
                rank2DiscussContent: ''
            }
        },
        created() {
            this.getRankDetails();
        },
        methods: {
            submitDiscuss() {
                var params = {};
                params.comment_type = 2;
                params.content = this.rank2DiscussContent;
                params.ranking_id = this.$route.query.id;
                addComment(params).then(res => {
                    if (res.status == 200 && res.data.status_code == 1) {
                        this.$message({
                            message: '添加评论成功',
                            type: 'success',
                            duration: 1500
                        })
                        this.rank2DiscussContent = ''
                    }
                }).catch(err => {
                    throw err;
                })
            },
            addDiscuss() {
                this.discuss.editDiscuss = true;
            },
            cancelAddDiscuss() {
                this.discuss.editDiscuss = false;
            },
            cancelEditDetails() {
                this.base.forbidEdit = true;
            },
            editDetails() {
                this.base.forbidEdit = false;
            },
            submitEditDetails() {
                var params = {}
                params.ranking_name = this.info.ranking_name;
                params.ranking_desc = this.info.ranking_desc;
                params.ranking_level = this.info.ranking_level;
                params.id = this.info.id;
                if (this.base.init_hide == '1') {
                    params.is_hide = 1
                }
                if (this.base.init_hide == '0') {
                    params.is_hide = 0
                }
                if (this.base.init_star == '1') {
                    params.asterisk = 1
                }
                if (this.base.init_star == '0') {
                    params.asterisk = 0
                }
                editSecondRank(params).then(res => {
                    if (res.status == 200 && res.data.status_code == 1) {
                        alert('修改成功');
                        this.base.forbidEdit = true
                    }
                }).catch(err => {
                    throw err;
                })
            },
            getRankDetails() {
                var id = this.$route.query.id;
                getSecondRankDetails(id).then(res => {
                    if (res.status == 200 && res.data.status_code == 1) {
                        this.info = res.data.data;
                        this.base.init_star = this.info.asterisk == 0 ? '不标记' : '标记';
                        this.base.init_hide = this.info.is_hide == 0 ? '隐藏' : '显示';
                        if (res.data.data.operate_type == 1) {
                            this.user = res.data.data.admin;
                        }
                    }
                }).catch(err => {
                    throw err;
                })
            }
        }
    }

</script>

<style scoped>

</style>