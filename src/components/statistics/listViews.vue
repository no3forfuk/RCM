<template>
    <div>
        <el-input placeholder="请输入内容"
                  style="width: 300px;"
                  v-model="searchValue">
            <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button>新增埋点</el-button>
        <el-button>导入埋点</el-button>
        <el-button>埋点管理</el-button>
        <hr>
        <el-table
                :data="tableData3"
                border
                style="width: 100%">
            <el-table-column
                    prop="date"
                    label="星标">
                <el-switch
                        v-model="value2"
                        active-color="#13ce66"
                        slot-scope="scope"
                        inactive-color="#ff4949">
                </el-switch>
                <div>

                </div>
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="埋点编码">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="数据（单位）">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="埋点名称">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="埋点页面">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="漏斗">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="修改记录">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="操作">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                tableData3: [
                    {
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }
                ],
                value2: true,
                searchValue: ''
            }
        }
    }

</script>

<style scoped>

</style>