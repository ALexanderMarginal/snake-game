import { SIZE } from '@/constants';
import { getRandomInteger } from '@/helpers/getRandomInteger';
import { Snake } from '@/Snake';
import { Colors, Coordinate } from '@/types';

export class Apple {
  private readonly ctx: CanvasRenderingContext2D;
  private readonly step: number;
  private readonly snake: Snake;

  private coordinate: Coordinate | undefined;

  constructor(ctx: CanvasRenderingContext2D, step: number, snake: Snake) {
    this.ctx = ctx;
    this.step = step;
    this.snake = snake;
  }

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
      this.ctx.fillStyle = Colors.Apple;
      this.ctx.fillRect(
        this.coordinate.x * this.step,
        this.coordinate.y * this.step,
        this.step,
        this.step,
      );
    }
  }
}
