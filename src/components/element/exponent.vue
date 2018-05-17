<template>
    <div>
        <div class="modal fade" id="eleExp" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">元素指数</h4>
                    </div>
                    <div class="modal-body">
                        录入时间：<span></span><br>
                        当前指数：<span></span><br>
                        评论数：<span></span><br>
                        浏览时长：<span></span><br>
                        转发次数：<span></span><br>
                        点赞总数：<span></span><br>
                        投币总数：<span></span><br>
                        推送次数：<span></span><br>
                        初始热度：<span></span><br>
                        追加：<span></span><br>
                        调整后指数：<span></span><br>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default">历史指数</button>
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