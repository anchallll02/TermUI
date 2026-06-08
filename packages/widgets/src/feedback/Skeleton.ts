import { type Screen, type Style, type Color, caps } from '@termuijs/core';
import { Widget } from '../base/Widget.js';
import { timerPoolSubscribe } from '@termuijs/motion';

export interface SkeletonOptions {
    width?: number;
    height?: number;
    animated?: boolean;
    character?: string;
}

export class Skeleton extends Widget {
    private _width: number;
    private _height: number;
    private _animated: boolean;
    private _character: string;

    private _frame: number = 0;
    private _unsubscribe?: () => void;

    constructor(style: Partial<Style> = {}, opts: SkeletonOptions = {}) {
        super(style);

        this._width = opts.width ?? 10;
        this._height = opts.height ?? 1;
        this._animated = opts.animated ?? true;

        const defaultChar = caps.unicode ? '░' : '-';
        this._character = opts.character ?? defaultChar;

        if (this._animated && caps.motion) {
            this._unsubscribe = timerPoolSubscribe(600, () => {
                this._frame = 1 - this._frame;
                this.markDirty();
            });
        }
    }

    setWidth(width: number): void {
        this._width = Math.max(0, width);
        this.markDirty();
    }

    setHeight(height: number): void {
        this._height = Math.max(0, height);
        this.markDirty();
    }

    setAnimated(animated: boolean): void {
        this._animated = animated;

        this._unsubscribe?.();
        this._unsubscribe = undefined;

        if (animated && caps.motion) {
            this._unsubscribe = timerPoolSubscribe(600, () => {
                this._frame = 1 - this._frame;
                this.markDirty();
            });
        }

        this.markDirty();
    }

    override unmount(): void {
        this._unsubscribe?.();
        this._unsubscribe = undefined;
        super.unmount();
    }

    protected _renderSelf(screen: Screen): void {
        const rect = this._getContentRect();
        const { x, y, width, height } = rect;

        if (width <= 0 || height <= 0) return;

        const char =
            this._frame === 0
                ? this._character
                : caps.unicode
                    ? '▒'
                    : '#';

        for (let row = 0; row < height; row++) {
            for (let col = 0; col < width; col++) {
                screen.setCell(x + col, y + row, {
                    char,
                    dim: this._frame === 0,
                    bold: false,
                });
            }
        }
    }
}