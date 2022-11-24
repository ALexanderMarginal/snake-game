import { Colors } from '@/types';

export class Board {
  constructor(
    private readonly ctx: CanvasRenderingContext2D,
    private readonly size: number,
    private readonly step: number,
  ) {}

  public render(): void {
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
