<template>
    <div>
        <div class="page-header">
            <h3>POST列表</h3>
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
