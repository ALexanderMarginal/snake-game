import { Canvas } from '@/Canvas';
import { getRandomInteger } from '@/helpers/getRandomInteger';
import { Snake } from '@/Snake';
import { Colors, Coordinate } from '@/types';

export class Apple {
  private coordinate: Coordinate | undefined;

  constructor(private readonly canvas: Canvas, private readonly snake: Snake) {}

  public checkCollision(coordinates: Coordinate[]): boolean {
    for (const coordinate of coordinates) {
      if (
        coordinate.x === this.coordinate?.x &&
        coordinate.y === this.coordinate.y
      ) {
        return true;
      }
    }
    return false;
  }

  public make(): void {
    let uniqueApple: Coordinate | undefined = undefined;
    while (!uniqueApple) {
      const apple = {
        x: getRandomInteger(0, this.canvas.size - 1),
        y: getRandomInteger(0, this.canvas.size - 1),
      };

      for (const coordinate of this.snake.coords) {
        if (coordinate.x !== apple.x && coordinate.y !== apple.y) {
          uniqueApple = apple;
          break;
        }
      }
    }
    this.coordinate = uniqueApple;
  }

  public render(): void {
    if (this.coordinate) {
      this.canvas.ctx.fillStyle = Colors.Apple;
      this.canvas.ctx.fillRect(
        this.coordinate.x * this.canvas.step,
        this.coordinate.y * this.canvas.step,
        this.canvas.step,
        this.canvas.step,
      );
    }
  }
}
