import DrawRecord from "../draw_stack/draw_record";

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

    animate(ctx: CanvasRenderingContext2D, clearCtx: (ctx: CanvasRenderingContext2D) => void): void {
        this._startPoint = {
            x: Math.random() * ctx.canvas.width,
            y: Math.random() * ctx.canvas.height
        };
        this._amountToMove = Math.max(this._startPoint.x, this._startPoint.y, ctx.canvas.width - this._startPoint.x, ctx.canvas.height - this._startPoint.y) * 2;
        this._amountToMovePerMillisecond = this._amountToMove / this._duration;
        this._ctx = ctx;
        this._clearCtx = clearCtx;

        requestAnimationFrame(this._animate.bind(this));
    }

    private _animate(t: DOMHighResTimeStamp): void {
        if (t >= this._duration) {
            this.draw(this._ctx);
            return;
        }

        this._clearCtx(this._ctx);

        this._ctx.fillStyle = 'black';
        this._ctx.arc(this._startPoint.x, this._startPoint.y, this._amountToMove * this._easeInExpo(this._amountToMovePerMillisecond * t / this._amountToMove), 0, Math.PI * 2);
        this._ctx.fill();

        requestAnimationFrame(this._animate.bind(this));
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    private _easeInExpo(x: number): number {
        return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
    }
}
