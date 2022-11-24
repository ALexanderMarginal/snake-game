import { Canvas } from '@/Canvas';
import { Colors } from '@/types';

export class Board {
  public render(): void {
    Canvas.ctx.clearRect(0, 0, Canvas.size, Canvas.size);

    Canvas.ctx.fillStyle = Colors.Background;
    Canvas.ctx.fillRect(0, 0, Canvas.size, Canvas.size);

    Canvas.ctx.beginPath();
    Canvas.ctx.strokeStyle = Colors.Line;
    for (let i = 0; i <= Canvas.size; i += Canvas.step) {
      Canvas.ctx.moveTo(i, 0);
      Canvas.ctx.lineTo(i, Canvas.size);
      Canvas.ctx.moveTo(0, i);
      Canvas.ctx.lineTo(Canvas.size, i);
    }
    Canvas.ctx.stroke();

    Canvas.ctx.strokeStyle = Colors.Border;
    Canvas.ctx.strokeRect(0, 0, Canvas.size - 1, Canvas.size - 1);
  }
}
