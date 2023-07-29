import DrawRecord from "../draw_stack/draw_record";
import { easeInExpo } from "./timing_functions";

export default class BlackFullScreenAnimation extends DrawRecord {
    private _duration: number;
    private _startPoint!: { x: number, y: number };
    private _amountToMove!: number;
    private _amountToMovePerMillisecond!: number;
    private _ctx!: CanvasRenderingContext2D;
    private _clearCtx!: (ctx: CanvasRenderingContext2D) => void;

    constructor(duration: number) {
        super();
        this._duration = duration;
    }

    animate(ctx: CanvasRenderingContext2D, clearCtx: (ctx: CanvasRenderingContext2D) => void): Promise<void> {
        this._startPoint = {
            x: Math.random() * ctx.canvas.width,
            y: Math.random() * ctx.canvas.height
        };
        this._amountToMove = Math.max(this._startPoint.x, this._startPoint.y, ctx.canvas.width - this._startPoint.x, ctx.canvas.height - this._startPoint.y) * 2;
        this._amountToMovePerMillisecond = this._amountToMove / this._duration;
        this._ctx = ctx;
        this._clearCtx = clearCtx;

        return new Promise((resolve, _) => {
            requestAnimationFrame(this._animate.bind(this, performance.now(), resolve));
        });
    }

    private _animate(startAt: DOMHighResTimeStamp, resolve: (_: void) => void, t: DOMHighResTimeStamp): void {
        if (t - startAt >= this._duration) {
            this.draw(this._ctx);
            resolve();
            return;
        }

        this._clearCtx(this._ctx);

        this._ctx.fillStyle = 'black';
        this._ctx.arc(this._startPoint.x, this._startPoint.y, this._amountToMove * easeInExpo(this._amountToMovePerMillisecond * (t - startAt) / this._amountToMove), 0, Math.PI * 2);
        this._ctx.fill();

        requestAnimationFrame(this._animate.bind(this, startAt, resolve));
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
}
