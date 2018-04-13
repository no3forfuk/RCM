
<template>
    <div>
        <div class="panel panel-default">
            <div class="panel-body ">
                <h4 class="title">RCM后台管理</h4>
                <div class="sign-in-out">
                    <button type="btn" class="btn btn-default">
                        <router-link :to="{ name: 'login'}">登陆</router-link>
                    </button>
                    <button type="btn" class="btn btn-default">
                        <router-link :to="{name:'register'}">注册</router-link>
                    </button>
                </div> 
            </div>
            
        </div>
    </div>
</template>
<script>
    
</script>
<style scoped>
    .panel-body{
        padding: 5px;
    }
    .panel{
        overflow: hidden;
        line-height: 3rem;
    }
    .title{
        float: left;
        margin-left: 2rem;
    }
    .sign-in-out{
        float: right;
        margin-right: 2rem;
    }
</style>