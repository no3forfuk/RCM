
<template>
    <div>
        <div class="panel panel-default">
            <div class="panel-body ">
                <h4 class="title"><router-link :to="{path:'/login'}">RCM后台管理</router-link></h4>
                <div class="sign-in-out">
                    <button type="button" class="btn btn-default"  v-if="!isLogin">
                        <router-link :to="{path:'/login', name: 'login'}">登陆</router-link>
                    </button>
                    <button type="button" class="btn btn-default"  v-if="!isLogin">
                        <router-link :to="{path:'/register',name:'register'}">注册</router-link>
                    </button>
                    <button type="button" class="btn btn-default" v-if="isLogin" @click="logout">
                        <router-link :to="{name:'login'}">退出</router-link>
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
  created() {
      if(!sessionStorage.getItem('userId')){
          this.$store.state.isLogin = false;
      }
  },
  mounted() {},
  methods: {
    logout() {
      this.$store.commit('logout');
      this.$router.go("/login");
    }
  }
};
</script>
<style scoped>
.sign-in-out a{
    display: block;
}
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