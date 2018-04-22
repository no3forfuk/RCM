<template>
    <div>
        <div class="page-header header-root">
            <h3 class="header-left">榜单上传</h3>
        </div>
        <button type="button" class="btn download-bg-color font-color btn-lg">模板下载</button>
        <br>
        <br>
        <input type="file" ref="file" @change="uploadfile" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
		<button type="button" class="btn btn-default" @click="upload_rankData">确定上传</button>
    </div>
</template>
<script>
import XLSX from "xlsx";
export default {
  data() {
    return {
      tableData: [],
      rankDataArr: []
    };
  },
  mounted() {},
  methods: {
    test() {
      return this.rankDataArr;
    },
    upload_rankData() {
      return new Promise((resolve, reject) => {
        this.$axios
          .importRank(this.rankDataArr)
          .then(res => {
            this.$router.replace("/home");
          })
          .catch(err => {});
      });
    },
    aa() {
      
    },
    uploadfile(e) {
      const self = this;
      let formData = new FormData();
      console.log(e.target);
      console.log(self.$refs.file.value);
      let file = self.$refs.file.files[0];
      let reader = new FileReader();
      let workbook;
      reader.onload = function(e) {
        let data = e.target.result;
        let wb = XLSX.read(data, {
          type: "binary"
        });
        var rankArr = [];
        var fileData = [];
        for (let j = 0; j < wb.SheetNames.length; j++) {
          let flag = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[j]]);
          fileData = fileData.concat(flag);
        }
        for (let i = 0; i < fileData.length; i++) {
          var newRank = {};
          if (fileData[i]["榜单"]) {
            newRank.ranking_name = fileData[i]["榜单"] || "";
            newRank.ranking_desc = fileData[i]["榜单详情"] || "";
            rankArr.push(newRank);
          }
        }
        self.rankDataArr = rankArr;
      };
      reader.readAsBinaryString(file);
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
.upload-style {
  background-color: #ccc;
}
#file {
  position: relative;
  display: inline-block;
  background: #d0eeff;
  border: 1px solid #99d3f5;
  border-radius: 4px;
  padding: 4px 12px;
  overflow: hidden;
  color: #1e88c7;
  text-decoration: none;
  text-indent: 0;
  line-height: 20px;
}
</style>
