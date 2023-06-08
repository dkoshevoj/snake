<template>
	<Modal v-if="isShowModal" title="Game over" :handleClick="closeModal" :keyEventListener="keyboardEventHandler">
		<div class="dialog">
			<p class="dialog__text">
				Geme over. Your score: {{ score }}. Do you want restart game?
				<span>Your snake isn’t fat enough</span>
			</p>
			<div class="dialog__btn">
				<Button id="game-over-dialog-btn-dark" :handleClick="closeModal" color="dark">Cancel</Button>
				<Button id="game-over-dialog-btn-yellow" :handleClick="restartGame" color="yellow">Restart</Button>
			</div>
		</div>
	</Modal>
</template>

<script>
import Modal from '@/components/shared/ModalWindow';
import Button from '@/components/shared/CustomButton';

export default {
	name: 'GameOverDialog',
	components: {
		Modal,
		Button,
	},
	props: {
		isShowModal: Boolean,
		closeModal: Function,
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

		span {
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
