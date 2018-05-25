<template>
    <div>
        <div class="page-header">
            <h3>添加榜单</h3>
        </div>
        <el-form ref="rank" :model="rank" label-width="80px" style="width: 100%;">
            <el-form-item label="榜单级别">
                <el-select v-model="rank.ranking_level" placeholder="请选择榜单级别">
                    <el-option label="一级" value="1"></el-option>
                    <el-option label="二级" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="榜单名称">
                <el-input style="width: 50%;"
                          v-model="rank.ranking_name"></el-input>
            </el-form-item>
            <el-form-item label="榜单描述">
                <el-input style="width: 50%;"
                          type="textarea"
                          v-model="rank.ranking_desc"></el-input>
            </el-form-item>
            <el-form-item label="选择元素">
                <el-select multiple
                           filterable
                           remote
                           :no-data-text="tips"
                           placeholder="请选择元素"
                           @change="selectElement"
                           :remote-method="getElement"
                           v-model="rank.list">
                    <el-option v-for="(item,index) in elementList"
                               :label="item.element_name"
                               :value="item.id"
                               :key="index">
                    </el-option>
                </el-select>
                <el-button type="default" @click="addElement">新建元素</el-button>
            </el-form-item>
            <el-form v-if="isAddElement"
                     style="width: 80%;margin: 0 auto;border:1px solid #ccc;padding: 15px;border-radius: 8px;overflow: hidden;">
                <el-form-item label="元素名称">
                    <el-input style="width: 50%;"
                              v-model="element.element_name"></el-input>
                </el-form-item>
                <el-form-item label="元素描述">
                    <el-input style="width: 50%;"
                              type="textarea"
                              v-model="element.element_desc"></el-input>
                </el-form-item>
                <hr>
                <div style="float: right;margin-right: 50px;">
                    <el-button type="default" size="small" @click="cancelAddElement">取消</el-button>
                    <el-button type="default" size="small" @click="confirmAddElement">确定</el-button>
                </div>
            </el-form>
        </el-form>
        <hr>
        <div>
            <el-button type="default" @click="confirmAddRank">提交</el-button>
        </div>
    </div>
</template>

<script>
    import {getElementList, addElement, addSecondRank, addFirstRank} from '../../api/api'

    export default {
        data() {
            return {
                rank: {
                    ranking_level: '',
                    ranking_name: '',
                    ranking_desc: '',
                    list: [],
                    is_hide: 1,
                    asterisk: 0

                },
                element: {
                    element_name: '',
                    element_desc: ''
                },
                elementList: [],
                tips: '没有该元素，请立即创建',
                isAddElement: false
            }
        },
        created() {

        },
        updated() {

        },
        methods: {
            confirmAddRank() {
                if (this.rank.ranking_name == '') {
                    this.$message({
                        message: '请输入榜单名称',
                        type: 'error',
                        duration: 1500
                    })
                    return;
                }
                if (this.rank.ranking_level == '') {
                    this.$message({
                        message: '请选择榜单级别',
                        type: 'error',
                        duration: 1500
                    })
                    return;
                }
                var params = {}
                params.ranking_level = this.rank.ranking_level;
                params.ranking_name = this.rank.ranking_name;
                params.ranking_desc = this.rank.ranking_desc;
                params.is_hide = this.rank.is_hide;
                params.asterisk = this.rank.asterisk;
                if (this.rank.list.length !== 0) {
                    params.list = this.rank.list;
                    params.list = params.list.join(',');
                }

                if (this.rank.ranking_level == '1') {
                    addFirstRank(params).then(res => {
                        if (res.status == 200 && res.data.status_code == 1) {
                            this.$message({
                                message: '创建成功',
                                type: 'success',
                                duration: 1500
                            })
                            this.$router.replace('FirstList')
                        }
                    }).catch(err => {
                        throw err;
                    })
                    return;
                }
                if (this.rank.ranking_level == '2') {
                    addSecondRank(params).then(res => {
                        if (res.status == 200 && res.data.status_code == 1) {
                            this.$message({
                                message: '创建成功',
                                type: 'success',
                                duration: 1500
                            })
                            this.$router.replace('FirstList')
                        }
                    }).catch(err => {
                        throw err;
                    })
                    return;
                }
            },
            addElement() {
                this.isAddElement = true;
            },
            cancelAddElement() {
                this.isAddElement = false;
            },
            confirmAddElement() {
                var params = {}
                params.is_hide = 1;
                params.asterisk = 0;
                params.element_name = this.element.element_name;
                params.element_desc = this.element.element_desc;
                if (this.element.element_name == '') {
                    this.$message({
                        message: '请输入元素名称',
                        type: 'error',
                        duration: 1500
                    })
                    return;
                }
                addElement(params).then(res => {
                    if (res.status == 200 && res.data.status_code == 1) {
                        var params = {};
                        params.like = this.element.element_name;
                        getElementList(params).then(res => {
                            if (res.status == 200 && res.data.status_code == 1) {
                                this.rank.list.push(res.data.data.data[0].id);
                                this.isAddElement = false;
                            }
                        }).catch(err => {
                            throw err;
                        })
                    }
                }).catch(err => {
                    throw err;
                })
            },
            selectElement() {

            },
            getElement(query) {
                if (query !== '') {
                    var parasm = {};
                    parasm.like = query;
                    getElementList(parasm).then(res => {
                        if (res.status == 200 && res.data.status_code == 1) {
                            this.elementList = res.data.data.data;
                        }
                    }).catch(err => {
                        throw err;
                    })
                }
            }
        }
    }

</script>

<style scoped>

</style>