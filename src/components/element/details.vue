<template>
    <div>
        <div class="page-header">
            <h3>{{info.element_name}}</h3>
        </div>
        <el-tabs v-model="activeTab">
            <el-tab-pane label="信息总览" name="first">
                <div class="contianer">
                    <span class="h4"><b>元素名称:</b> </span>
                    <input type="text"
                           v-model="info.element_name"
                           :disabled="forbidEdit"
                           style="borderRadius: 4px;border:1px solid #ccc;padding: 2px;margin-left: 15px;">
                </div>
                <div class="contianer">
                    <span class="h4"><b>元素详情:</b></span>
                    <textarea v-model="info.element_desc"
                              :disabled="forbidEdit"
                              style="borderRadius: 4px;border:1px solid #ccc;padding: 2px;margin-left: 15px;vertical-align: top;"></textarea>
                </div>
                <div class="contianer">
                    <span class="h4"><b>指数:</b> </span>
                    <input type="text"
                           disabled
                           style="borderRadius: 4px;border:1px solid #ccc;padding: 2px;margin-left: 15px;">
                    <button style="padding: 4px;border: 0; background-color: #abcdef;border-radius: 2px;margin-left: 15px;">
                        编辑
                    </button>
                </div>
                <div class="contianer">
                    <span class="h4"><b>星标:</b> </span>
                    <el-select v-model="init_star" style="margin-left: 15px;" :disabled="forbidEdit">
                        <el-option v-for="item in star_options"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="contianer">
                    <span class="h4"><b>隐藏/显示:</b> </span>
                    <el-select v-model="init_hide" style="margin-left: 15px;" :disabled="forbidEdit">
                        <el-option v-for="item in hide_options"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="contianer">
                    <span class="h4"><b>创建者:</b> </span>
                    <input type="text"
                           disabled
                           style="borderRadius: 4px;border:1px solid #ccc;padding: 2px;margin-left: 15px;">
                </div>
                <div class="contianer">
                    <span class="h4"><b>创建时间:</b> </span>
                    <input type="text" v-model="info.created_at"
                           disabled
                           style="borderRadius: 4px;border:1px solid #ccc;padding: 2px;margin-left: 15px;">
                </div>
                <div class="contianer">
                    <span class="h4"><b>最后编辑时间:</b> </span>
                    <input type="text" v-model="info.updated_at"
                           disabled
                           style="borderRadius: 4px;border:1px solid #ccc;padding: 2px;margin-left: 15px;">
                </div>
                <hr>
                <button type="button" class="btn btn-default" @click="editElement">修改</button>
                <button type="button" class="btn btn-default" @click="cancelEditElement" v-if="!forbidEdit">取消</button>
                <button type="button" class="btn btn-default" @click="submitEdit" v-if="!forbidEdit">完成</button>

            </el-tab-pane>
            <el-tab-pane label="POST管理" name="second">
                <router-link :to="{name:'addPost',query:{id:info.id}}">
                    <button type="button" class="btn btn-default">添加POST</button>
                </router-link>
                <hr>
                <table class="table table-striped table-bordered table-hover">
                    <thead>
                    <th>POST详情</th>
                    <th>来源</th>
                    <th>操作</th>
                    </thead>
                    <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            </el-tab-pane>
            <el-tab-pane label="指数管理" name="third">
                <button type="button" class="btn btn-default">指数规则管理</button>
                <hr>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
    import {getElementDetails, editElementInfo} from '../../api/api'

    export default {
        data() {
            return {
                info: {},
                forbidEdit: true,
                init_star: '',
                init_hide: '',
                star_options: [
                    {
                        value: '选项1',
                        label: '不标记'
                    }, {
                        value: '选项2',
                        label: '标记'
                    }
                ],
                hide_options: [
                    {
                        value: '选项1',
                        label: '显示'
                    }, {
                        value: '选项2',
                        label: '隐藏'
                    }
                ],
                activeTab: 'first'
            }
        },
        created() {
            this.getElementDetails()

        },
        methods: {
            getElementDetails(){
                getElementDetails(this.$route.query.id).then(res => {
                    if (res.status == 200 && res.data.status_code == 1) {
                        this.info = res.data.data;
                        this.init_star = this.info.asterisk == 0 ? '不标记' : '标记';
                        this.init_hide = this.info.is_hide == 0 ? '隐藏' : '显示';
                    } else {
                        alert('获取元素失败')
                    }
                }).catch(err => {
                    throw err;
                })
            },
            cancelEditElement() {
                this.forbidEdit = true;
            },
            editElement() {
                this.forbidEdit = false;
            },
            submitEdit() {
                const params = {};
                params.element_name = this.info.element_name;
                params.element_desc = this.info.element_desc;
                params.id = this.info.id;
                if (this.init_star == '标记') {
                    params.asterisk = 1;
                } else {
                    params.asterisk = 0;
                }
                if (this.init_hide == '隐藏') {
                    params.is_hide = 0;
                } else {
                    params.is_hide = 1;
                }
                editElementInfo(params).then(res => {
                    if (res.status == 200 & res.data.status_code == 1) {
                        this.$alert('', '修改成功', {
                            confirmButtonText: '确定'
                        })
                    }
                    this.forbidEdit = true;
                }).catch(err => {
                    throw err;
                })
            }
        }
    }

</script>

<style scoped>
    .contianer {
        vertical-align: top;
        padding: 6px;
    }

    .contianer > span {
        display: inline-block;
        width: 125px;
    }
</style>