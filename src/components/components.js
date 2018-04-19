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


