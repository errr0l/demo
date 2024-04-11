// import { resetRouter } from "@/router";
import { getPrefixForStorage } from "@/utils/common";

const { VUE_APP_PREFIX = "" } = process.env;
const prefix = getPrefixForStorage(VUE_APP_PREFIX);

function getKey(key) {
    return prefix + key;
}

const accessToken = localStorage.getItem(getKey('accessToken'));
const refreshToken = localStorage.getItem(getKey("refreshToken"));
const userJson = localStorage.getItem(getKey('user'));

let user = {
    username: "",
    avatar: ""
};
if (userJson) {
    user = JSON.parse(userJson);
}

const getDefaultState = () => {
    return {
        refreshToken: refreshToken,
        accessToken: accessToken,
        name: user.username,
        avatar: user.avatar,
        user: user
    };
}

const state = getDefaultState();

const mutations = {
    SET_USER(state, info) {
        const { user } = info;
        state.user = user;
        localStorage.setItem(getKey('user'), JSON.stringify(user));
    },
    SET_REFRESH_TOKEN(state, payload) {
        const { refreshToken } = payload;
        state.refreshToken = refreshToken;
        localStorage.setItem(getKey('refreshToken'), refreshToken);
    },
    SET_ACCESS_TOKEN(state, payload) {
        const { accessToken } = payload;
        state.accessToken = accessToken;
        localStorage.setItem(getKey('accessToken'), accessToken);
    }
};

const actions = {
    saveLoginInfo({ commit }, payload) {
        const { user, accessToken, refreshToken } = payload;
        commit("SET_USER", { user });
        commit("SET_ACCESS_TOKEN", { accessToken });
        commit("SET_REFRESH_TOKEN", { refreshToken });
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
