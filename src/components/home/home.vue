<template>
    <div>
        <div class="root-box">
            <div class="left-box">
                <div class="list-group" v-for="(item,index) in sidebar" :key="index">
                    <router-link  :to="{name:item.route_name}"
                                 class="list-group-item">{{item.name}}
                    </router-link>
                    <ul class="list-group">
                        <li class="list-group-item">Cras justo odio</li>
                        <li class="list-group-item">Dapibus ac facilisis in</li>
                        <li class="list-group-item">Morbi leo risus</li>
                        <li class="list-group-item">Porta ac consectetur ac</li>
                        <li class="list-group-item">Vestibulum at eros</li>
                    </ul>
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
import { getSideBar } from "../../api/api.js";

export default {
  data() {
    return {
      sidebar: []
    };
  },
  created() {
    //获取侧边栏
    this.getSideBar();
  },
  methods: {
    getSideBar() {
      return new Promise((resolve, reject) => {
        getSideBar()
          .then(res => {
            this.sidebar = res.data.data;
          })
          .catch(err => {
            reject(false);
          });
      });
    }
  }
};
</script>
<style scoped>
.list-group {
  margin-bottom: 0px;
}
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


