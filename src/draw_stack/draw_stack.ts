import BrowserScreen from "../core/screen";
import DrawRecord from "./draw_record";

/**
 * canvas에 그린 객체(Record)들을 저장하는 스택
 */
export default class DrawStack {
    private _loadingQueue: (() => Promise<void>)[] = [];
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
        const _pushAndAnimate = async () => {
            this._stack.push(record);
            await record.animate(ctx, this.drawAll.bind(this, ctx, this._stack.slice(0, this._stack.length - 1)));
        }

        if (this._loadingQueue.length > 0) {
            this._loadingQueue.push(_pushAndAnimate);
        } else {
            this._loadingQueue.push(_pushAndAnimate);
            this.animateLoadingLoop();
        }
    }

    async animateLoadingLoop() {
        if (this._loadingQueue.length === 0) return;

        await this._loadingQueue[0]();
        this._loadingQueue.shift();
        this.animateLoadingLoop();
    }

    pushAndDraw(record: DrawRecord, ctx: CanvasRenderingContext2D) {
        this._stack.push(record);
        record.draw(ctx);
    }

    eraseAll(ctx: CanvasRenderingContext2D) {
        ctx.clearRect(0, 0, BrowserScreen.instance.width, BrowserScreen.instance.height);
    }

    deleteAll() {
        this._stack = [];
    }
}
