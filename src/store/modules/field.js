import * as types from '../mutation-types';

export const fieldModule = {
	state: () => ({
		fieldWidth: 15,
		blocksCollection: null,
	}),
	mutations: {
		[types.SET_FIELD_WIDTH](state, width) {
			state.fieldWidth = width;
		},
		[types.SET_COLLECTION](state, data) {
			state.blocksCollection = data;
		},
	},
	getters: {
		fieldWidth: state => state.fieldWidth,
		blocksCollection: state => state.blocksCollection,
	},
	actions: {
		setFieldWidth({ commit }, data) {
			commit(types.SET_FIELD_WIDTH, data);
		},

		setCollection({ commit }, data) {
			commit(types.SET_COLLECTION, data);
		},
	},
	namespaced: true,
};
