<template>
	<ModalWindow v-if="isShowModal" title="Game over" :handleClick="closeModal" :keyEventListener="keyboardEventHandler">
		<div class="dialog">
			<p class="dialog__text">
				Game over. <span class="dialog__text-substring">Your score: {{ score }}</span>. Do you want to restart the game?
				<span class="dialog__text-substring">Your snake isn't fat enough</span>
			</p>
			<div class="dialog__btn">
				<CustomButton
					id="game-over-dialog-btn-dark"
					color="dark"
					:handleClick="closeModal"
				>
					Cancel
				</CustomButton>
				<CustomButton
					id="game-over-dialog-btn-yellow"
					color="yellow"
					:handleClick="restartGame"
				>
					Restart
				</CustomButton>
			</div>
		</div>
	</ModalWindow>
</template>

<script>
import ModalWindow from '@/components/shared/ModalWindow';
import CustomButton from '@/components/shared/CustomButton';

export default {
	name: 'GameOverDialog',
	components: {
		ModalWindow,
		CustomButton,
	},
	props: {
		isShowModal: {
			type: Boolean,
			required: true,
		},
		closeModal: {
			type: Function,
			required: true,
		},
		restartGame: Function,
		score: Number,
	},

	methods: {
		keyboardEventHandler(event) {
			switch (event.key) {
				case 'Enter':
					this.restartGame();
					break;
				case 'Escape':
					this.closeModal();
					break;
				default:
					return false;
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.dialog {
	padding: 0 90px 56px 90px;

	&__text {
		line-height: 2;
		font-size: 16px;
		margin-bottom: 30px;
		text-align: center;

		&-substring {
			text-decoration: underline;
		}
	}

	&__btn {
		text-align: center;
		padding: 0 26px;
		margin-top: 35px;

		button {
			margin: 0 12px;
		}
	}
}
</style>
