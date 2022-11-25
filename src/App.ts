import { Game } from '@/Game';

export class App {
  private readonly menu = document.getElementById('menu');
  private baseSpeed = 500;
  private speedRate = 0.05;
  private boardSize = 10;

  constructor() {
    this.start = this.start.bind(this);

    this.menu?.addEventListener('submit', this.start);
  }

  private getSetting(
    formData: FormData,
    fieldName: 'baseSpeed' | 'speedRate' | 'boardSize',
    baseValue: number,
  ): number {
    const value = formData.get(fieldName);
    return value ? Number(value) : baseValue;
  }

  private start(e: SubmitEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this.menu?.removeEventListener('submit', this.start);
    const formData = new FormData(e.target as HTMLFormElement);
    this.baseSpeed = this.getSetting(formData, 'baseSpeed', this.baseSpeed);
    this.speedRate = this.getSetting(formData, 'speedRate', this.speedRate);
    this.boardSize = this.getSetting(formData, 'boardSize', this.boardSize);
    new Game(this.baseSpeed, this.speedRate, this.boardSize);
    this.menu?.classList.add('disabled');
  }
}
