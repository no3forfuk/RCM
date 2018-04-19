<template>
    <div class="modal fade confirm" tabindex="-1" role="dialog">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" @click="closeModal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title">确定</h4>
                        </div>
                        <div class="modal-body">
                            <h4>您确定要{{modal.todo}}这个榜单吗？</h4>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" @click="closeModal">取消</button>
                            <button type="button" class="btn btn-primary" @click="confirm(modal.todo)">确定</button>
                        </div>
                        </div>
                    </div>
                
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    closeModal() {
      $(".confirm").modal("hide");
    },
    confirm(flag) {
      console.log(flag);
      if (flag == "添加") {
        this.$ajax
          .post("/submit/add_rank", this.modal.data)
          .then(res => {
              //重新请求数据
            this.tabData.push(this.modal.data);
            this.modal.data = {};
            $(".bs-modal-lg").modal("hide");
            $(".confirm").modal("hide");
          })
          .catch(err => {});
      }
      if (flag == "修改") {
        this.$ajax
          .post("/submit/edit_rank", this.modal.data)
          .then(res => {

            this.modal.data = {};
            $(".bs-modal-lg").modal("hide");
            $(".confirm").modal("hide");
          })
          .catch(err => {});
      }
    }
  },
  props: ["modal", "tabData"]
};
</script>
<style scoped>

</style>