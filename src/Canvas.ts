import { SIZE } from '@/constants';

const CANVAS_SIZE = document.body.offsetWidth / 3;

const makeCanvasContext = (): CanvasRenderingContext2D => {
  const canvas = document.createElement('canvas');
  canvas.width = CANVAS_SIZE;
  canvas.height = CANVAS_SIZE;

  const root = document.getElementById('root');

  if (root) {
    root.appendChild(canvas);
  }

  return canvas.getContext('2d') as CanvasRenderingContext2D;
};

export class Canvas {
  public static readonly size = CANVAS_SIZE;
  public static readonly step = CANVAS_SIZE / SIZE;
  public static readonly ctx = makeCanvasContext();
}
