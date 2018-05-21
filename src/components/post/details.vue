<template>
    <div>
        <div class="item">
            <span><b>类型：</b></span><span>1</span>
        </div>
        <div class="item">
            <span><b>指数：</b></span><span>1</span>
        </div>
        <div class="item">
            <span><b>创建时间：</b></span><span>1</span>
        </div>
        <div class="item">
            <span><b>最后编辑时间：</b></span><span>1</span>
        </div>
        <div class="item">
            <span><b>发布人：</b></span><span>1</span>
        </div>
        <div class="item">
            <span><b>所属元素：</b></span><span>1</span>
        </div>
        <el-tabs v-model="activeName">
            <el-tab-pane label="评论列表" name="first">
                <button type="button" class="btn btn-default" @click="addDiscuss">添加评论
                </button>
                <div v-if="discuss.postDiscuss">
                    <textarea class="form-control" rows="3"></textarea>
                    <button class="btn btn-default">发布评论</button>
                    <button class="btn btn-default" @click="cancelAddDiscuss">取消</button>
                </div>
                <hr>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import {detailsText} from './text'
    import {getPostDetails} from '../../api/api'

    export default {
        data() {
            return {
                postInfo: {},
                activeName: 'first',
                discuss: {
                    postDiscuss: false
                }

            }
        },
        created() {
            this.getPostDetailsById();
        },
        mounted() {

        },
        updated() {

        },
        methods: {
            addDiscuss() {
                this.discuss.postDiscuss = true;
            },
            cancelAddDiscuss() {
                this.discuss.postDiscuss = false;
            },
            getPostDetailsById() {
                var id = this.$route.query.id;
                getPostDetails(id).then(res => {
                    if (res.status == 200 && res.data.status_code == 1) {
                        this.postInfo = res.data.data;
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