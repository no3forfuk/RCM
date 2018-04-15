
<template>
    <div>
        <div class="panel panel-default">
            <div class="panel-body ">
                <h4 class="title">RCM后台管理</h4>
                <div class="sign-in-out">
                    <button type="btn" class="btn btn-default"  v-if="!isLogin">
                        <router-link :to="{ name: 'login'}">登陆</router-link>
                    </button>
                    <button type="btn" class="btn btn-default"  v-if="!isLogin">
                        <router-link :to="{name:'register'}">注册</router-link>
                    </button>
                    <button type="btn" class="btn btn-default" v-if="isLogin" @click="logout">
                        <router-link :to="{name:'home'}">退出</router-link>
                    </button>
                </div> 
            </div>
            
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    }
  },
  created() {},
  mounted() {},
  methods: {
      logout(){
          this.$store.state.isLogin = false;
          self.$router.push('/login');
      }
  }
};
</script>
<style scoped>
.panel-body {
  padding: 5px;
}
.panel {
  overflow: hidden;
  line-height: 3rem;
}
.title {
  float: left;
  margin-left: 2rem;
}
.sign-in-out {
  float: right;
  margin-right: 2rem;
}
</style>