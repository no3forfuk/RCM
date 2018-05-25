<template>
    <div class="root" style="position: relative;">
        <div class="page-header">
            <h3>添加POST</h3>
        </div>
        <el-select v-model="postTypeValue" placeholder="请选择POST类型">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
        <div class="input-group" style="width: 30%;" v-if="!has_element">
            <input type="text" class="form-control" placeholder="请输入元素名称"
                   aria-describedby="basic-addon2" v-model="keyWords">
            <span class="input-group-addon" id="basic-addon2" @click="searchElementByKeyWord"
                  style="cursor: pointer;"><span
                    class="glyphicon glyphicon-search"></span></span>
        </div>
        <el-input v-model="element_name" 
        v-if="has_element"
        :disabled="true" 
        style="width: 30%;display:block;margin-top:10px;"></el-input>
        <ul class="list-group"
            v-if="ele_is_show"
            style="position: absolute;top: 140px;left: 0;z-index: 1;width: 30%;">
            <li class="list-group-item"
                @click="selectElement(item)"
                v-for="(item,index) in elementList"
                :key="index">{{item.element_name}}
            </li>
        </ul>
        <br>
        <div class="editor">
            <div class="title">
                <span class="glyphicon glyphicon-font" style="margin-left: 20px;font-size: 18px;cursor: pointer;"
                      @click="insertText"></span>
                <span class="glyphicon glyphicon-picture" style="margin-left: 20px;font-size: 18px;cursor: pointer;"
                      @click="insertImg"></span>
                <input type="file" ref="uploadImg" style="opacity: 0;width: 0;height: 0;overflow: hidden"
                       @change="uploadImg">

            </div>
            <div class="container" contentEditable="true" ref="editor">
                <!--<span ref="imgUrl"></span>-->
            </div>

        </div>
        <div class="phone-view">
            <div style="position: relative;">
                <img src="../../static/images/pinglun.png" alt=""
                     style="position: absolute;top: 305px;left: 25px;width: 30px;">
                <img src="../../static/images/post_top.png" alt="" class="post-top">
                <img src="../../static/images/phone.png" alt="">
                <div class="text-img">
                    <p class="text"></p>
                    <img src="" alt="" ref="preview"
                         style="max-width: 275px;margin-left: 44px;margin-bottom: 10px;box-sizing: border-box;border-radius: 4px;">
                    <div style="vertical-align: top;padding-left: 43px;position: relative;">
                        <span style="display: inline-block;width: 20px;height: 20px;background-color: #ccc;border-radius: 50%;"></span>
                        <span style="line-height: 20px;position: absolute;top: 1px;left: 70px;">用户名</span>
                    </div>
                </div>
            </div>
        </div>
        <button type="button" class="btn btn-default" @click="publicPost">发布POST</button>
    </div>
</template>

<script>
    import {detailsText} from './text'
    import {get7NiuToken, addPost, getElementList,getElementDetails} from '../../api/api'

    export default {
        data() {
            return {
                options: [{
                    value: '1',
                    label: '纯文字'
                }, {
                    value: '2',
                    label: '图文'
                }],
                text: {},
                selectValue: '',
                phone: '',
                postText: '',
                postTypeValue: '',
                keyWords: '请输入元素名称',
                elementList: [],
                ele_is_show: false,
                element_id: '',
                has_element:false,
                element_name:''
            }
        },
        created() {
            this.init();
        },
        mounted() {
            const vm = this;
            window.onkeyup = function (e) {
                vm.postText = vm.$refs.editor.innerHTML;
                document.querySelector('.text').innerHTML = vm.$refs.editor.innerHTML;
                var arr = document.querySelectorAll('.text div');
                for (let i = 0; i < arr.length; i++) {
                    arr[i].style.fontSize = '18px';
                    arr[i].style.width = '100%';
                }
            }
        },
        computed: {},
        updated() {

        },
        methods: {
            submitPost(strFileName) {
                var params = {};
                params.post_content = this.$refs.editor.innerHTML;
                params.type = this.postTypeValue;
                if (this.postTypeValue == 2) {
                    params.img = 'http://p8rk87lub.bkt.clouddn.com/' + strFileName;
                }
                params.element_id = this.element_id
                addPost(params).then(res => {
                    if (res.status == 200 && res.data.status_code == 1) {
                        this.$message({
                            message: '添加成功',
                            type: 'success',
                            duration: 1500
                        })
                    }
                }).catch(err => {
                    throw err;
                })
            },
            selectElement(item) {
                this.element_id = item.id;
                this.keyWords = item.element_name;
                this.ele_is_show = false;
            },
            searchElementByKeyWord() {
                var params = {};
                params.like = this.keyWords;
                getElementList(params).then(res => {
                    if (res.status == 200 && res.data.status_code == 1) {
                        this.elementList = res.data.data.data;
                        if (res.data.data.data.length > 0) {
                            this.ele_is_show = true;
                        }
                    } else {
                        return
                    }
                }).catch(err => {
                    throw err;
                })
            },
            insertText() {
                this.$refs.editor.focus();
            },
            inputWords() {
                this.postText = this.$refs.editor.innerText;
            },
            init() {
                this.text = detailsText;
                if(this.$route.query.id){
                    getElementDetails(this.$route.query.id).then(res=>{
                        if(res.status == 200 && res.data.status_code == 1){
                            this.element_name = res.data.data.element_name;
                            this.has_element = true;
                            this.element_id = res.data.data.id;
                        }
                    }).catch(err=>{
                        throw err;
                    })
                }else{
                    this.has_element = false;
                }
                
            },
            insertImg() {
                if (this.postTypeValue == 1) {
                    this.$message({
                        message: '纯文字POST不能插入图片',
                        type: 'warning'
                    })
                    return
                }
                this.$refs.uploadImg.click();
            },
            uploadImg() {
                //定位图片名称
                //预览
                var file = this.$refs.uploadImg.files[0];
                // if (file) {
                //     var fileName_str = '<div style="width:20px;height:20px;background-color: #ccc"><div>';
                //     this.$refs.editor.innerHTML += fileName_str;
                //     this.postText = this.$refs.editor.innerHTML;
                // }

                var reader = new FileReader();
                var self = this;
                reader.onloadend = function () {
                    self.$refs.preview.src = reader.result;
                }
                if (file) {
                    reader.readAsDataURL(file);
                } else {
                    self.$refs.preview.src = "";
                }

            },
            publicPost() {
                if (this.keyWords == '') {
                    this.$message({
                        message: '请选择上级元素',
                        type: 'warning',
                        duration: 2000
                    })
                    return;
                }
                if (this.postTypeValue == 1) {
                    this.submitPost();
                    return;
                }
                if (this.postTypeValue == 2) {
                    get7NiuToken().then(res => {
                        if (res.status == 200 && res.data.status_code == 1) {
                            let file = this.$refs.uploadImg.files[0]
                            let token = res.data.data.qiniu_token;
                            var strFileName = file.name;
                            strFileName = 'post/' + strFileName;
                            let putExtra = {
                                fname: "",
                                params: {},
                                mimeType: [] || null
                            };
                            let config = {
                                region: this.qiniu.region.z2
                            };
                            var self = this;
                            let observer = {
                                next(res) {

                                },
                                error(err) {
                                    throw err;
                                },
                                complete(res) {
                                    self.submitPost(strFileName)

                                }
                            }
                            let observable = this.qiniu.upload(file, strFileName, token, putExtra, config);
                            let subscription = observable.subscribe(observer);
                        }
                    }).catch(err => {
                    })
                    return;
                }
                this.$message({
                    message: '请选择POST类型',
                    type: 'warning',
                    duration: 2000
                })


            }
        }
    }

</script>

<style scoped>

    .text-img {
        width: 334px;
        position: absolute;
        top: 295px;
        left: 16px;
        border-bottom: 1px solid #d3d3d3;
        overflow-x: hidden;
        overflow-y: auto;
        height: 385px;
    }

    .text-img > .text {
        margin-top: 10px;
        padding-left: 45px;
        padding-right: 10px;
        margin-bottom: 5px;

    }

    .root {
        position: relative;
    }

    .post-top {
        width: 334px;
        position: absolute;
        top: 100px;
        left: 16px;
    }

    .phone-view {
        position: absolute;
        top: -44px;
        left: 450px;
    }

    .editor {
        width: 300px;
        height: 400px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .editor > .title {
        height: 30px;
        line-height: 30px;
        width: 100%;
        border-bottom: 1px solid #ccc;
        font-size: 0;
    }

    .container {
        width: 100%;
        height: 370px;
        overflow-y: auto;
    }
</style>