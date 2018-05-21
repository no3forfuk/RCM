<template>
    <div>
        <div>
            <el-date-picker type="date" placeholder="请选择日期" format="yyyy-MM-dd" v-model="today"
                            :picker-options="pickerOptions"></el-date-picker>
            <button type="button" class="btn btn-default" data-toggle="modal" data-target=".add-task">添加推送任务</button>
        </div>
        <div>
            <el-tabs v-model="activeName">
                <el-tab-pane label="推送任务" name="first">
                    <table class="table table-hover table-striped table-bordered">
                        <thead>
                        <th>序号</th>
                        <th style="width:40%;" class="text-center">
                            榜单名称
                        </th>
                        <th style="width:55%;" class="text-center">
                            编辑
                        </th>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in pushList" :key="index">
                            <td v-text="index+1"></td>
                            <td @click="check(index)">
                                <input type="checkbox" ref="checkBoxLists" @click="check(index)">
                                <span v-text="item.ranking_name"></span>
                            </td>
                            <td class="text-center">
                                <el-button type="primary" size="small" @click="toTop(index,item)"
                                           :disabled="item.isLocked">置顶
                                </el-button>
                                <el-button type="primary" size="small" :disabled="item.isLocked">
                                    <i style="font-size: 12px;font-weight: 900;font-style: normal;">&times;</i>
                                </el-button>
                                <el-button type="primary" size="small" @click="locked(item)">
                                    <i class="iconfont icon-jiesuo"
                                       style="fontSize:12px;" v-if="!item.isLocked"></i>
                                    <i class="iconfont icon-suoding"
                                       style="fontSize:12px;color:#e51616;fontWeight:700;" v-if="item.isLocked"></i>
                                </el-button>

                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <el-button type="primary" size="small">推送</el-button>
                    <el-button type="primary" size="small">全部推送</el-button>
                </el-tab-pane>
                <el-tab-pane label="已推送" name="second">

                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="modal fade add-task" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">添加推送任务</h4>
                    </div>
                    <div class="modal-body">
                        <div class="input-group search-box">
                            <input type="text" class="form-control" placeholder="请输入关键字搜索"
                                   aria-describedby="basic-addon2" @click="searchPushList" v-model="keyWords">
                            <span class="input-group-addon" id="basic-addon2"><span
                                    class="glyphicon glyphicon-search"></span></span>
                        </div>
                        <ul class="list-group">
                            <li class="list-group-item">
                                Cras justo odio
                                <button type="button" class="btn btn-default">添加</button>
                            </li>
                        </ul>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary">添加</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getPushTaskList, serachRankList} from '../../api/api'
    import {timeFormat} from '../../utils/utils'


    export default {

        data() {
            return {
                today: Date.now(),
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() + 3600 * 1000 * 24 * 7 < Date.now();
                    }
                },
                activeName: "first",
                pushList: [],
                keyWords: ''
            };
        },
        created() {
            this.getPushList(this.today);
        },
        computed: {},
        methods: {
            searchPushList(params) {
                var self = this;
                serachRankList(params).then(res => {

                }).catch(err => {
                    throw err
                })

            },
            getPushList(time) {
                return new Promise((resolve, reject) => {
                    const params = timeFormat('-', time);
                    getPushTaskList(params).then(res => {
                        if (res.status == 200 && res.data.status_code == 1) {
                            this.pushList = res.data.data.data;
                            for (let i = 0; i < this.pushList.length; i++) {
                                this.$set(this.pushList[i], 'isLocked', false)
                            }
                        }

                    }).catch(err => {
                        console.log(err);
                    })
                })
            },
            check(i) {
                if (this.$refs.checkBoxLists[i].checked) {
                    this.$refs.checkBoxLists[i].checked = false;
                } else {
                    this.$refs.checkBoxLists[i].checked = true;
                }
            },
            toTop(index, item) {
                const temp_lock = {};
                var arr = [];
                var count = 0;
                for (let i = 0; i < this.pushList.length; i++) {
                    if (this.pushList[i].isLocked) {
                        temp_lock[i] = this.pushList[i];
                    } else {
                        arr.push(this.pushList[i])
                    }
                }
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i] == item) {
                        count = i;
                    }
                }
                var that_arr = arr.splice(count, 1);
                arr = that_arr.concat(arr);
                for (let k in temp_lock) {
                    arr.splice(k, 0, temp_lock[k]);
                }
                this.pushList = arr;
            },
            locked(item) {
                item.isLocked = !item.isLocked;
            },
            deleteOne(i) {

            }
        },
        watch: {
            today: function (n, o) {
                this.getPushList(n);
            },
            keyWords: function (n, o) {
                this.searchPushList(n);
            }
        }
    };
</script>

<style scoped>

</style>