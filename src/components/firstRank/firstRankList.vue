<template>
    <div>
        <div class="page-header header-root">
            <h3 class="header-left">一级榜单管理</h3>
            <div class="header-right">
                <div class="input-group search-box">
                    <input type="text" class="form-control" placeholder="Recipient's username"
                           aria-describedby="basic-addon2">
                    <span class="input-group-addon" id="basic-addon2"><span
                            class="glyphicon glyphicon-search"></span></span>
                </div>
                <router-link :to="{name:'addRank',query:{ranking_level:1}}">
                    <button class="btn btn-default add-ranklist">添加榜单
                    </button>
                </router-link>
                <button class="btn btn-default">
                    <router-link :to="{name:'upload'}">导入榜单</router-link>
                </button>
            </div>
        </div>
        <div style="maxHeight:500px;overflow:auto;">
            <table class="table table table-hover table-striped table-bordered">
                <thead>
                <th class="text-center">序号</th>
                <th class="text-center">榜单名称</th>
                <th class="text-center">详情</th>
                <th class="text-center">操作人</th>
                <th class="text-center">最后编辑时间</th>
                <th class="text-center">
                    <y-dropdown :dropdown="starmark"></y-dropdown>
                </th>
                <th class="text-center">
                    操作
                </th>
                </thead>
                <tbody class="text-left">
                <tr v-for="(item,index) in rankList" :key="index">
                    <td>{{index+1}}</td>
                    <td>
                        <router-link :to="{name:'firstRankDetails',query:{id:item.id}}">{{item.ranking_name}}
                        </router-link>
                    </td>
                    <td style="max-width:300px;"><p class="td-disc">{{item.ranking_desc}}</p></td>
                    <td>{{item.admin.name}}</td>
                    <td>{{item.updated_at}}</td>
                    <td>{{item.star}}</td>
                    <td>
                        <div class="btn-group" role="group">
                            <button type="button" class="btn btn-info" data-toggle="modal" data-target=".bs-modal-lg"
                                    @click="editRank($event,item)">编辑
                            </button>
                            <button type="button" class="btn"
                                    :class="{'btn-success':!item.is_hide,'btn-danger':item.is_hide}"
                                    @click="showOrHidden($event,item)">
                                {{item.is_hide ==
                                1?'隐藏':'显示'}}
                            </button>
                            <button type="button" class="btn btn-warning"
                                    @click="addPushTask($event,item)">推送
                            </button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>

</template>
<script>
    import {getSecondRank, getFirstRankList, hideFirstRank, addFirstRank, editFirstRank} from '../../api/api'

    export default {
        data() {
            return {
                rankList: [],
                isShow: '',
                secondRankLsit: [],
                page: 1,
                addSubList: [],
                addFirstParams: {
                    ranking_name: '',
                    ranking_level: 1,
                    ranking_desc: '',
                    id: '',
                    data: []
                },
                doOperate: '添加'

            }
        },
        created() {

            const vm = this;
            //获取首页榜列表
            this.getRankList();
            this.isShow = "隐藏";

            //下拉框构造函数
            class Dropdown {
                constructor(title, lists, position) {
                    this.title = title;
                    this.menu = lists;
                    this.position = position;
                }
            }

            //构建星标数据
            this.starmark = new Dropdown("星标", ["最热", "最新"], "20px");
            //构建级别数据
            this.rankLv = new Dropdown("一级榜单", ["一级榜单", "二级榜单"], "20px");


        },
        methods: {
            //add or edit
            operate(e) {
                this.doOperate = '添加'
            },

            //获取一级榜单数据
            getRankList() {
                return new Promise((resolve, reject) => {
                    getFirstRankList()
                        .then(res => {
                            this.rankList = res.data.data.data;
                        })
                        .catch(err => {
                        });
                });
            },

            //编辑榜单
            editRank(e, element) {
                this.doOperate = '编辑';
                this.addFirstParams.ranking_name = element.ranking_name;
                this.addFirstParams.ranking_desc = element.ranking_desc;
                this.addFirstParams.id = element.id;
            },
            setRankLv(e) {
                this.rankLv = e.target.innerText;
            },
            //显示隐藏
            showOrHidden(e, item) {
                var params = 0;
                if (e.target.innerText == '隐藏') {
                    params = 1;
                    return new Promise((resolve, reject) => {
                        hideFirstRank(params).then(res => {
                            alert('隐藏成功')
                            e.target.innerText = '显示';
                            item.is_hide = false;
                        }).catch(err => {
                        })
                    })
                }
                if (e.target.innerText == '显示') {
                    params = 0;
                    return new Promise((resolve, reject) => {
                        hideFirstRank(params).then(res => {
                            alert('显示成功')
                            e.target.innerText = '隐藏';
                            item.is_hide = true;
                        }).catch(err => {
                        })
                    })
                }
            },
            //获取一级级榜单列表
            getSecondRankList(params) {
                return new Promise((resolve, reject) => {
                    getSecondRank(params).then(res => {
                            if (res.data.status_code == 1 && res.data.data.data.length > 0) {
                                this.secondRankLsit = res.data.data.data;
                            } else {
                                reject();
                            }
                        }
                    ).catch(err => {
                    })
                })
            },
            //上一页
            prePage(page) {
                if (page == 1) {
                    return;
                } else {
                    page--;
                    this.page = page;
                    this.getSecondRankList(this.page);
                }
            },
            //下一页
            nextPage(page) {
                page++;
                this.page = page;
                this.getSecondRankList(this.page);
            },
            //添加元素
            add_subRank(index) {

                this.addSubList.push(this.secondRankLsit[index]);
                this.addSubList = [...new Set(this.addSubList)];
            },
            //删除元素
            deleteSubList(index) {
                this.addSubList.splice(index, 1);
            },
            //添加推送
            addPushTask(e, target) {
                e.target.disabled = true;
                e.target.innerText = '已推送';
                const str = localStorage.getItem('pushTaskArr');
                const arr = JSON.parse(str);
                arr.push(target);
                JSON.stringify(arr);
                localStorage.setItem('pushTaskArr', JSON.stringify(arr));
            }

        },
        computed: {}
    };
</script>
<style scoped>
    .header-root {
        position: relative;
    }

    .header-right {
        position: absolute;
        top: 0px;
        left: 180px;
    }

    .search-box {
        width: 60%;
        float: left;
    }

    .add-ranklist {
        margin: 0 1rem;
    }

    .td-disc {
        max-width: 600px;
        max-height: 50px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
</style>
