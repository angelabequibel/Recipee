import Vue from "vue";

const state = {
  searchParam: '',
  searchResults: [],
  bookmarks: JSON.parse(window.localStorage.getItem('bookmarks')),
};

const getters = {
  getSearchResults: state => state.searchResults,
  getSearchParam: state => state.searchParam,
  getBookmarks: state => state.bookmarks,
};

const actions = {
  async fetchSearchResult({ commit }, searchItem) {
    const APP_ID = 'd9c1bbe2'; // Replace with your actual App ID
    const APP_KEY = 'a6727aeb7573298a0b9be0637db24a5e'; // Replace with your actual App Key

    try {
      const res = await Vue.axios.get(`https://api.edamam.com/search?q=${searchItem}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=20`);
      const results = res.data.hits;
      commit('updateSearchResults', results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  },

  async fetchSearchItem({ commit }, item) {
    commit('updateSearchItem', item);
  },
};

const mutations = {
  updateSearchResults: (state, results) => {
    state.searchResults = results;
  },

  updateSearchItem: (state, item) => {
    state.searchParam = item;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
