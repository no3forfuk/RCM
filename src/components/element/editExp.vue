<template>
    <div>
        <div class="modal fade" id="editExp" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">指数规则管理</h4>
                    </div>
                    <div class="modal-body">
                        录入时间：<span></span><br>
                        点赞：<span></span><br>
                        评论：<span></span><br>
                        转发：<span></span><br>
                        拔草：<span></span><br>
                        浏览：<span></span><br>
                        回复评论：<span></span><br>
                        帖子数：<span></span><br>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default">保存</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal">取消</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {}
        }
    }

</script>

<style scoped>

</style>