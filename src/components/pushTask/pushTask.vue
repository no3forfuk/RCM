<template>
    <div class="root">
        <div class="left">
            <div class="page-header">
                <h3>推送任务</h3>
            </div>
            <div>
                <table class="table table-striped push-tab table-bordered">
                    <thead>
                        <th class="text-center" style="width:10%">
                            <input type="checkbox">全选
                        </th>
                        <th class="text-center">名称</th>
                    </thead>
                    <tbody>
                        <tr v-for="(list,index) in lists" :key="index">
                            <td class="text-center check-td" @click="getPushTask(list,index)">
                                <input type="checkbox" ref="checkboxes">
                            </td>
                            <td>{{list.ranking_name}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="right">
            <div class="panel panel-default">
                <div class="panel-body task-window">
                    <ul class="list-group">
                        <li class="list-group-item"><input type="checkbox"></li>
                    </ul>
                </div>
                <div class="panel-footer task-ctrl">
                    <button type="button" class="btn btn-default"><i class="glyphicon glyphicon-hand-up"></i></button>
                    <button type="button" class="btn btn-default"><i class="glyphicon glyphicon-remove"></i></button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getRankList } from "../../api/api";
export default {
  data() {
    return {
      lists: []
    };
  },
  created() {
    getRankList()
      .then(res => {
        this.lists = res.data.data;
      })
      .catch(err => {});
  },
  updated(){
      console.log(this.$refs.checkboxes);
  },
  methods: {
    getPushTask(list,i) {
      var arr = [];
      for (let i = 0; i < this.$refs.checkboxes.length; i++) {
          if(this.$refs.checkboxes[i].checked){
             arr.push(list)
          }
      }
      console.log(arr)
    }
  }
};
</script>
<style scoped>
.task-ctrl button {
  width: 48%;
}
.task-ctrl {
  height: 60px;
  text-align: center;
}
.task-window {
  width: 460px;
  height: 400px;
}
.root {
  position: relative;
}
.right {
  position: absolute;
  top: 0px;
  right: -16px;
}
.left {
  padding-right: 480px;
  box-sizing: border-box;
}
.check-td {
  text-indent: -27px;
}
.text-center {
  text-align: center;
}
</style>
