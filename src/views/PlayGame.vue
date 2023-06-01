<template>
	<div class="wraper">
		<div class="panel">
			<div class="panel__left">
				<h1>GAME</h1>
				<game-field />
				<score-bar :score="score" :record="record" />
			</div>
			<div class="panel__right">
				<side-bar :reset="restartGame" />
			</div>
		</div>
		<game-over-dialog
			:isShowModal="isOpenModal"
			:closeModal="() => (isOpenModal = false)"
			:restartGame="restartGame"
			:score="score"
		/>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
// Components
import GameField from '@/components/GameField.vue';
import GameOverDialog from '@/components/GameOverDialog';
import ScoreBar from '@/components/ScoreBar';
import SideBar from '@/components/SideBar.vue';

export default {
	name: 'PlayGame',
	components: { GameField, GameOverDialog, ScoreBar, SideBar },
	data() {
		return {
			dir: '',
			snake: [],
			food: {},
			score: 0,
			timer: null,
			isOpenModal: false,
		};
	},

	mounted() {
		this.init();
	},

	beforeUnmount() {
		document.removeEventListener('keydown', this.getDirection);
	},

	computed: {
		...mapGetters({
			blocksCollection: 'field/blocksCollection',
			fieldWidth: 'field/fieldWidth',
			record: 'field/record',
		}),
	},

	watch: {
		food(coordinates) {
			this.blocksCollection
				.querySelector(`[data-x="${coordinates.x}"][data-y="${coordinates.y}"]`)
				.classList.add('food');
		},

		snake: {
			handler(_, oldData) {
				if (oldData[0].x === this.food.x && oldData[0].y === this.food.y) {
					this.blocksCollection.querySelector('.food').classList.remove('food');
					this.score++;
					this.snake.unshift({ x: this.food.x, y: this.food.y });
					this.createFood();
				}
			},
			deep: true,
		},
	},

	methods: {
		...mapActions({
			setRecord: 'field/setRecord',
		}),

		init() {
			document.addEventListener('keydown', this.getDirection);
			this.snake[0] = {
				x: Math.round(this.fieldWidth / 2),
				y: Math.round(this.fieldWidth / 2),
			};
			this.createFood();
			this.timer = setInterval(this.drawGame, 100);
			this.setRecord(localStorage.getItem('record'));
		},

		createFood() {
			const newFood = {
				x: Math.floor(Math.random() * this.fieldWidth + 1),
				y: Math.floor(Math.random() * this.fieldWidth + 1),
			};
			const el = this.snake.some(i => i.x === newFood.x && i.y === newFood.y);
			if (!el) {
				this.food = newFood;
			} else {
				this.createFood();
			}
		},

		getDirection(Event) {
			if (Event.keyCode === 37 && this.dir !== 'right') {
				this.dir = 'left';
			}
			if (Event.keyCode === 39 && this.dir !== 'left') {
				this.dir = 'right';
			}
			if (Event.keyCode === 38 && this.dir !== 'down') {
				this.dir = 'up';
			}
			if (Event.keyCode === 40 && this.dir !== 'up') {
				this.dir = 'down';
			}
		},

		drawGame() {
			for (let child of this.blocksCollection.children) {
				child.classList.remove('snake-head');
				child.classList.remove('snake-body');
			}

			this.snake.forEach((block, i) => {
				if (i === 0) {
					this.blocksCollection
						.querySelector(`[data-x="${block.x}"][data-y="${block.y}"]`)
						.classList.add('snake-head');
				} else {
					this.blocksCollection
						.querySelector(`[data-x="${block.x}"][data-y="${block.y}"]`)
						.classList.add('snake-body');
				}
			});

			let coordinates = [this.snake[0].x, this.snake[0].y];

			if (this.dir === 'left') {
				coordinates[0]--;
			} else if (this.dir === 'right') {
				coordinates[0]++;
			} else if (this.dir === 'up') {
				coordinates[1]--;
			} else if (this.dir === 'down') {
				coordinates[1]++;
			}

			let newHead = {
				x: coordinates[0],
				y: coordinates[1],
			};

			if (newHead.x === 0) newHead.x = this.fieldWidth;
			if (newHead.x === this.fieldWidth + 1) newHead.x = 1;
			if (newHead.y === 0) newHead.y = this.fieldWidth;
			if (newHead.y === this.fieldWidth + 1) newHead.y = 1;

			this.snake.unshift(newHead);
			this.snake.pop();

			this.checkCollision();
		},

		checkCollision() {
			const head = {
				x: this.snake[0].x,
				y: this.snake[0].y,
			};

			const body = this.snake.slice(1);

			if (body.length) {
				const isCollision = body.some(item => item.x === head.x && item.y === head.y);
				if (isCollision) {
					clearInterval(this.timer);
					this.isOpenModal = true;
					if (!localStorage.getItem('record') || localStorage.getItem('record') < this.score) {
						this.setRecord(this.score);
						localStorage.setItem('record', this.score);
					}
				}
			}
		},

		restartGame() {
			this.snake = [
				{
					x: Math.round(this.fieldWidth / 2),
					y: Math.round(this.fieldWidth / 2),
				},
			];
			this.dir = '';
			this.blocksCollection.querySelector('.food')?.classList.remove('food');
			this.createFood();
			this.timer = setInterval(this.drawGame, 100);
			this.isOpenModal = false;
			this.score = 0;
		},
	},
};
</script>

<style lang="scss">
@import '@/assets/sass/var.sass';

.wraper {
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;

	.panel {
		display: flex;

		&__right {
			width: 220px;
			padding-left: 20px;
		}
	}

	.container {
		display: flex;
		flex-wrap: wrap;
		width: 480px;
		height: 480px;
		outline: 1px solid $black;

		.snake-head {
			background-color: $snake-header;
		}

		.snake-body {
			background-color: $snake-body;
		}

		.food {
			background-image: url(../../src/assets/images/food.png);
			background-size: contain;
			background-origin: content-box;
			background-repeat: no-repeat;
		}
	}
}
</style>
