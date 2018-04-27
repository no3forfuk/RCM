<template>
    <div class="root">
        <div class="left">
            <div class="page-header range">
                <h3>推送任务</h3>
                <button type="button" class="btn btn-success addTask"><i class="glyphicon glyphicon-arrow-right" @click="getPushTask"></i></button>
            </div>
            <div>
                <table class="table table-striped push-tab table-bordered table-hover active">
                    <thead>
                        <th class="text-center" style="width:10%">
                            <input type="checkbox" @click="checkAll">全选
                        </th>
                        <th class="text-center">名称</th>
                    </thead>
                    <tbody>
                        <tr v-for="(list,index) in lists" :key="index">
                            <td class="text-center check-td">
                                <input type="checkbox" ref="checkboxes">
                            </td>
                            <td @click="addSingle(list)">{{list.ranking_name}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="right">
            <div class="panel panel-default">
                <div class="panel-body task-window">
                    <ul class="list-group" ref="pushBuffer">
                        <li  class="list-group-item order" v-for="(item,index) in pushTashArr" :key="index"><input @change="orderDiy"  @focus="getOldValue(index)" type="number" min="1" max="20" v-model="order[index]" class="order-input" ><span style="marginLeft:5px;" @click="deleteSingle(item,index)">{{item.ranking_name}}</span><input type="checkbox" style="float:right;" ref="taskCheck" ></li>
                    </ul>
                </div>
                <div class="panel-footer task-ctrl">
                    <button type="button" class="btn btn-default" @click="pushSort"><i class="glyphicon glyphicon-hand-up"></i></button>
                    <button type="button" class="btn btn-default" @click="removeAll"><i class="glyphicon glyphicon-remove"></i></button>
                     <button type="button" class="btn btn-success" style="width:97%;marginTop:5px;"><i class="glyphicon glyphicon-ok"></i></button>

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
      lists: [],
      pushTashArr: [],
      order: [],
      oldValue: ""
    };
  },
  created() {
    getRankList()
      .then(res => {
        this.lists = res.data.data;
      })
      .catch(err => {});
  },
  updated() {},
  methods: {
    getOldValue(e) {
      this.oldValue = e;
    },
    getPushTask() {
      var arr = [];
      var listArr = [];
      for (let i = 0; i < this.$refs.checkboxes.length; i++) {
        if (this.$refs.checkboxes[i].checked) {
          arr.push(i);
        }
      }
      for (let i = 0; i < arr.length; i++) {
        this.pushTashArr.push(this.lists[arr[i]]);
      }
      let resultarr = [...new Set(this.pushTashArr)];
      this.pushTashArr = resultarr;
      this.setValue();
    },
    addSingle(obj) {
      this.pushTashArr.push(obj);
      let resultarr = [...new Set(this.pushTashArr)];
      this.pushTashArr = resultarr;
      this.setValue();
    },
    removeAll() {
      this.pushTashArr = [];
      this.setValue();
    },
    deleteSingle(obj, i) {
      this.pushTashArr.splice(i, 1);
      this.setValue();
    },
    checkAll() {
      for (let i = 0; i < this.$refs.checkboxes.length; i++) {
        this.$refs.checkboxes[i].checked = true;
      }
    },
    orderDiy(e) {
      var obj = {};
      for (let i = 0; i < this.pushTashArr.length; i++) {
        if (e.target.value > this.pushTashArr.length) {
          e.target.value = this.oldValue + 1;
          return;
        }
        this.order.push(i + 1);
        obj[i] = this.pushTashArr[i];
      }
      var temp = 0;
      temp = obj[this.oldValue];
      obj[this.oldValue] = obj[e.target.value - 1];
      obj[e.target.value - 1] = temp;
      for (let k in obj) {
        this.pushTashArr[k] = obj[k];

        this.order[k] = parseInt(k) + 1;
      }
    },
    pushSort() {
      for (let i = 0; i < this.$refs.taskCheck.length; i++) {
          var obj,temp;
          if(this.$refs.taskCheck[i].checked){
              
          }
      }
    },
    setValue() {
      for (let i = 0; i < this.pushTashArr.length; i++) {
        this.order.push(i + 1);
      }
      let resultarr = [...new Set(this.order)];
      this.order = resultarr;
    }
  }
};
</script>
<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}
.order {
  position: relative;
}
.order .order-input {
  display: block;
  width: 20px;
  height: 20px;
  float: left;
  color: #f60;
}
.range {
  position: relative;
}
.addTask {
  position: absolute;
  top: 0px;
  right: 0px;
}
.task-ctrl button {
  width: 48%;
}
.task-ctrl {
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
