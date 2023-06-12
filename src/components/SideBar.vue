<template>
	<div class="sidebar">
		<img src="@/assets/images/keys.png" alt="keys" />
		<h3 class="sidebar__title">To control the game press the arrows</h3>
		<router-link class="sidebar__link" aria-current="page" to="/">Return to home page</router-link>
		<div class="sidebar__control">
			<CustomButton
				class="sidebar__control-btn"
				id="sidebar-btn-reset-game"
				:handleClick="reset"
			>
				Restart game
			</CustomButton>
			<CustomButton
				class="sidebar__control-btn"
				id="sidebar-btn-reset-record"
				color="yellow"
				:handleClick="resetRecord"
			>
				Reset record
			</CustomButton>
		</div>
		<div class="sidebar__description">feed your snake!</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
import CustomButton from '@/components/shared/CustomButton';

export default {
	name: 'SideBar',
	components: { CustomButton },
	props: {
		reset: {
			type: Function,
			required: true,
		},
	},
	methods: {
		...mapActions({
			setRecord: 'field/setRecord',
		}),
		
		resetRecord() {
			localStorage.removeItem('record');
			this.setRecord(0);
		},
	},
};
</script>

<style lang="scss" scoped>
.sidebar {
	text-align: center;

	&__title {
		font-size: 16px;
    font-weight: 400;
		margin-bottom: 15px;
	}

	& img {
		display: block;
		width: 200px;
		max-width: 100%;
	}

	&__link {
		color: red;
	}

	&__control {
		margin: 15px 0;

		&-btn:first-child {
			margin-bottom: 10px;
		}
	}

	&__description {
		font-family: 'Press Start 2P', cursive;
	}
}
</style>
