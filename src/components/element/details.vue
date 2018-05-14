<template>
    <div>
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
            <button style="padding: 4px;border: 0; background-color: #abcdef;border-radius: 2px;margin-left: 15px;">编辑
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
        <button type="button" class="btn btn-default" @click="editElement">修改</button>
        <button type="button" class="btn btn-default" @click="submitEdit" v-if="!forbidEdit">完成</button>
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
            }
        },
        created() {
            getElementDetails().then(res => {
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
        methods: {
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
                        alert('修改成功')
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