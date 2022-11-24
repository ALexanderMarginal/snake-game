import { Apple } from '@/Apple';
import { SIZE } from '@/constants';
import { Colors, Controls, Coordinate } from '@/types';

const BASE_COORDINATES: Coordinate[] = [{ x: SIZE / 2 - 1, y: SIZE / 2 - 1 }];

export class Snake {
  private coordinates: Coordinate[] = BASE_COORDINATES;

  constructor(
    private readonly ctx: CanvasRenderingContext2D,
    private readonly step: number,
  ) {}

  public reset(): void {
    this.coordinates = BASE_COORDINATES;
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

  public checkCollision(): boolean {
    const head = this.coordinates[this.coordinates.length - 1];
    for (let i = 0; i < this.coordinates.length - 1; i++) {
      const coordinate: Coordinate = this.coordinates[i];
      if (head.x === coordinate.x && head.y === coordinate.y) {
        return true;
      }
    }
    return false;
  }
}
