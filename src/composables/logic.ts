import type { Ref } from "vue";
import type { BlockState } from "~/types";

const NUM = 9;

type GameStatus = "ready" | "play" | "won" | "lost";

interface GameState {
  board: BlockState[][];
  active: BlockState;
  mode: "fill" | "note";
  mineGenerated: boolean;
  status: GameStatus;
  startMS?: number;
  endMS?: number;
}

export class GamePlay {
  state = ref() as Ref<GameState>;

  constructor(public level: (number | undefined)[]) {
    this.reset();
  }

  get board() {
    return this.state.value.board;
  }

  get mode() {
    return this.state.value.mode;
  }

  get blocks() {
    return this.state.value.board.flat() as BlockState[];
  }
  get active() {
    return this.state.value.active;
  }

  reset(level = this.level) {
    const board = Array.from({ length: NUM }, (_, y) =>
      Array.from({ length: NUM }, (_, x): BlockState => {
        const displayValue = level[9 * y + x];
        return {
          x,
          y,
          displayValue,
          original: Boolean(displayValue),
          notes: []
        };
      })
    );
    this.state.value = {
      mineGenerated: false,
      mode: "fill",
      status: "ready",
      board,
      active: board[0][3]
    };
  }

  onClick(block: BlockState) {
    this.state.value.active = block;
  }

  fillNumber(number: number) {
    if (!this.active.displayValue) {
      this.active.displayValue = number;
      this.active.notes = [];
    }
  }

  noteNumber(number: number) {
    if (!this.active.displayValue) {
      const index = this.active.notes.indexOf(number);
      if (index > -1) {
        this.active.notes.splice(index, 1);
      } else {
        this.active.notes.push(number);
      }
    }
  }

  changeMode(mode?: "fill" | "note") {
    if (mode) {
      this.state.value.mode = mode;
    } else {
      this.state.value.mode = this.state.value.mode === "fill" ? "note" : "fill";
    }
  }

  checkGameState() {}
}
