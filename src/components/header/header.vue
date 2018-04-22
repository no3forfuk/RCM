
<template>
    <div>
        <div class="panel panel-default">
            <div class="panel-body ">
                <h4 class="title"><router-link :to="{path:'/home'}">RCM后台管理</router-link></h4>
                <div class="sign-in-out">
                    
                    <button type="button" class="btn btn-default"  v-if="!isLogin">
                        <router-link :to="{path:'/login', name: 'login'}">登陆</router-link>
                    </button>
                    <button type="button" class="btn btn-default"  v-if="!isLogin">
                        <router-link :to="{path:'/register',name:'register'}">注册</router-link>
                    </button>
                    <div v-if="isLogin">
                      <span>{{username}}</span>
                    <button type="button" class="btn btn-default" @click="logout">
                        <router-link :to="{name:'login'}">退出</router-link>
                    </button>
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
      username: ""
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    }
  },
  created() {
    
  },
  mounted() {},
  methods: {
    logout() {
      this.$store
        .dispatch("logout")
        .then(res => {
          this.isLogin = false;
          this.$router.go("/login");
        })
        .catch(err => {});
    }
  }
};
</script>
<style scoped>
.sign-in-out a {
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