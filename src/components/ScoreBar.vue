<template>
	<div class="score">
		<p data-cy="score">Score: {{ score }}</p>
		<p data-cy="record">Your best result: {{ record }}</p>
	</div>
</template>

<script>
export default {
	name: 'ScoreBar',
	props: {
		score: {
			type: [String, Number],
			required: true,
		},
		record: {
			type: [String, Number],
			required: true,
		},
	},
};
</script>

<style lang="scss" scoped>
.score {
	margin-top: 15px;
}
</style>
