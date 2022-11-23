import { Apple } from '@/Apple';
import { SIZE } from '@/constants';
import { Colors, Controls, Coordinate } from '@/types';

export class Snake {
  private readonly ctx: CanvasRenderingContext2D;
  private readonly step: number;

  private coordinates: Coordinate[] = [{ x: SIZE / 2 - 1, y: SIZE / 2 - 1 }];

  constructor(ctx: CanvasRenderingContext2D, step: number) {
    this.ctx = ctx;
    this.step = step;
  }

  public get coords(): Coordinate[] {
    return this.coordinates;
  }

  public render(): void {
    this.ctx.fillStyle = Colors.Snake;
    for (const coordinate of this.coordinates) {
      this.ctx.fillRect(
        coordinate.x * this.step,
        coordinate.y * this.step,
        this.step,
        this.step,
      );
    }
  }

  public move(direction: Controls, apple: Apple): void {
    const head = this.coordinates[this.coordinates.length - 1];
    const isCollision: boolean = apple.checkCollision(this.coordinates);
    const body = isCollision ? this.coordinates : this.coordinates.slice(1);
    if (isCollision) {
      apple.make();
    }
    switch (direction) {
      case Controls.ArrowRight:
        this.coordinates = [
          ...body,
          { x: head.x + 1 >= SIZE ? 0 : head.x + 1, y: head.y },
        ];
        break;
      case Controls.ArrowDown:
        this.coordinates = [
          ...body,
          { x: head.x, y: head.y + 1 >= SIZE ? 0 : head.y + 1 },
        ];
        break;
      case Controls.ArrowLeft:
        this.coordinates = [
          ...body,
          { x: head.x ? head.x - 1 : SIZE - 1, y: head.y },
        ];
        break;
      case Controls.ArrowUp:
      default:
        this.coordinates = [
          ...body,
          { x: head.x, y: head.y ? head.y - 1 : SIZE - 1 },
        ];
    }
  }
}
