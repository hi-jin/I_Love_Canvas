export default abstract class AbstractAnimation {
    protected _duration: number;
    protected _currentTickTime: number = 0;

    constructor(duration: number) {
        this._duration = duration;
    }

    public get duration(): number {
        return this._duration;
    }

    public get currentTickTime(): number {
        return this._currentTickTime;
    }

    public start(): void {
        requestAnimationFrame(this._animate.bind(this));
    }

    protected abstract _animate(t: DOMHighResTimeStamp): void;

    public get isFinished(): boolean {
        return this._currentTickTime >= this._duration;
    }
}
