<template>
    <div>
        <div class="page-header">
        <h3>榜单管理</h3>
    </div>
        <div>
            <table class="table table table-hover table-striped table-bordered">
                <thead>
                    <th class="text-center">ID</th>
                    <th class="text-center">NAME</th>
                    <th class="text-center">DISC</th>
                    <th class="text-center">OPTIONS</th>
                    <th class="text-center">备注</th>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in rankList" :key="index">
                        <td>{{item.id}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.disc}}</td>
                        <td><button type="btn" class="btn btn-default" @click="deleteItem(item,index)">删除</button></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
        rankList:[]
    };
  },
  created() {
      this.$ajax.get('/query/r1').then((res)=>{
          this.rankList = res.data.rankList;
      }).catch(()=>{

      })
  },
  methods: {
      deleteItem(targrt,index){
          this.rankList.splice(index,1)
      }
  }
};
</script>
<style scoped>
</style>
