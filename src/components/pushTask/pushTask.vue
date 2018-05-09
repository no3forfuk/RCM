<template>
    <div>
        <div>
            <el-date-picker type="date" placeholder="请选择日期" format="yyyy-MM-dd"  v-model="today" :picker-options="pickerOptions"></el-date-picker>
        </div>
        <div>
            <el-tabs v-model="activeName">
                <el-tab-pane label="推送任务" name="first">
                    <table class="table table-hover table-striped">
                        <thead>
                            <th style="width:40%;" class="text-center">
                                榜单名称
                            </th>
                            <th style="width:60%;" class="text-center">
                                操作
                            </th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>二级榜单</td>
                                <td>
                                    <el-button type="primary" size="small">置顶</el-button>
                                    <el-button type="primary" size="small">
                                        <i class="iconfont icon-suoding" style="fontSize:12px;"></i>
                                    </el-button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <el-button type="primary" size="small">推送</el-button>
                </el-tab-pane>
                <el-tab-pane label="已推送" name="second">

                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      today: Date.now(),
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() + 3600 * 1000 * 24 * 7 < Date.now();
        }
      },
      activeName: "first"
    };
  },
  computed: {}
};
</script>

<style scoped>

</style>