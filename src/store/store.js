import { loginByName } from '../api/api'


export const state = {
    isLogin: false,
    username: '',
    token: ''
};

export const mutations = {
    TOKEN: (state, token) => {
        state.token = token
    },
    ISLOGIN: (state) => {
        state.isLogin = !state.isLogin
    }

};
export const actions = {
    loginByName({ commit }, parms) {
        return new Promise((resolve, reject) => {
            loginByName(parms).then((res) => {
                sessionStorage.setItem("X-Auth-Token", res.data.token);
                commit('TOKEN', res.data.token);
                commit('ISLOGIN');
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },
    logout({ commit }, parms) {
        return new Promise((resolve, reject) => {
            sessionStorage.removeItem("X-Auth-Token");
            commit('TOKEN', null);
            resolve();
        })
    },

}
export const getters = {
    islogin(state) {
        return state.isLogin
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
};