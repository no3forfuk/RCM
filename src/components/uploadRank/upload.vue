<template>
    <div>
        <div class="page-header header-root">
            <h3 class="header-left">榜单上传</h3>
        </div>
        <button type="button" class="btn download-bg-color font-color btn-lg">模板下载</button>
        <br>
        <br>
        <input type="file" id="file" @change="test" multiple accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
    </div>
</template>
<script>
import XLSX from "xlsx";
export default {
  data() {
    return {};
  },
  methods: {
    test(e) {
      let formData = new FormData();
      let files = e.target.files;
      let fileReader = new FileReader();
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
.file {
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
.file input {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
}
.file:hover {
  background: #aadffd;
  border-color: #78c3f3;
  color: #004974;
  text-decoration: none;
}
</style>
