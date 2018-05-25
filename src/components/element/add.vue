<template>
    <div>
        <div class="page-header">
            <h3>添加元素</h3>
        </div>
        <div style="padding: 8px;position: relative;">
            <span style="display: inline-block; width: 80px;"><b>所属榜单：</b></span>
            <el-input style="width: 40%;"
                      disabled=disabled
                      v-if="have_id"
                      v-model="secondRank_name"></el-input>
            <el-input style="width: 40%;"
                      v-if="!have_id"
                      v-model="keyWords">
                <i slot="suffix"
                   class="el-input__icon el-icon-close"
                   @click="removeChoose"
                   style="cursor: pointer;"></i>
            </el-input>
            <ul class="list-group" v-if="hasRankList"
                style="width: 39.5%;position: absolute;top: 48px;left: 91px;z-index: 1;">
                <li class="list-group-item" v-for="(item,index) in ranking_list"
                    style="cursor: pointer;"
                    :key="index"
                    @click="chooseSecondRank(item)">
                    {{item.ranking_name}}
                </li>
            </ul>
        </div>
        <div style="padding: 8px;">
            <span style="display: inline-block; width: 80px;"><b>元素名称：</b></span>
            <el-input style="width: 40%;" placeholder="请输入元素名称" v-model="element_name"></el-input>
        </div>
        <div style="padding: 8px;">
            <span style="display: inline-block; width: 80px;"><b>元素详情：</b></span>
            <el-input type="textarea" style="width: 40%;" placeholder="请输入元素详情" v-model="element_desc"></el-input>
        </div>
        <div style="padding: 8px;">
            <span style="display: inline-block; width: 80px;"><b>星标：</b></span>
            <el-select v-model="asterisk">
                <el-option label="标记" value="1"></el-option>
                <el-option label="不标记" value="0"></el-option>
            </el-select>
        </div>
        <div style="padding: 8px;">
            <span style="display: inline-block; width: 80px;"><b>显示/隐藏：</b></span>
            <el-select v-model="is_hide">
                <el-option label="隐藏" value="0"></el-option>
                <el-option label="显示" value="1"></el-option>
            </el-select>
        </div>
        <div style="padding: 8px;">
            <span style="display: inline-block; width: 80px;"><b>指数：</b></span>
            <el-input style="width: 40%;"></el-input>
        </div>
        <hr>
        <button class="btn btn-default" @click="addElement">提交</button>
    </div>
</template>

<script>
    import {getElementDetails, getSecondRank, addElement,getSecondRankDetails} from '../../api/api'

    export default {
        data() {
            return {
                asterisk: '',
                is_hide: '',
                element_name: '',
                element_desc: '',
                ranking_id: '',
                have_id: '',
                keyWords: '',
                ranking_list: [],
                hasRankList: '',
                chooseFlag: false,
                secondRank_name: ''
            }
        },
        created() {
            this.haveId();
            this.getELementNameById();
        },
        updated() {

        },
        methods: {
            getELementNameById() {
                if (this.$route.query.id) {
                    getSecondRankDetails(this.$route.query.id).then(res => {
                        if (res.status == 200 && res.data.status_code == 1) {
                            this.secondRank_name = res.data.data.ranking_name;
                        }
                    }).catch(err => {
                        throw err;
                    })

                } else {
                    return;
                }

            },
            removeChoose() {
                this.chooseFlag = false;
                this.keyWords = '';
            },
            chooseSecondRank(item) {
                this.chooseFlag = true;
                this.keyWords = item.ranking_name;
                this.hasRankList = false;
            },
            //判断是否传入id
            haveId() {
                if (this.$route.query.id) {
                    this.have_id = true;
                } else {
                    this.have_id = false;
                }
            },
            //获取榜单列表
            getRankList() {
                if (this.have_id == true) {
                    return;
                } else {
                    var params = {
                        like: this.keyWords
                    }
                    getSecondRank(params).then(res => {
                        if (res.status == 200 && res.data.status_code == 1) {
                            this.ranking_list = res.data.data.data;
                            if (this.ranking_list.length > 0 && this.keyWords != '' && !this.chooseFlag) {
                                this.hasRankList = true;
                            } else {
                                this.hasRankList = false;
                            }
                        }
                    }).catch(err => {
                        throw err;
                    })
                }
            },
            //添加元素
            addElement() {
                var params = {};
                params.element_name = this.element_name;
                params.element_desc = this.element_desc;
                params.is_hide = this.is_hide || 1;
                params.asterisk = this.asterisk || 0;
                params.ranking_id = parseInt(this.$route.query.id);
                if (!params.element_name) {
                    this.$message({
                        message: '元素名称不能为空',
                        duration: 1000,
                        type: 'error'
                    });
                    return;
                }
                this.$confirm('', '确定要添加元素吗？', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    addElement(params).then(res => {
                            if (res.status == 200 && res.data.status_code == 1) {
                                this.$message({
                                    message: '添加成功',
                                    duration: 1000,
                                    type: 'success'
                                })
                            }
                        }
                    ).catch(err => {
                        throw err;
                    })
                }).catch(() => {
                    return;
                })
            }
        }
        ,
        watch: {
            keyWords(n, o) {
                this.getRankList();
            }
        }
    }

</script>

<style scoped>

</style>