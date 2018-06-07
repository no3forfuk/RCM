<template>
    <div>
        <div class="page-header">
            <h3>统计</h3>
        </div>
        <el-tabs v-model="views.list">
            <el-tab-pane label="图表视图" name="first">
                <image-view></image-view>
            </el-tab-pane>
            <el-tab-pane label="列表视图" name="second">
                <list-view></list-view>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import listView from './listViews'
    import imageView from './imageView'

    export default {
        data() {
            return {
                views: {
                    list: 'first'
                }
            }
        },
        components: {
            'list-view': listView,
            'image-view': imageView,
        }
    }

</script>

<style scoped>

</style>