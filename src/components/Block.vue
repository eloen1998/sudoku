<script setup lang="ts">
import type { BlockState } from "~/types";

const props = defineProps<{ block: BlockState; activeBlock?: BlockState }>();

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();

// const numberColors = ["text-transparent", "text-blue-500", "text-green-500", "text-yellow-500", "text-orange-500", "text-red-500", "text-purple-500", "text-pink-500", "text-teal-500"];

function getBlockClass(block: BlockState) {
  const activeBlock = props.activeBlock;
  let blockClass = "";

  if ([2, 5, 8].includes(block.x)) {
    blockClass += " border-r-2";
  }
  if ([2, 5, 8].includes(block.y)) {
    blockClass += " border-b-2";
  }
  if (block.x === 0) {
    blockClass += " border-l-2";
  }
  if (block.y === 8) {
    blockClass += " border-t-2";
  }
  if (activeBlock) {
    if (block === activeBlock) {
      blockClass += " bg-gray-1";
    } else {
      if (block.x === activeBlock.x || block.y === activeBlock.y) {
        blockClass += " bg-gray-2";
      }
      if (activeBlock.displayValue && activeBlock.displayValue === block.displayValue) {
        blockClass += " bg-green-500 text-white";
      }
    }
  }

  return blockClass;
}
</script>

<template>
  <div flex="~" items-center justify-center min-w-12 min-h-12 relative m="1px" border="0.5 gray-400/10" :class="getBlockClass(block)" @click="emit('click', $event)">
    <button></button>
    <template v-if="block.displayValue">
      <div font-600>
        {{ block.displayValue }}
      </div>
    </template>
    <template v-if="block.notes.length">
      <ul
        class="grid aspect-square place-content-center place-items-center gap-0 size-full absolute left-0 top-0"
        style="grid-template-rows: repeat(3, 1fr); grid-template-columns: repeat(3, 1fr); font-size: min(max(10px + 1vw, 12px), 16px)"
      >
        <li v-for="index in 9" :key="index" class="relative font-bold w-full h-0 pt-[100%] text-gray-800 dark:text-gray-200" :class="block.notes.includes(index) ? 'visible' : 'invisible'">
          <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">{{ index }}</span>
        </li>
      </ul>
    </template>
  </div>
</template>
