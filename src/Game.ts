import { Apple } from '@/Apple';
import { Board } from '@/Board';
import { Canvas } from '@/Canvas';
import { Snake } from '@/Snake';
import { CONTROL_CONFLICTS, Controls } from '@/types';

export class Game {
  private readonly score = document.getElementById('score');
  private scoreCount: number | undefined = undefined;

  private readonly fail = document.getElementById('fail');

  private readonly apple: Apple | undefined;
  private readonly snake: Snake | undefined;
  private readonly board: Board | undefined;
  private readonly canvas: Canvas | undefined;

  private direction: Controls = Controls.ArrowUp;

  constructor(
    private speed: number,
    private speedRate: number,
    private boardSize: number,
  ) {
    this.startHandler = this.startHandler.bind(this);
    this.keyboardHandler = this.keyboardHandler.bind(this);
    this.restart = this.restart.bind(this);

    this.canvas = new Canvas(this.boardSize);

    this.board = new Board(this.canvas);
    this.snake = new Snake(this.canvas, this.boardSize);
    this.apple = new Apple(this.canvas, this.snake);

    this.apple.make();
    this.render();

    this.initHandlers();
  }

  private checkKeyboardEvent(e: KeyboardEvent): boolean {
    return [
      Controls.ArrowUp,
      Controls.ArrowRight,
      Controls.ArrowDown,
      Controls.ArrowLeft,
    ].includes(e.key as Controls);
  }

  private setSnakeLength() {
    if (this.score) {
      if (this.scoreCount !== this.snake?.coords.length) {
        if (this.snake) {
          this.scoreCount = this.snake.coords.length;
          if (!(this.scoreCount % 5)) {
            this.speed = this.speed * (1 - this.speedRate);
          }
          this.score.innerHTML = this.scoreCount
            ? `Длина змеи ${this.scoreCount}`
            : '';
        }
      }
    }
  }

  private tick(): void {
    if (this.apple) {
      this.snake?.move(this.direction, this.apple);
      if (this.snake?.checkCollision()) {
        this.onFail();
        return;
      }
      this.setSnakeLength();
    }
    this.render();
    setTimeout(() => this.tick(), this.speed);
  }

  private restart(e: KeyboardEvent): void {
    if (e.key === Controls.Space) {
      document.removeEventListener('keyup', this.restart);
      this.fail?.classList.remove('active');
      this.snake?.setInitialCoordinate();
      this.render();
      this.initHandlers();
    }
  }

  private onFail(): void {
    this.fail?.classList.add('active');
    document.addEventListener('keyup', this.restart);
  }

  private initHandlers(): void {
    document.removeEventListener('keyup', this.keyboardHandler);
    document.addEventListener('keyup', this.startHandler);
  }

  private startHandler(e: KeyboardEvent): void {
    if (this.checkKeyboardEvent(e)) {
      e.preventDefault();
      e.stopPropagation();
      this.direction = e.key as Controls;
      document.removeEventListener('keyup', this.startHandler);
      document.addEventListener('keyup', this.keyboardHandler);
      this.tick();
    }
  }

  private keyboardHandler(e: KeyboardEvent): void {
    if (this.checkKeyboardEvent(e)) {
      e.preventDefault();
      e.stopPropagation();
      if (CONTROL_CONFLICTS[e.key as Controls] === this.direction) {
        return;
      }
      this.direction = e.key as Controls;
    }
  }

  private render(): void {
    this.board?.render();
    this.apple?.render();
    this.snake?.render();
  }
}
