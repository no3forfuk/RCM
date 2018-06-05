<template>
    <div>
        <div class="page-header">
            <h3>统计</h3>
        </div>
        <el-tabs v-model="views.list">
            <el-tab-pane label="图表视图" name="first">
            </el-tab-pane>
            <el-tab-pane label="列表视图" name="second">
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>


    export default {
        data() {
            return {
                views: {
                    list: 'second'
                }
            }
        }
    }

</script>

<style scoped>

</style>