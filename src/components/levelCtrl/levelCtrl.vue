<template>
    <div>
        <div class="page-header">
            <h3>上下级管理</h3>
        </div>
        <div>

        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                rankList: []
            };
        },
        created() {

        },
        methods: {
            deleteItem(targrt, index) {
                this.rankList.splice(index, 1)
            }
        }
    };
</script>
<style scoped>
</style>
