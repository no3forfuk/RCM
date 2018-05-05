<template>
    <div>
        <div class="page-header">
            <h3><input type="text" v-model="data.element_name" placeholder="请输入元素名称"></h3>
            <textarea class="form-control" rows="3" v-model="data.element_desc" placeholder="请编辑详情"></textarea>
        </div>
        <h4>POST列表 <button type="button" class="btn btn-default">添加POST</button></h4>
        <table class="table table-bordered table-hover table-striped">

            <thead>
                <th class="text-center">序号</th>
                <th class="text-center">POST标题</th>
                <th class="text-center">热度</th>
                <th class="text-center">种类</th>
                <th class="text-center">来源</th>
                <th class="text-center">
                    创建者
                </th>
                <th class="text-center">
                    最后编辑时间
                </th>
                <th class="text-center">
                    操作
                </th>
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
    </div>
</template>

<script>

    export default {
        data() {
            return {
                data: this.$route.params.content
            }
        },
        created() {
            console.log(this.data);
        },
        updated() {

        }
    }

</script>

<style scoped>

</style>