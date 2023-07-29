import DrawRecord from "./draw_record";

/**
 * canvas에 그린 객체(Record)들을 저장하는 스택
 */
export default class DrawStack {
    private _stack: DrawRecord[] = [];

    constructor() { }

    drawAll(
        ctx: CanvasRenderingContext2D,
        stack: DrawRecord[] = this._stack,
    ) {
        this.eraseAll(ctx);
        stack.forEach(record => record.draw(ctx));
    }

    pushAndAnimate(record: DrawRecord, ctx: CanvasRenderingContext2D) {
        this._stack.push(record);
        record.animate(ctx, this.drawAll.bind(this, ctx, this._stack.slice(0, this._stack.length - 1)));
    }

    pushAndDraw(record: DrawRecord, ctx: CanvasRenderingContext2D) {
        this._stack.push(record);
        record.draw(ctx);
    }

    eraseAll(ctx: CanvasRenderingContext2D) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    deleteAll() {
        this._stack = [];
    }
}
