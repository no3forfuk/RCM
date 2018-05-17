<template>
    <div>
        <div class="modal fade" id="secondRate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">评级规则</h4>
                    </div>
                    <div class="modal-body">
                        名称：<span>{{info.ranking_name}}</span><br>
                        当前评级：<span></span><br>
                        子元素指数总和：<span></span><br>
                        子元素数：<span></span><br>
                        子元素平均数：<span></span><br>
                        子元素中位数：<span></span><br>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
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
        },
        props: ['info']
    }

</script>

<style scoped>

</style>