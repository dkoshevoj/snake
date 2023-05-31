<template>
	<div class="sidebar">
		<img src="../assets/images/keys.png" alt="keys" />
		<p class="sidebar__title">To control the game press the arrows</p>
    <router-link class="sidebar__link" aria-current="page" to="/">Return to home page</router-link>
	</div>
</template>

<script>
export default {
	name: 'SideBar',
};
</script>

<style lang="scss" scoped>
.sidebar {
  text-align: center;

	&__title {
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
}
</style>
