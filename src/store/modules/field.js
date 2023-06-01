import * as types from '../mutation-types';

export const fieldModule = {
	state: () => ({
		fieldWidth: 15,
		blocksCollection: null,
		record: 0,
	}),

	mutations: {
		[types.SET_FIELD_WIDTH](state, width) {
			state.fieldWidth = width;
		},
		[types.SET_COLLECTION](state, data) {
			state.blocksCollection = data;
		},
		[types.SET_RECORD](state, record) {
			state.record = record;
		},
	},

	getters: {
		fieldWidth: state => state.fieldWidth,
		blocksCollection: state => state.blocksCollection,
		record: state => (state.record ? state.record : 'There is no high score'),
	},

	actions: {
		setFieldWidth({ commit }, data) {
			commit(types.SET_FIELD_WIDTH, data);
		},

		setCollection({ commit }, data) {
			commit(types.SET_COLLECTION, data);
		},
		setRecord({ commit }, record) {
			commit(types.SET_RECORD, record);
		},
	},

	namespaced: true,
};
