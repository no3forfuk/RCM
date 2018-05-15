<template>
    <div class="root">
        <div class="page-header">
            <h3>添加POST</h3>
        </div>
        <div class="editor">
            <div class="title">
                <span class="iconfont icon-jiesuo" style="margin-left: 20px;font-size: 18px;cursor: pointer;"
                      @click="insertImg"></span>
                <input type="file" ref="uploadImg" style="opacity: 0;width: 0;height: 0;overflow: hidden"
                       @change="uploadImg">

            </div>
            <div class="container" contentEditable="true" ref="editor">
                <span ref="imgUrl"></span>
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
                phone: '',
            }
        },
        created() {
            this.init();
        },
        mounted() {

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
    .root {
        position: relative;
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