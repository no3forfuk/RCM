<template>
    <div>
        <div>
            <span><span>H5地址：</span><a href="" ref="h5Address" target="_blank">http://www.rcm.ink/Home/Index#/elementDetails/post?id={{postInfo.id}}</a></span>

        </div>
        <div class="item">
            <span><b>类型：</b></span>
            <el-input v-model="postInfo.type" style="width: 50%" :disabled="canEdit"></el-input>
        </div>
        <div class="item">
            <span><b>文本：</b></span>
            <el-input type="textarea" v-model="postInfo.post_content" style="width: 50%" :disabled="canEdit"></el-input>
        </div>
        <div class="item">
            <span><b>指数：</b></span>
            <span>{{postInfo.exponent}}</span>
            <!--<el-input v-model="postInfo.exponent" style="width: 50%" :disabled="canEdit"></el-input>-->
        </div>
        <div class="item">
            <span><b>创建时间：</b></span><span>{{postInfo.updated_at}}</span>
        </div>
        <div class="item">
            <span><b>最后编辑时间：</b></span><span>1</span>
        </div>
        <div class="item">
            <span><b>发布人：</b></span><span>1</span>
        </div>
        <div class="item">
            <span><b>所属元素：</b></span>
            <span>
                <router-link
                        :to="{name:'elementDetails',query:{id:fatherElement.id}}">
                    {{fatherElement.element_name}}
                </router-link>
            </span>
        </div>
        <button type="button" class="btn btn-default" @click="editPost">编辑</button>
        <button type="button" class="btn btn-default" v-if="!canEdit" @click="cancelEditPost">取消</button>
        <button type="button" class="btn btn-default" v-if="!canEdit" @click="submitEditPost">提交编辑</button>
        <el-tabs v-model="activeName">
            <el-tab-pane label="评论列表" name="first">
                <button type="button" class="btn btn-default" @click="addDiscuss">添加评论
                </button>
                <div v-if="discuss.postDiscuss">
                    <textarea class="form-control" rows="3" v-model="discuss.postDiscussContent"></textarea>
                    <button class="btn btn-default" @click="submitDiscuss">发布评论</button>
                    <button class="btn btn-default" @click="cancelAddDiscuss">取消</button>
                </div>
                <hr>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import {detailsText} from './text'
    import {getPostDetails, addComment, editPostById, getElementDetails} from '../../api/api'

    export default {
        data() {
            return {
                postInfo: {},
                activeName: 'first',
                fatherElement: {},
                canEdit: true,
                discuss: {
                    postDiscuss: false,
                    postDiscussContent: ''
                },


            }
        },
        created() {
            this.getPostDetailsById();
            getElementDetails(this.$route.query.ele_id).then(res => {
                if (res.status == 200 && res.data.status_code == 1) {
                    this.fatherElement = res.data.data;
                }
            }).catch(err => {
                throw err;
            })
        },
        mounted() {

        },
        updated() {

        },
        methods: {
            editPost() {
                this.canEdit = false;
            },
            cancelEditPost() {
                this.canEdit = true;
            },
            submitEditPost() {
                var get_params = {};
                get_params.id = this.$route.query.id;
                var post_params = {};
                post_params.element_id = this.fatherElement.id;
                post_params.post_content = this.postInfo.post_content;
                post_params.type = this.postInfo.type;
                editPostById(get_params, post_params).then(res => {
                    if (res.status == 200 && res.data.status_code == 1) {
                        this.$message({
                            message: '编辑成功',
                            type: 'success',
                            duration: 1500
                        })
                        this.canEdit = true;
                    } else {
                        return
                    }
                }).catch(err => {
                    throw err;
                })
            },
            submitDiscuss() {
                var params = {};
                params.comment_type = 3;
                params.content = this.discuss.postDiscussContent;
                params.post_id = this.$route.query.id;
                addComment(params).then(res => {
                    if (res.status == 200 && res.data.status_code == 1) {
                        this.$message({
                            message: '评论成功',
                            type: 'success',
                            duration: 1500
                        })
                        this.discuss.postDiscussContent = '';
                    } else {
                        return
                    }
                }).catch(err => {
                    throw err;
                })
            },
            addDiscuss() {
                this.discuss.postDiscuss = true;
            },
            cancelAddDiscuss() {
                this.discuss.postDiscuss = false;
            },
            getPostDetailsById() {
                var params = {};
                params.id = this.$route.query.id;
                getPostDetails(params).then(res => {
                    if (res.status == 200 && res.data.status_code == 1) {
                        this.postInfo = res.data.data;
                        this.$refs.h5Address.href = 'http://www.rcm.ink/Home/Index#/elementDetails/post?id=' + this.postInfo.id
                    }
                }).catch(err => {
                    throw err;
                })
            }
        }
    }

</script>

<style scoped>
    div.item {
        padding: 10px;
    }
</style>