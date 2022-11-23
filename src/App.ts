import { Apple } from '@/Apple';
import { SIZE } from '@/constants';
import { Snake } from '@/Snake';
import { Colors, Controls } from '@/types';

export class App {
  private readonly size = document.body.offsetWidth / 3;
  private readonly step = this.size / SIZE;
  private readonly ctx: CanvasRenderingContext2D | undefined;

  private readonly score = document.getElementById('score');
  private scoreCount: number | undefined = undefined;

  private readonly apple: Apple | undefined;
  private readonly snake: Snake | undefined;

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

    if (ctx) {
      this.ctx = ctx;

      this.snake = new Snake(this.ctx, this.step);
      this.apple = new Apple(this.ctx, this.step, this.snake);

      this.apple.make();
      this.render();

      document.addEventListener('keyup', this.startHandler);
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
      }
      this.scoreCount = this.snake?.coords.length;
      this.score.innerHTML = this.scoreCount
        ? `Длина змеи ${this.scoreCount}`
        : '';
    }
  }

  private tick(): void {
    if (this.apple) {
      this.snake?.move(this.direction, this.apple);
      this.setSnakeLength();
    }
    this.render();
    setTimeout(() => this.tick(), this.speed);
  }

  private startHandler(e: KeyboardEvent): void {
    if (this.checkKeyboardEvent(e)) {
      this.keyboardHandler(e);
      document.removeEventListener('keyup', this.startHandler);
      document.addEventListener('keyup', this.keyboardHandler);
      this.tick();
    }
  }

  private keyboardHandler(e: KeyboardEvent): void {
    if (this.checkKeyboardEvent(e)) {
      e.preventDefault();
      e.stopPropagation();
      this.direction = e.key as Controls;
    }
  }

  private renderBoard(): void {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.size, this.size);

      this.ctx.fillStyle = Colors.Background;
      this.ctx.fillRect(0, 0, this.size, this.size);

      this.ctx.beginPath();
      this.ctx.strokeStyle = Colors.Line;
      for (let i = 0; i <= this.size; i += this.step) {
        this.ctx.moveTo(i, 0);
        this.ctx.lineTo(i, this.size);
        this.ctx.moveTo(0, i);
        this.ctx.lineTo(this.size, i);
      }
      this.ctx.stroke();

      this.ctx.strokeStyle = Colors.Border;
      this.ctx.strokeRect(0, 0, this.size - 1, this.size - 1);
    }
  }

  private render(): void {
    this.renderBoard();
    this.apple?.render();
    this.snake?.render();
  }
}
