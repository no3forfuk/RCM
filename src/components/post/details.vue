<template>
    <div class="root">
        <div class="panel panel-default" style="width: 40%;">
            <div class="panel-heading">
                <el-select v-model="selectValue" placeholder="请选择POST类型">
                    <el-option v-for="(item,index) in text.type" :key="index" :label="item.label" :value="item.value">

                    </el-option>
                </el-select>
            </div>
            <div class="panel-body">
                <textarea name="" id="" cols="40" rows="20" v-model="phone">

                </textarea>
            </div>
        </div>
        <div class="h5-view" ref="view">
            <div class="container">
                {{phone}}
            </div>
        </div>
    </div>
</template>

<script>
    import {detailsText} from './text'

    export default {
        data() {
            return {
                text: {},
                selectValue: '',
                phone:''
            }
        },
        created() {
            this.init();
        },
        mounted() {
            this.$nextTick(function () {
                this.moveH5View()
            })
        },
        updated() {

        },
        methods: {
            init() {
                this.text = detailsText;
            },
            moveH5View() {
                const h5View = this.$refs.view;
                h5View.addEventListener('mousedown', function (e) {
                    var pageX = e.clientX;
                    var pageY = e.clientY;
                    document.onmousemove = function (e) {

                    }
                })
                document.onmouseup = function () {
                    document.onmousemove = null;
                }
            }
        }
    }

</script>

<style scoped>
    .root {
        position: relative;
    }

    .h5-view {
        width: 365px;
        height: 792px;
        /*background: url("../../static/images/phone.png");*/
        position: absolute;
        top: 10px;
        left: 50%;
    }
    .container{
        width: 334px;
        height: 582px;
        background-color: #e3e3e3;
        margin-top: 100px;
    }
</style>