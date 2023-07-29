import DrawRecord from "../draw_stack/draw_record";
import { easeInExpo } from "./timing_functions";

export default class RoundRectAnimation extends DrawRecord {
    private duration: number;
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private radius: number;

    constructor(duration: number, x: number, y: number, width: number, height: number, radius: number) {
        super();
        this.duration = duration;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.radius = radius;
    }

    animate(ctx: CanvasRenderingContext2D, clearCtx: (ctx: CanvasRenderingContext2D) => void): void {
        requestAnimationFrame(this._animate.bind(this, ctx, clearCtx, performance.now()));
    }

    private _animate(ctx: CanvasRenderingContext2D, clearCtx: (ctx: CanvasRenderingContext2D) => void, startAt: DOMHighResTimeStamp, t: DOMHighResTimeStamp): void {
        if (t - startAt >= this.duration) {
            this.draw(ctx);
            return;
        }

        const timing = (t - startAt) / this.duration; // easeInExpo((t - startAt) / this.duration);

        clearCtx(ctx);

        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.roundRect(this.x - (this.width / 2) * timing, this.y - (this.height / 2) * timing, this.width * timing, this.height * timing, this.radius);
        ctx.closePath();
        ctx.fill();

        requestAnimationFrame(this._animate.bind(this, ctx, clearCtx, startAt));
    }
    
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.roundRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height, this.radius);
        ctx.closePath();
        ctx.fill();
    }
}