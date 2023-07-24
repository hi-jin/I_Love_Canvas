import AbstractAnimation from "../core/abstract_animation";

export default class BlackFullScreenAnimation extends AbstractAnimation {
    private _fullScreenCanvas: HTMLCanvasElement;
    private _midPoint: { x: number, y: number };
    private _amountToMove: number;
    private _amountToMovePerMillisecond: number;

    constructor(fullScreenCanvas: HTMLCanvasElement, duration: number) {
        super(duration);
        this._fullScreenCanvas = fullScreenCanvas;
        this._midPoint = {
            x: Math.random() * this._fullScreenCanvas.width,
            y: Math.random() * this._fullScreenCanvas.height
        };
        this._amountToMove = Math.max(this._midPoint.x, this._midPoint.y, this._fullScreenCanvas.width - this._midPoint.x, this._fullScreenCanvas.height - this._midPoint.y) * 2;
        this._amountToMovePerMillisecond = this._amountToMove / this.duration;
    }

    protected _animate(t: DOMHighResTimeStamp): void {
        this._currentTickTime = t;

        const context = this._fullScreenCanvas.getContext('2d');
        if (!context) return;

        if (this.isFinished) {
            context.fillStyle = 'black';
            context.fillRect(0, 0, this._fullScreenCanvas.width, this._fullScreenCanvas.height);
            return;
        }

        context.clearRect(0, 0, this._fullScreenCanvas.width, this._fullScreenCanvas.height);

        context.fillStyle = 'black';
        context.arc(this._midPoint.x, this._midPoint.y, this._amountToMove * this._easeInExpo(this._amountToMovePerMillisecond * this._currentTickTime / this._amountToMove), 0, Math.PI * 2);
        context.fill();
        
        requestAnimationFrame(this._animate.bind(this));
    }
    
    private _easeInExpo(x: number): number {
        return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
    }
}
