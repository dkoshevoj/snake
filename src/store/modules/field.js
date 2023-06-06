import * as types from '../mutation-types';

export const fieldModule = {
	state: () => ({
		fieldWidth: 15,
		blocksCollection: null,
		record: 0,
		velocity: 3,
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
		[types.SET_VELOCITY](state, speed) {
			state.velocity = speed;
		},
	},

	getters: {
		fieldWidth: state => state.fieldWidth,
		blocksCollection: state => state.blocksCollection,
		record: state => (state.record ? state.record : 'There is no high score'),
		velocity: state => state.velocity,
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
		
		setVelocity({ commit }, speed) {
			commit(types.SET_VELOCITY, speed);
		},
	},

	namespaced: true,
};
