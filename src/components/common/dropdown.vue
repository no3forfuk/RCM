<template>
    <div class="root">
        <div class="text-center dropdown">
            <div class="title">{{title}}</div>
            <a class="dropdown-toggle ctrl" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="caret"></span>
                <span class="sr-only">Toggle Dropdown</span>
            </a>
            <ul class="dropdown-menu select-menu dropdown-menu-right" :style="{marginTop:dropdown.position}">
                <li v-for="(item,index) in dropdown.menu" :key="index" @click="select($event)"><a href="javascript:;">{{item}}</a></li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      title: ""
    };
  },
  created() {
    this.title = this.dropdown.title;
  },
  methods: {
    select(e) {
      this.title = e.target.innerText;
    }
  },
  props: ["dropdown"]
};
</script>
<style scoped>
.root {
  width: 100%;
}
.title {
  width: 80%;
  height: 100%;
  float: left;
  padding-right: 1rem;
}
.ctrl {
  display: block;
  width: 18%;
  height: 100%;
  float: right;
}
</style>
