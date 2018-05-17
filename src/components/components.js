//公共组件
import Vue from 'vue';
import DropDown from './common/dropdown/dropdown.vue';
import Modal from './common/modal/modal.vue';
import ConfirmModal from './common/modal/confirm.vue';
import Header from '../components/header/header.vue';
Vue.component('y-header', Header);
Vue.component('y-dropdown', DropDown);
Vue.component('y-modal', Modal);
Vue.component('y-modal-confirm', ConfirmModal);
//二级榜单
import rate from './secondRank/rate';
Vue.component('second-rate',rate);
import editRate from './secondRank/editRate';
Vue.component('editsecond-rate',editRate);
//添加评论
import addDiscuss from './secondRank/addDiscuss';
Vue.component('add-discuss',addDiscuss)
//元素
//指数
import exponent from './element/exponent';
Vue.component('element-exp',exponent);
import editExp from './element/editExp';
Vue.component('edit-exp',editExp);

