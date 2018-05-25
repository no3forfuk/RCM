<template>
    <div>
        <div class="panel panel-default">
            <div class="panel-body ">
                <h4 class="title">
                    <router-link :to="{path:'/home'}">RCM后台管理</router-link>
                </h4>
                <div class="sign-in-out">

                    <button type="button" class="btn btn-default" v-if="!isLogin">
                        <router-link :to="{name: 'login'}">登陆</router-link>
                    </button>
                    <button type="button" class="btn btn-default" v-if="!isLogin">
                        <router-link :to="{name:'register'}">注册</router-link>
                    </button>
                    <div v-if="isLogin">
                        <span>{{username}}</span>
                        <button type="button" class="btn btn-default" @click="logout">
                            退出
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
                return sessionStorage.getItem('X-Auth-Token');
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
            logout() {
                sessionStorage.removeItem('X-Auth-Token');
                this.$router.replace("/login");
            }
        },
        watch: {

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