<template>
  <button
    class="btn btn_dark"
    :class="{btn_yellow: color === 'yellow', btn_disabled: disabled}"
    @click="handleClick"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'CustomButton',
  props: {
    color: {
      type: String,
      default: 'dark'
    },
    disabled: {
      type: Boolean,
      default: false,
    },

    handleClick: Function
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/var.sass';

.btn {
  padding: 10px 28px;
  font-size: 14px;
  text-transform: uppercase;
  border-radius: 4px;
  box-shadow: 0px 4px 2px rgba(0, 0, 0, 0.25);
  transition: background .1s linear;
  cursor: pointer;

    &:disabled {
      background-color: #5e5e5e;
      color: $disabled;
    }

    &_dark {
      background-color: $btn-dark;
      color: $white;

      &:active {
        background: darken($btn-dark, 5%);
      }
    }

    &_yellow {
      background-color: $accent;
      color: $border;

      &:active {
        background: darken($accent, 10%);
      }
    }
}

</style>
