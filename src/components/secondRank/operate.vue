<template>
    <div class="modal fade bs-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" @click="closeModal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h3 class="modal-title" id="gridSystemModalLabel" >{{modal.name}}</h3>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">标题</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="请输入标题内容" v-model="editData.data.name">
                            </div>
                        </div>
                        <div class="form-group">
                            <label  class="col-sm-2 control-label">级别</label>
                            <div class="col-sm-10">
                                <label class="radio-inline">
                                    <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="一级" v-model="editData.data.level"> 一级
                                </label>
                                <label class="radio-inline">
                                    <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="二级"
                                           v-model="editData.data.level"> 二级
                                </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">从属榜单</label>
                            <div class="col-sm-10">
                                <div class="dropdown dropdown">
                                    <div class="buffer_rank" ref="buffer_rank">
                                        <button @dblclick="deleteThis($event,index,belongArr,belongData)" v-for="(item,index) in belongArr" :key="index" class="btn btn-default" >{{item}}</button>
                                    </div>
                                    <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                        请选择
                                        <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu belong_rank" aria-labelledby="dropdownMenu1">
                                        <li v-for="(item,index) in belongData" :key="index" ><a href="javascript:;" @click="select($event,index,belongData,belongArr)">{{item.name}}</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">星标</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="请输入星标" v-model="editData.data.star">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">详情</label>
                            <div class="col-sm-10">
                                <textarea v-model="editData.data.disc"></textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">元素列表</label>
                            <div class="col-sm-10">
                                <div class="ele-buffer">
                                    <button v-for="(item,index) in eleArr" :key="index" class="btn btn-default ele-btn" @dblclick="deleteThis($event,index,eleArr,eleData)">{{item}}</button>
                                </div>
                                <div class="dropdown">
                                    <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                        请选择
                                        <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu belong_rank" aria-labelledby="dropdownMenu1">
                                        <li v-for="(item,index) in eleData" :key="index" @click="select($event,index,eleData,eleArr)"><a href="javascript:;">{{item.name}}</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" @click="closeModal">取消</button>
                    <button type="button" class="btn btn-primary" data-target=".confirm" @click="readyData" data-toggle="modal">确定</button>
                </div>
            </div>
        </div>
        <y-modal-confirm :modal="editData" :tabData="tabData"></y-modal-confirm>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                submitData: {
                    name: "",
                    level: "",
                    star: "",
                    disc: "",
                    belong: ""
                },
                belongArr: [], //用于展示的数据 button
                belongData: [], //ajax请求到的数据 select
                eleArr: [], //b
                eleData: [] ,//s
                obj:{}
            };
        },
        created() {
            //获取从属榜单数据

            // this.$ajax
            //   .get("/query/r1/belong")
            //   .then(res => {
            //     this.belongData = res.data.belong;
            //   })
            //   .catch(err => {});
            // this.$ajax
            //   .get("/query/r1/ele")
            //   .then(res => {
            //     this.eleData = res.data.ele;
            //   })
            //   .catch(err => {});
        },
        mounted() {},
        methods: {
            select(element, index, from, to) {
                let text = element.target.innerText;
                to.push(text);
                from.splice(index, 1);
            },
            deleteThis(element, index, from, to) {
                let el = from.splice(index, 1);
                let obj = {};
                obj.id = index;
                obj.name = el[0];
                to.push(obj);
            },
            closeModal() {
                $(".bs-modal-lg").modal("hide");
            },
            readyData(){
                this.editData.data = {
                    name:this.editData.data.name,
                    level:this.editData.data.level,
                    disc:this.editData.data.disc,
                    time:"time",
                    class:["旅游"],
                    who:"贱贱",
                    star:this.editData.data.star,
                    children:['element']
                }
            }
        },
        computed: {
            editData() {
                let obj = Object.assign({}, this.modal);
                return obj;
            }
        },
        props: ["modal","tabData"]
    };
</script>
<style scoped>

    .belong_rank {
        max-height: 200px;
        overflow-y: auto;
    }
    .buffer_rank {
        float: left;
        margin-right: 1rem;
    }
    .ele-btn {
        display: block;
        width: 70%;
    }
    .ele-buffer {
        max-height: 200px;
        overflow: auto;
    }
</style>
