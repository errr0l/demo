import { resetRouter } from "@/router";
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
    },
    SET_USER_AVATAR(state, avatar) {
        state.user.avatar = avatar;
        localStorage.setItem(getKey('user'), JSON.stringify(state.user));
    }
};

const actions = {
    saveLoginInfo({ commit }, payload) {
        const { user, accessToken, refreshToken } = payload;
        commit("SET_USER", { user });
        commit("SET_ACCESS_TOKEN", { accessToken });
        commit("SET_REFRESH_TOKEN", { refreshToken });
    },
    logout({ commit }) {
        resetRouter();
        commit("SET_USER", { user: user });
        commit("SET_ACCESS_TOKEN", { accessToken: "" });
        commit("SET_REFRESH_TOKEN", { refreshToken: "" });
        commit("permission/setRoutes", { routes: [] }, { root: true });
    },
    saveAccountInfo({ commit }, payload) {
        commit("SET_USER", payload);
    },
    saveAccountAvatar({ commit }, { avatar }) {
        commit("SET_USER_AVATAR", avatar);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
