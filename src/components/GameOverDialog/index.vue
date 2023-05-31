<template>
  <Modal
    v-if="isShowModal"
    title="Game over"
    :handleClick="closeModal"
    :global="true"
    :keyEventListener="keyboardEventHandler"
  >
    <div class="wrapper">
      <p class="text">Geme over. Your score: {{ score }}. Do you want restart game?</p>
      <div class="btn__group">
        <Button :handleClick="closeModal" color="dark">Cancel</Button>
        <Button :handleClick="restartGame" color="yellow">Restart</Button>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from "@/components/shared/ModalWindow";
import Button from "@/components/shared/CustomButton";

export default {
  name: "GameOverDialog",
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
      switch(event.key) {
        case 'Enter':
          this.restartGame();
          break;
        case 'Escape':
          this.closeModal();
          break;
        default:
          return false
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 0 90px 56px 90px;


  .text {
    margin-bottom: 30px;
    text-align: center;
  }
  
  .btn__group {
    text-align: center;
    padding: 0 26px;
    margin-top: 35px;
  
    button {
      margin: 0 12px;
    }
  }
}
</style>