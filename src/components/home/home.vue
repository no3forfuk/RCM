<template>
    <div>
        <div class="root-box">
            <div class="left-box">
                <div class="list-group">
                    <router-link :to="{name:'rankList'}" class="list-group-item" active-class="active">榜单管理</router-link>
                    <router-link :to="{name:'pushTask'}" class="list-group-item" active-class="active">推送任务</router-link>
                    <router-link :to="{name:'elementList'}" class="list-group-item" active-class="active">元素列表</router-link>
                    <router-link :to="{name:'postList'}" class="list-group-item" active-class="active">post列表</router-link>
                    <router-link :to="{name:'levelCtrl'}" class="list-group-item" active-class="active">上下级管理</router-link>
                </div>
            </div>
            <div class="right-box">
                <div class="panel panel-default">
                    <div class="panel-body toggle-box">
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      
    }
  },
  created(){

  }
};
</script>
<style scoped>
.root-box {
  width: 98%;
  margin: 0 auto;
}

.left-box {
  width: 15%;
  float: left;
}
.right-box {
  width: 84%;
  float: left;
}
</style>


