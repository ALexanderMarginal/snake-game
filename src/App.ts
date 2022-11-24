import { Apple } from '@/Apple';
import { Board } from '@/Board';
import { SIZE } from '@/constants';
import { Snake } from '@/Snake';
import { CONTROL_CONFLICTS, Controls } from '@/types';

export class App {
  private readonly size = document.body.offsetWidth / 3;
  private readonly step = this.size / SIZE;
  private readonly ctx: CanvasRenderingContext2D | undefined;

  private readonly score = document.getElementById('score');
  private scoreCount: number | undefined = undefined;

  private readonly fail = document.getElementById('fail');

  private readonly apple: Apple | undefined;
  private readonly snake: Snake | undefined;
  private readonly board: Board | undefined;

  private direction: Controls = Controls.ArrowUp;

  private speed = 500;

  constructor() {
    const canvas = document.createElement('canvas');
    canvas.width = this.size;
    canvas.height = this.size;

    const root = document.getElementById('root');

    if (root) {
      root.appendChild(canvas);
    }

    const ctx = canvas.getContext('2d');

    this.startHandler = this.startHandler.bind(this);
    this.keyboardHandler = this.keyboardHandler.bind(this);
    this.restart = this.restart.bind(this);

    if (ctx) {
      this.ctx = ctx;

      this.snake = new Snake(this.ctx, this.step);
      this.apple = new Apple(this.ctx, this.step, this.snake);
      this.board = new Board(this.ctx, this.size, this.step);

      this.apple.make();
      this.render();

      this.initHandlers();
    }
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
      if (this.scoreCount && this.scoreCount !== this.snake?.coords.length) {
        this.speed = this.speed * 0.95;
        if (this.snake) {
          this.scoreCount = this.snake?.coords.length;
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
      this.snake?.reset();
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
