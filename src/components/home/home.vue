<template>
    <div>
        <ul id="home-list">
            <li>
                <router-link :to="{name:'rankList'}">榜单管理</router-link>
            </li>
            <li>
                <router-link :to="{name:'rankList'}">内容管理</router-link>
            </li>
            <li>
                <router-link :to="{name:'rankList'}">审核管理</router-link>
            </li>
            <li>
                <router-link :to="{name:'rankList'}">用户管理</router-link>
            </li>
            <li>
                <router-link :to="{name:'rankList'}">统计管理</router-link>
            </li>
            <li>
                <router-link :to="{name:'rankList'}">数据抓取</router-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>
    #home-list li{
        background-color: #ccc;
        list-style: none;
        float: left;
        margin: 1rem;
    }
    #home-list li a{
        display: block;
        width: 10rem;
        height: 10rem;
    }

</style>


