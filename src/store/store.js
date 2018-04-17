
export const state = {
    isLogin: false
};
export const mutations = {
    login(state){
        state.isLogin = !state.isLogin;
    },
    logout(state){
        state.isLogin = !state.isLogin;
    }
};
export default {
    state,
    mutations,
};