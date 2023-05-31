import { createStore } from 'vuex';
import { fieldModule } from '@/store/modules/field';

export default createStore({
	modules: {
		field: fieldModule,
	},
});
