import { Canvas } from '@/Canvas';
import { SIZE } from '@/constants';
import { getRandomInteger } from '@/helpers/getRandomInteger';
import { Snake } from '@/Snake';
import { Colors, Coordinate } from '@/types';

export class Apple {
  private coordinate: Coordinate | undefined;

  constructor(private readonly snake: Snake) {}

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
        x: getRandomInteger(0, SIZE - 1),
        y: getRandomInteger(0, SIZE - 1),
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
      Canvas.ctx.fillStyle = Colors.Apple;
      Canvas.ctx.fillRect(
        this.coordinate.x * Canvas.step,
        this.coordinate.y * Canvas.step,
        Canvas.step,
        Canvas.step,
      );
    }
  }
}
