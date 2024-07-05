<script setup lang="ts">
// import { isDev, toggleDev } from '~/composables'
import { GamePlay } from "~/composables/logic";
import { levels } from "~/config/level";

const play = new GamePlay(levels[0]);

const now = ref(useNow());
const timerMS = computed(() => Math.round(((play.state.value.endMS ?? +now) - (play.state.value.startMS ?? +now)) / 1000));

useStorage("sudoku-state", play.state);
const state = computed(() => play.board);
const mode = computed(() => play.mode);

const activeBlock = computed(() => {
  return play.active;
  // return undefined;
});

const mineRest = computed(() => {
  return 10;
});

function newGame(difficulty: "easy" | "medium" | "hard") {
  switch (difficulty) {
    case "easy":
      play.reset(levels[0]);
      break;
    case "medium":
      play.reset(levels[0]);
      break;
    case "hard":
      play.reset(levels[0]);
      break;
  }
}

function fillNumber(number: number) {
  if (mode.value === "fill") {
    play.fillNumber(number);
  } else {
    play.noteNumber(number);
  }
}

watchEffect(() => {
  play.checkGameState();
});
</script>

<template>
  <div>
    Sudoku

    <div flex="~ gap1" justify-center p4>
      <button btn @click="play.reset()">New Game</button>
      <button btn @click="newGame('easy')">Easy</button>
      <button btn @click="newGame('medium')">Medium</button>
      <button btn @click="newGame('hard')">Hard</button>
    </div>

    <div flex="~ gap-10" justify-center>
      <div font-mono text-2xl flex="~ gap-1" items-center>
        <div i-carbon-timer />
        {{ timerMS }}
      </div>
      <div font-mono text-2xl flex="~ gap-1" items-center>
        <div i-mdi-mine />
        {{ mineRest }}
      </div>
    </div>

    <div p5 w-full overflow-auto>
      <div v-for="(row, y) in state" :key="y" flex="~" items-center justify-center w-max ma>
        <Block v-for="(block, x) in row" :key="x" :block="block" :activeBlock="activeBlock" @click="play.onClick(block)" />
      </div>
    </div>

    <div flex="~ gap-10" justify-center>
      <div font-mono text-2xl flex="~ gap-1" items-center @click="play.changeMode()">
        <div v-if="mode === 'fill'" i-mdi-toggle-switch />
        <div v-else i-mdi-toggle-switch-off></div>
        笔记
      </div>
    </div>

    <div flex="~ gap-5" mt-6 justify-center>
      <div v-for="index in 9" :key="index" text-size-2xl @click="fillNumber(index)">
        {{ index }}
      </div>
    </div>

    <!-- <div flex="~ gap-1" justify-center>
      <button btn @click="toggleDev()">
        {{ isDev ? 'DEV' : 'NORMAL' }}
      </button>
    </div> -->

    <Confetti :passed="play.state.value.status === 'won'" />
  </div>
</template>
