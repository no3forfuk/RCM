<template>
    <div>
        <y-header></y-header>
        <div class="root-box">
            <div class="left-box">
                <ul class="list-group">
                    <router-link :to="{name:'statistics'}">统计</router-link>
                    <li class="list-group-item" v-for="(item,index) in sidebar" :key="index">
                        <a class="list-title" href="javascript:;">{{item.name}}</a>
                        <!--@click="toggleHeight($event,index)"-->
                        <ul class="inner" ref="subul">
                            <li v-for="(list,index) in item.menu" :key="index">
                                <router-link :to="{name:list.route_name}" style="color:#999;">{{list.name}}
                                </router-link>
                            </li>
                        </ul>
                    </li>
                </ul>
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
    import {getSideBar} from "../../api/api.js";

    export default {
        data() {
            return {
                sidebar: [],
                isShow: false,
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
            },
            toggleHeight(e, index) {
                if (this.$refs.subul[index].style.display == 'block') {
                    this.$refs.subul[index].style.display = 'none';
                    return;
                }
                for (let i = 0; i < this.$refs.subul.length; i++) {
                    this.$refs.subul[i].style.display = 'none';
                }
                if (this.$refs.subul[index].style.display == 'none') {
                    this.$refs.subul[index].style.display = 'block';
                }
            }
        }
    };
</script>
<style scoped>
    .inner a {
        display: block;
        width: 100%;
    }

    .list-title {
        display: block;
        width: 100%;
        cursor: pointer;
    }

    .inner li {
        padding: 5px 15px;
        border-top: 1px solid #ccc;
    }

    .inner {
        display: block;
        transition: all 1s;
        height: auto;
        margin-top: 10px;
        padding-left: 0;
    }

    li {
        list-style: none;
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


