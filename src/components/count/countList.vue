<template>
    <div>
        <el-tabs v-model="activeTabs">
            <el-tab-pane label="列表视图" name="first">
                <div style="padding-bottom: 20px;overflow: hidden;">
                    <div class="input-group" style="width: 30%;float: left;">
                        <input type="text" class="form-control" placeholder="Search for...">
                        <span class="input-group-btn">
                        <button class="btn btn-default" type="button">Go!</button>
                        </span>
                    </div>
                    <div style="float: left;margin-left: 15px;">
                        <button type="button" class="btn btn-primary">新增埋点</button>
                        <button type="button" class="btn btn-primary">导入埋点</button>
                        <button type="button" class="btn btn-primary">漏斗管理</button>
                    </div>
                </div>
                <table class="table table-hover table-bordered table-striped" >
                    <thead>
                    <th class="text-center">星标</th>
                    <th class="text-center">埋点编码</th>
                    <th class="text-center">数据（单位）</th>
                    <th class="text-center">埋点名称</th>
                    <th class="text-center">埋点页面</th>
                    <th class="text-center">从属漏斗</th>
                    <th class="text-center">修改记录</th>
                    <th class="text-center">操作</th>
                    </thead>
                    <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>

                </table>
            </el-tab-pane>
            <el-tab-pane label="图表视图" name="second">图表视图</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                activeTabs: 'first'
            }
        }
    }

</script>

<style scoped>

</style>