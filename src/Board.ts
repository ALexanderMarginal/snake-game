import { Canvas } from '@/Canvas';
import { Colors } from '@/types';

export class Board {
  constructor(private readonly canvas: Canvas) {}

  public render(): void {
    this.canvas.ctx.clearRect(0, 0, this.canvas.fullSize, this.canvas.fullSize);

    this.canvas.ctx.fillStyle = Colors.Background;
    this.canvas.ctx.fillRect(0, 0, this.canvas.fullSize, this.canvas.fullSize);

    this.canvas.ctx.beginPath();
    this.canvas.ctx.strokeStyle = Colors.Line;
    for (let i = 0; i <= this.canvas.fullSize; i += this.canvas.step) {
      this.canvas.ctx.moveTo(i, 0);
      this.canvas.ctx.lineTo(i, this.canvas.fullSize);
      this.canvas.ctx.moveTo(0, i);
      this.canvas.ctx.lineTo(this.canvas.fullSize, i);
    }
    this.canvas.ctx.stroke();

    this.canvas.ctx.strokeStyle = Colors.Border;
    this.canvas.ctx.strokeRect(
      0,
      0,
      this.canvas.fullSize - 1,
      this.canvas.fullSize - 1,
    );
  }
}
