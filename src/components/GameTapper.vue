<template>
  <div class="game">
        <div class="header">
          <img src="/src/assets/images/coin.png" alt="coin" />
          <h2 class="score" id="score">{{ score }}</h2>
        </div>
        <div class="circle">
          <img src="/src/assets/images/frog.png" alt="frog" id="circle" @click="handleClick" ref="circle" />
        </div>
      </div>
</template>
<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'GameTapper',
  setup() {
    const score = ref(0);
    const circle = ref(null);

    const start = () => {
      setScore(getScore());
      setImage();
    };

    const setScore = (newScore) => {
      localStorage.setItem('score', newScore);
      score.value = newScore;
    };

    const setImage = () => {
      if (getScore() >= 100) {
        circle.value.setAttribute('src', new URL('@/assets/images/lizzard.png', import.meta.url).href);
      }
    };


    const getScore = () => {
      return Number(localStorage.getItem('score')) || 0;
    };

    const addOne = () => {
      setScore(getScore() + 1);
      setImage();
    };

    const handleClick = (event) => {
      const rect = circle.value.getBoundingClientRect();
      const offsetX = event.clientX - rect.left - rect.width / 2;
      const offsetY = event.clientY - rect.top - rect.height / 2;
      const DEG = 40;
      const tiltX = (offsetY / rect.height) * DEG;
      const tiltY = (offsetX / rect.width) * -DEG;
      circle.value.style.setProperty('--tiltX', `${tiltX}deg`);
      circle.value.style.setProperty('--tiltY', `${tiltY}deg`);

      setTimeout(() => {
        circle.value.style.setProperty('--tiltX', `0deg`);
        circle.value.style.setProperty('--tiltY', `0deg`);
      }, 300);

      const plusOne = document.createElement('div');
      plusOne.classList.add('plus-one');
      plusOne.textContent = '+1';
      plusOne.style.left = `${event.clientX - rect.left}px`;
      plusOne.style.top = `${event.clientY - rect.top}px`;

      circle.value.parentElement.appendChild(plusOne);
      addOne();

      setTimeout(() => {
        plusOne.remove();
      }, 3000);
    };

    onMounted(() => {
      start();
    });

    return {
      score,
      circle,
      handleClick,
    };
  },
}
</script>
<style lang="scss">
.game{
  position: relative;
  padding: 20px;
  border-radius: 50px 50px 0px 0px ;
  /* background-color: #285b405b; */
  color: #fff; 
  margin: 0 auto;
  overflow: hidden;
  /* width: 99%; */

  ::before{
  content: '';
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  height: 20px;
  background: radial-gradient(circle at top center, rgba(255, 255, 0, 0.8), transparent);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0px -10px 20px -5px rgba(255, 255, 0, 0.8);
}
}


</style>