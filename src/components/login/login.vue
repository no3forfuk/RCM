<template>
    <div>
        <div class="contanier text-center">
                <img src="" width="200px">
            <p class="h4">欢迎来到RCM</p>
            <div class="input-group">
                <span class="input-group-addon" id="sizing-addon2">用户名</span>
                <input type="text" class="form-control" placeholder="请输入用户名" aria-describedby="sizing-addon2" v-model="username">
            </div>
            <br>
            <div class="input-group">
                <span class="input-group-addon" id="sizing-addon2">密&nbsp;&nbsp;&nbsp;&nbsp;码</span>
                <input type="password" class="form-control" placeholder="请输入密码" aria-describedby="sizing-addon2" v-model="password">
            </div>
            <br>
            <p class="text-left font-small" v-if="tips">请输入正确的账号或密码</p>
            <button type="button" class="btn btn-success" id="login-btn" @click="login">登陆</button>
            <br><br>
            <p class="text-center text-size12">
                <router-link :to="{name:'login'}">忘记密码了</router-link>
                |
                <router-link :to="{name:'register'}">注册一个新账号</router-link>
            </p>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      tips: false
    };
  },
  created() {},
  methods: {
    login() {
      var self = this;
      this.$ajax
        .post("/api/Login", {
          username: self.username,
          password: self.password
        })
        .then(res => {
          //登陆成功
          if (res.data.code == "001") {
            //1.保存token
            sessionStorage.setItem("userId", res.data.token);
            //2.跳转到首页
            self.$store.state.TOKEN = res.data.token;
            self.$store.state.username = res.data.username;
            self.$store.commit("login");
            self.$router.replace("/home");
          }
          if (res.data.code == "002") {
            self.tips = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.contanier {
  width: 300px;
  margin: 0 auto;
}
#login-btn {
  width: 300px;
}
.text-size12 {
  font-size: 0.8em;
}
.font-small {
  font-size: 0.8rem;
  color: rgb(247, 25, 25);
}
</style>