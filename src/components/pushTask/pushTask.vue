<template>
    <div>
        <div class="page-header">
            <span v-text="today" class="h3"></span>
        </div>
        <table class="table table-bordered table-striped table-hover">



        </table>
    </div>
</template>

<script>
    import {timeFormat} from '../../utils/utils'

    export default {
        data() {
            return {}
        },
        computed: {
            today() {
                return timeFormat('/')
            }
        }
    }

</script>

<style scoped>

</style>