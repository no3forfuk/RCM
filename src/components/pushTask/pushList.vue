<template>
    <div>
        <el-date-picker
                type="date"
                placeholder="请选择日期"
                format="yyyy-MM-dd"
                :picker-options="pickerOptions"
                v-model="day">
        </el-date-picker>
        <button type="button" class="btn btn-default" @click="pushTodayTask">查看今日任务</button>
        <hr>
        <el-tabs v-model="activeName">
            <el-tab-pane label="一级榜单" name="first">
                一级榜单
            </el-tab-pane>
            <el-tab-pane label="二级榜单" name="second">
                <div class="input-group" style="width: 60%;">
                    <input type="text" class="form-control" placeholder="Search"
                           aria-describedby="basic-addon2" v-model="rank2KeyWords">
                    <span class="input-group-addon" id="basic-addon2" @click="searchRank2keyWords(rank2_page)"
                          style="cursor: pointer;"><span
                            class="glyphicon glyphicon-search"></span></span>
                </div>
                <br>
                <div style="max-height: 500px;overflow-y: auto;">
                    <table class="table-bordered table table-hover table-striped"
                    >
                        <thead>
                        <th>序号</th>
                        <th>榜单名称</th>
                        <th>榜单详情</th>
                        <th>操作</th>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in rank2" :key="index">
                            <td>{{(index + 1) + (rank2_page - 1) * rank2_per_page}}</td>
                            <td>{{item.ranking_name}}</td>
                            <td>{{item.ranking_desc}}</td>
                            <td>

                                <button type="button"
                                        @click="addPushTaskList(item)"
                                        class="btn btn-default">
                                    添加到当日任务
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <hr>
                <el-pagination
                        background
                        layout="prev, pager, next"
                        @current-change="getRank2ListByPage"
                        :page-size="rank2_per_page"
                        :total="rank2_total">
                </el-pagination>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    import {getSecondRank, editPushTask, getPushTaskList, addPushTask} from "../../api/api";
    import {timeFormat} from '../../utils/utils'

    export default {
        data() {
            return {
                day: Date.now(),
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() + 3600 * 1000 * 24 < Date.now();
                    }
                },
                activeName: 'second',
                rank2: [],
                rank2KeyWords: '',
                rank2_page: 1,
                rank2_totalPage: 0,
                rank2_total: 0,
                selectedDay: '',
                rank2_per_page: 0,
                pushArr: [],
                is_add: false

            };
        },
        created() {
            this.getSecondRank(this.rank2_page);

        },
        updated() {
            this.getPushTaskList();
        },
        methods: {
            getPushTaskList() {
                return new Promise((resolve, reject) => {
                    var params = {};
                    params.time = timeFormat('-', this.day);
                    getPushTaskList(params).then(res => {
                        if (res.status == 200 && res.data.status_code == 1) {
                            if (res.data.data) {
                                this.pushArr = JSON.parse(res.data.data.push_json) || [];
                                this.is_add = false;
                            } else {
                                this.pushArr = [];
                                this.is_add = true;
                            }
                        }
                    }).catch(err => {
                        throw err;
                    })
                })
            },
            addPushTaskList(item) {
                var obj = {};
                obj.level = 2;
                obj.id = item.id;
                obj.name = item.ranking_name;
                var flag = false;
                for (let i = 0; i < this.pushArr.length; i++) {
                    if (obj.id == this.pushArr[i].id) {
                        flag = true;
                        break;
                    } else {
                        continue;
                    }
                }
                if (!flag) {
                    this.pushArr.push(obj);
                } else {
                    this.$alert('该榜单今日已添加').then(() => {
                        return
                    }).catch(() => {
                        return
                    })
                    return
                }

            },
            pushTodayTask() {
                if (this.pushArr.length == 0) {
                    this.$router.replace('PushTask');
                    return;
                }
                if (this.pushArr.length > 0 && !this.is_add) {
                    var date = timeFormat('-', this.day);
                    var params = {};
                    params.push_date = date;
                    params.push_json = this.pushArr;
                    params.is_save = 1;
                    editPushTask(params).then(res => {
                        if (res.status == 200 && res.data.status_code == 1) {
                            this.$router.replace('PushTask');
                        }
                    }).catch(err => {
                        throw err;
                    });
                } else {
                    var date = timeFormat('-', this.day);
                    var params = {};
                    params.push_date = date;
                    params.push_json = this.pushArr;
                    params.is_save = 1;
                    addPushTask(params).then(res => {
                        if (res.status == 200 && res.data.status_code == 1) {
                            this.$message({
                                message: '添加成功',
                                type: 'success',
                                duration: 1500
                            })
                            this.$router.replace('PushTask');
                        }
                    }).catch(err => {
                        throw err;
                    })
                }


            },
            getSecondRank(page) {
                this.rank2_page = page;
                var params;
                if (this.rank2KeyWords == '') {
                    params = {
                        page: page
                    }
                } else {
                    params = {
                        page: page,
                        like: this.rank2KeyWords
                    }
                }
                getSecondRank(params).then(res => {
                    if (res.status == 200 && res.data.status_code == 1) {
                        this.rank2 = res.data.data.data;
                        this.rank2_totalPage = res.data.data.last_page;
                        this.rank2_total = res.data.data.total;
                        this.rank2_per_page = res.data.data.per_page;
                    }
                }).catch(err => {
                    throw err;
                })
            },
            searchRank2keyWords(page) {
                var params;
                if (this.rank2KeyWords == '') {
                    params = {
                        page: page
                    }
                } else {
                    params = {
                        page: page,
                        like: this.rank2KeyWords
                    }
                }
                getSecondRank(params).then(res => {
                    if (res.status == 200 && res.data.status_code == 1) {
                        this.rank2 = res.data.data.data;
                    }
                }).catch(err => {
                    throw err
                })
            },
            getRank2ListByPage(val) {
                this.getSecondRank(val);
            }
        },
        computed: {
            today() {
                return timeFormat('/', this.day);
            }
        }
    };
</script>
<style scoped>

</style>
