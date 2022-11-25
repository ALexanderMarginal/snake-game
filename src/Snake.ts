import { Apple } from '@/Apple';
import { Canvas } from '@/Canvas';
import { Colors, Controls, Coordinate } from '@/types';

export class Snake {
  private coordinates: Coordinate[] = [];

  constructor(
    private readonly canvas: Canvas,
    private readonly boardSize: number,
  ) {
    this.setInitialCoordinate();
  }

  public setInitialCoordinate(): void {
    const center = Math.floor(this.boardSize / 2) - 1;
    this.coordinates = [{ x: center, y: center }];
  }

  public get coords(): Coordinate[] {
    return this.coordinates;
  }

  public render(): void {
    this.canvas.ctx.fillStyle = Colors.Snake;
    for (const coordinate of this.coordinates) {
      this.canvas.ctx.fillRect(
        coordinate.x * this.canvas.step,
        coordinate.y * this.canvas.step,
        this.canvas.step,
        this.canvas.step,
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
          { x: head.x + 1 >= this.canvas.size ? 0 : head.x + 1, y: head.y },
        ];
        break;
      case Controls.ArrowDown:
        this.coordinates = [
          ...body,
          { x: head.x, y: head.y + 1 >= this.canvas.size ? 0 : head.y + 1 },
        ];
        break;
      case Controls.ArrowLeft:
        this.coordinates = [
          ...body,
          { x: head.x ? head.x - 1 : this.canvas.size - 1, y: head.y },
        ];
        break;
      case Controls.ArrowUp:
      default:
        this.coordinates = [
          ...body,
          { x: head.x, y: head.y ? head.y - 1 : this.canvas.size - 1 },
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
