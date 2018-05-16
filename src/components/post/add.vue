<template>
    <div class="root">
        <div class="page-header">
            <h3>添加POST</h3>
        </div>
        <div class="editor">
            <div class="title">
                <span class="glyphicon glyphicon-picture" style="margin-left: 20px;font-size: 18px;cursor: pointer;"
                      @click="insertImg"></span>
                <input type="file" ref="uploadImg" style="opacity: 0;width: 0;height: 0;overflow: hidden"
                       @change="uploadImg">

            </div>
            <div class="container" contentEditable="true" ref="editor">
                <span ref="imgUrl"></span>
            </div>
        </div>
        <div class="phone-view">
            <div style="position: relative;">
                <img src="../../static/images/pinglun.png" alt=""
                     style="position: absolute;top: 305px;left: 25px;width: 30px;">
                <img src="../../static/images/post_top.png" alt="" class="post-top">
                <img src="../../static/images/phone.png" alt="">
                <div class="text-img">
                    <p class="text">乳白色乳霜质地，延展性极佳，淡淡的清香乳白色乳霜质地，延展性极佳，淡淡的清香乳白色乳霜质地，延展性极佳，淡淡的清香</p>
                    <img src="" alt="" ref="preview" style="max-width: 275px;margin-left: 44px;margin-bottom: 10px;box-sizing: border-box;border-radius: 4px;">
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
    import {get7NiuToken} from '../../api/api'

    export default {
        data() {
            return {
                text: {},
                selectValue: '',
                phone: ''
            }
        },
        created() {
            this.init();
        },
        mounted() {

        },
        computed: {

        },
        updated() {

        },
        methods: {
            init() {
                this.text = detailsText;
            },
            insertImg() {
                this.$refs.uploadImg.click();
            },
            uploadImg() {
                this.$refs.imgUrl.innerText = this.$refs.uploadImg.value;
                //预览
                var file = this.$refs.uploadImg.files[0];
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
                get7NiuToken().then(res => {
                    if (res.status == 200 && res.data.status_code == 1) {
                        let file = this.$refs.uploadImg.files[0]
                        let token = res.data.data.qiniu_token;

                        let key = this.$refs.imgUrl.innerText;
                        var strFileName = key.replace(/^.+?\\([^\\]+?)(\.[^\.\\]*?)?$/gi, "$1");
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
                                console.log('http://p8rk87lub.bkt.clouddn.com/' + strFileName);
                            },
                            error(err) {
                                throw err
                            },
                            complete(res) {
                                alert('发布成功')
                            }
                        }
                        let observable = this.qiniu.upload(file, strFileName, token, putExtra, config);
                        let subscription = observable.subscribe(observer);
                    }

                }).catch(err => {
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
        overflow: hidden;
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
    }

    .container {
        width: 100%;
        height: 370px;
    }
</style>