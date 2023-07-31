import DrawRecord from "../draw_stack/draw_record";
import RoundRectAnimation from "./round_rect_animation";

export default class RoundRectTextAnimation extends DrawRecord {
    private duration: number;
    private x: number;
    private y: number;
    private text: string;
    private padding: number;

    constructor(
        duration: number,
        x: number,
        y: number,
        text: string,
    ) {
        super();
        this.duration = duration;
        this.x = x;
        this.y = y;
        this.text = text;
        this.padding = 20;
    }

    animate(ctx: CanvasRenderingContext2D, clearCtx: (ctx: CanvasRenderingContext2D) => void): Promise<void> {
        return new Promise((resolve, _) => {
            requestAnimationFrame(this._animate.bind(this, ctx, clearCtx, performance.now(), resolve));
        });
    }

    private _animate(
        ctx: CanvasRenderingContext2D,
        clearCtx: (ctx: CanvasRenderingContext2D) => void,
        startAt: DOMHighResTimeStamp,
        resolve: (_: void) => void,
        t: DOMHighResTimeStamp,
    ): void {
        if (t - startAt >= this.duration) {
            clearCtx(ctx);
            this.draw(ctx);
            resolve();
            return;
        }

        clearCtx(ctx);
        
        const timing = (t - startAt) / this.duration; // easeInExpo((t - startAt) / this.duration);
        const textLength = this.text.length;
        const currentTextLength = Math.floor(textLength * timing);
        const currentText = this.text.substring(0, currentTextLength);
        const textSize: TextMetrics = ctx.measureText(currentText);
        const height = textSize.actualBoundingBoxAscent - textSize.actualBoundingBoxDescent;
        (new RoundRectAnimation(0, this.x, this.y, textSize.width + this.padding, height + this.padding, 10)).draw(ctx);
        ctx.fillStyle = 'black';
        ctx.font = '30px Arial';
        ctx.fillText(this.text, this.x - (textSize.width / 2), this.y + (height / 2));

        requestAnimationFrame(this._animate.bind(this, ctx, clearCtx, startAt, resolve));
    }

    draw(ctx: CanvasRenderingContext2D): void {
        const textSize: TextMetrics = ctx.measureText(this.text);
        const height = textSize.actualBoundingBoxAscent - textSize.actualBoundingBoxDescent;
        (new RoundRectAnimation(0, this.x, this.y, textSize.width + this.padding, height + this.padding, 10)).draw(ctx);
        ctx.fillStyle = 'black';
        ctx.font = '30px Arial';
        ctx.fillText(this.text, this.x - (textSize.width / 2), this.y + (height / 2));
    }
}
