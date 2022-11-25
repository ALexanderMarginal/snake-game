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
  public step = 0;

  constructor(public size: number) {
    this.step = CANVAS_SIZE / this.size;
  }
  public readonly ctx = makeCanvasContext();

  public get fullSize(): number {
    return this.size * this.step;
  }
}
