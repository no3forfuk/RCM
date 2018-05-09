<template>
    <div>
        <div class="page-header header-root">
            <h3 class="header-left">榜单上传</h3>
        </div>
        <button type="button" class="btn download-bg-color font-color btn-lg">模板下载</button>
        <br>
        <br>
        <input type="file" ref="file" @change="uploadfile"
               accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">

        <span style="color:red;display:block" class="icon-hand"
              v-if="hasFile"><span class="glyphicon glyphicon-hand-up"></span> 请选择文件</span>

        <button type="button" class="btn btn-default" style="marginTop:10px;" @click="upload_rankData">确定上传</button>
        <div class="modal fade" tabindex="-1" role="dialog" id="uploadModal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                        <h2 class="modal-title">{{success}}</h2>
                    </div>
                    <div class="modal-body text-center">
                        <button type="button" class="btn btn-default" data-dismiss="modal">点击继续上传</button>
                        <button type="button" class="btn btn-primary" @click="uploadSuccess">
                            查看上传结果
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import XLSX from "xlsx";
    import {importRank} from '../../api/api'

    export default {
        data() {
            return {
                tableData: [],
                rankDataArr: [],
                hasFile: '',
                success: '上传成功'
            };
        },
        mounted() {
        },
        computed: {},
        methods: {
            uploadSuccess() {
                $('#uploadModal').modal('hide');
                this.$router.replace('/home');
            },
            upload_rankData() {
                if (!this.$refs.file.files[0]) {
                    this.hasFile = true;
                } else {
                    return new Promise((resolve, reject) => {
                        importRank(this.rankDataArr)
                            .then(res => {
                                $('#uploadModal').modal('show');
                            })
                        resolve()
                            .catch(err => {
                                reject(false)
                            });
                    });
                }

            },
            uploadfile(e) {
                this.hasFile = false;
                const self = this;
                let file = self.$refs.file.files[0];
                if (!file) {
                    return
                } else {
                    let reader = new FileReader();
                    reader.onload = function (e) {
                        let data = e.target.result;
                        let wb = XLSX.read(data, {
                            type: "binary"
                        });

                        var fileData = [];
                        for (let j = 0; j < wb.SheetNames.length; j++) {
                            let flag = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[j]]);
                            fileData = fileData.concat(flag);
                        }
                        var rank1Arr = [];
                        var count1 = 0;
                        var count2 = 0;
                        var count3 = 0;
                        for (let i = 0; i < fileData.length; i++) {
                            if (fileData[i]["一级榜单"]) {
                                count2 = 0;
                                var rank2Arr = [];
                                var rank1Obj = {};
                                rank1Obj.ranking_name = fileData[i]["一级榜单"] || '';
                                rank1Obj.ranking_desc = fileData[i]["一级榜单详情"] || '';
                                rank1Obj.ranking_level = '1';
                                rank1Arr.push(rank1Obj);
                            }
                            if (fileData[i]["二级榜单"]) {
                                count3 = 0
                                var rank2Obj = {};
                                var elementArr = [];
                                rank2Obj.ranking_name = fileData[i]["二级榜单"] || "";
                                rank2Obj.ranking_desc = fileData[i]["二级榜单详情"] || "";
                                rank2Obj.ranking_level = '2';
                                rank2Arr.push(rank2Obj);
                            }
                            if (fileData[i]["一级榜单"] && fileData[i]["二级榜单"]) {
                                rank1Arr[count1].data = rank2Arr;
                                count1++;
                            }
                            if (fileData[i]['元素']) {
                                var elementObj = {};
                                var postArr = [];
                                elementObj.element_name = fileData[i]['元素'] || "";
                                elementObj.element_desc = fileData[i]['元素详情'] || "";
                                elementArr.push(elementObj);
                            }
                            if (fileData[i]["二级榜单"] && fileData[i]['元素']) {
                                rank2Arr[count2].data = elementArr;
                                count2++;
                            }
                            if (fileData[i]['post']) {
                                var postObj = {};
                                var str = fileData[i]['post'];
                                str = str.substring(0, 10)
                                postObj.post_name = str || "";
                                postObj.post_content = fileData[i]['post'] || "";
                                postArr.push(postObj);
                            }
                            if (fileData[i]['元素'] && fileData[i]['post']) {
                                elementArr[count3].data = postArr;
                                count3++;
                            }
                        }
                        self.rankDataArr = rank1Arr;
                    };
                    reader.readAsBinaryString(file);
                }

            }
        }
    };
</script>
<style scoped>
    .download-bg-color {
        background-color: rgb(111, 84, 153);
    }

    .font-color {
        color: #eee;
    }

    .icon-hand {
        margin-top: 5px;
    }

    .icon-hand > span {
        font-size: 18px;
        margin-left: 20px;
        margin-right: 5px;
    }
</style>
