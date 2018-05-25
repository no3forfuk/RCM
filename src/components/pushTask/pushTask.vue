<template>
    <div>
        <div>
            <el-date-picker type="date" placeholder="请选择日期" format="yyyy-MM-dd" v-model="today"
                            :picker-options="pickerOptions"></el-date-picker>
            <router-link :to="{name:'PushList'}">
                <button type="button" class="btn btn-default">添加推送任务</button>
            </router-link>
        </div>
        <hr>
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
                                <span v-text="item.name"></span>
                            </td>
                            <td class="text-center">
                                <el-button type="primary" size="small" @click="toTop(index,item)"
                                           :disabled="item.isLocked">置顶
                                </el-button>
                                <el-button type="primary" size="small"
                                           @click="deletePushItem(index)"
                                           :disabled="item.isLocked">
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
                    <el-button type="primary" size="small" @click="submitPush">全部推送</el-button>
                </el-tab-pane>
                <el-tab-pane label="已推送" name="second">

                </el-tab-pane>
            </el-tabs>
        </div>

    </div>
</template>

<script>
    import {getPushTaskList, serachRankList, addPushTask, editPushTask} from '../../api/api'
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
            deletePushItem(i) {
                this.pushList.splice(i, 1);
                var params = {};
                var arr = [];
                params.push_date = timeFormat('-', this.today);
                params.is_save = 1;
                for (let i = 0; i < this.pushList.length; i++) {
                    var obj = {};
                    obj.level = this.pushList[i].level;
                    obj.id = this.pushList[i].id;
                    obj.name = this.pushList[i].name;
                    arr.push(obj);
                }
                params.push_json = arr;
                editPushTask(params).then(res => {
                    if (res.status == 200 && res.data.status_code == 1) {
                        this.$message({
                            message: '删除成功',
                            type: 'success',
                            duration: 1500
                        })
                    }
                    this.getPushList(this.today);
                }).catch(err => {
                    throw err;
                })
            },
            submitPush() {
                var params = {};
                var arr = [];
                params.push_date = timeFormat('-', this.today);
                params.is_save = 0;
                for (let i = 0; i < this.pushList.length; i++) {
                    var obj = {};
                    obj.level = this.pushList[i].level;
                    obj.id = this.pushList[i].id;
                    obj.name = this.pushList[i].name;
                    arr.push(obj);
                }
                params.push_json = arr;
                editPushTask(params).then(res => {
                    if (res.status == 200 && res.data.status_code == 1) {
                        this.$message({
                            message: '推送成功',
                            type: 'success',
                            duration: 1500
                        })
                    }
                }).catch(err => {
                    throw err;
                })
            },
            searchPushList(params) {
                var self = this;
                serachRankList(params).then(res => {

                }).catch(err => {
                    throw err
                })

            },
            getPushList(time) {
                return new Promise((resolve, reject) => {
                    var params = {};
                    params.time = timeFormat('-', time);
                    getPushTaskList(params).then(res => {
                        if (res.status == 200 && res.data.status_code == 1) {
                            if(res.data.data){
                                this.pushList = JSON.parse(res.data.data.push_json);
                                for (let i = 0; i < this.pushList.length; i++) {
                                    this.$set(this.pushList[i], 'isLocked', false)
                                }
                            }
                        }

                    }).catch(err => {
                        throw err;
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