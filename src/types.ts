export enum Colors {
  Background = '#333',
  Border = '#000',
  Line = '#444',
  Snake = '#0f0',
  Apple = '#f00',
}

export enum Controls {
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',
  Space = ' ',
}

export const CONTROL_CONFLICTS: Record<Controls, Controls> = {
  [Controls.ArrowUp]: Controls.ArrowDown,
  [Controls.ArrowLeft]: Controls.ArrowRight,
  [Controls.ArrowRight]: Controls.ArrowLeft,
  [Controls.ArrowDown]: Controls.ArrowUp,
  [Controls.Space]: Controls.Space,
} as const;

export type Coordinate = {
  x: number;
  y: number;
};
