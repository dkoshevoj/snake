<template>
	<main class="game">
		<div class="panel">
			<div class="panel__left">
				<h1 class="panel__left-title">GAME</h1>
				<GameField />
				<ScoreBar :score="score" :record="record" />
			</div>
			<aside class="panel__right">
				<SideBar :reset="restartGame" />
			</aside>
		</div>
		<GameOverDialog
			:isShowModal="isOpenModal"
			:closeModal="() => (isOpenModal = false)"
			:restartGame="restartGame"
			:score="score"
		/>
	</main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { DIRECTIONS, DIRECTION_KEYS } from '@/store/constants';
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
			speedPoints: {
				1: 150,
				2: 120,
				3: 100,
				4: 80,
				5: 60,
			},
			prevDir: '',
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
			velocity: 'field/velocity',
		}),

		speed() {
			return this.speedPoints[this.velocity];
		},
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
					this.eatingFoodAction();
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
			this.timer = setInterval(this.drawGame, this.speed);
			this.setRecord(localStorage.getItem('record'));
		},

		createFood() {
			const newFood = {
				x: Math.floor(Math.random() * this.fieldWidth + 1),
				y: Math.floor(Math.random() * this.fieldWidth + 1),
			};
			const isFoodOnBody = this.snake.some(body => body.x === newFood.x && body.y === newFood.y);
			if (!isFoodOnBody) {
				this.food = newFood;
			} else {
				this.createFood();
			}
		},

		eatingFoodAction() {
			this.blocksCollection
				.querySelector('.food')
				.classList.remove('food');

			this.score++;
			this.snake.unshift({ x: this.food.x, y: this.food.y });
			this.createFood();
		},

		getDirection(event) {
			if (event.keyCode === DIRECTION_KEYS.LEFT && this.prevDir !== DIRECTIONS.RIGHT) {
				this.dir = DIRECTIONS.LEFT;
			}
			if (event.keyCode === DIRECTION_KEYS.RIGHT && this.prevDir !== DIRECTIONS.LEFT) {
				this.dir = DIRECTIONS.RIGHT;
			}
			if (event.keyCode === DIRECTION_KEYS.UP && this.prevDir !== DIRECTIONS.DOWN) {
				this.dir = DIRECTIONS.UP;
			}
			if (event.keyCode === DIRECTION_KEYS.DOWN && this.prevDir !== DIRECTIONS.UP) {
				this.dir = DIRECTIONS.DOWN;
			}
		},


		drawGame() {
      this.clearBlocks();
      this.drawSnake();
      this.moveSnake();
      this.checkCollision();
    },

		clearBlocks() {
      for (let child of this.blocksCollection.children) {
        child.classList.remove('snake-head');
        child.classList.remove('snake-body');
      }
    },

		drawSnake() {
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
    },

		moveSnake() {
      let coordinates = [this.snake[0].x, this.snake[0].y];

      switch (this.dir) {
        case DIRECTIONS.LEFT:
          coordinates[0]--;
          break;
        case DIRECTIONS.RIGHT:
          coordinates[0]++;
          break;
        case DIRECTIONS.UP:
          coordinates[1]--;
          break;
        case DIRECTIONS.DOWN:
          coordinates[1]++;
          break;
        default:
          break;
      }

      let newHead = {
        x: coordinates[0],
        y: coordinates[1],
      };

      // Passing through boundaries
      if (newHead.x === 0) newHead.x = this.fieldWidth;
      if (newHead.x === this.fieldWidth + 1) newHead.x = 1;
      if (newHead.y === 0) newHead.y = this.fieldWidth;
      if (newHead.y === this.fieldWidth + 1) newHead.y = 1;

      this.snake.unshift(newHead);
      this.snake.pop();

			this.prevDir = this.dir;
    },

		checkCollision() {
      const head = {
        x: this.snake[0].x,
        y: this.snake[0].y,
      };

      const body = this.snake.slice(1);

      if (body.length) {
        const isCollision = body.some(
          (item) => item.x === head.x && item.y === head.y
        );
        if (isCollision) {
          clearInterval(this.timer);
          this.isOpenModal = true;
          const localStorageRecord = localStorage.getItem('record');
          if (!localStorageRecord || localStorageRecord < this.score) {
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
			this.timer = setInterval(this.drawGame, this.speed);
			this.isOpenModal = false;
			this.score = 0;
		},
	},
};
</script>

<style lang="scss">
@import '@/assets/sass/var.sass';

.game {
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

	.snake-head {
    background: radial-gradient(
      circle,
      $snake-header-1 35%,
      $snake-header-2 100%
    );
  }

	.snake-body {
		background: radial-gradient(
			circle,
			$snake-body-1 35%,
			$snake-body-2 100%
		);
	}

	.food {
		background-image: url(@/assets/images/food.png);
		background-size: contain;
		background-origin: content-box;
		background-repeat: no-repeat;
	}
}
</style>
