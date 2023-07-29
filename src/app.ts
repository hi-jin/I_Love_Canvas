import BlackFullScreenAnimation from "./animations/black_full_screen_animation";
import RoundRectAnimation from "./animations/round_rect_animation";
import BrowserScreen from "./core/screen";
import DrawStack from "./draw_stack/draw_stack";

export default class App {
    private stack: DrawStack = new DrawStack();
    private canvas: HTMLCanvasElement = document.createElement('canvas');

    constructor() {
        this.removeStyles();
        this.setCanvas();
        BrowserScreen.instance.addOnResizeCallback(() => this.onResize());
        BrowserScreen.instance.addOnClickCallback(this.onClick.bind(this));
    }

    private onResize(): void {
        this.setCanvasStyle();
    }

    private onClick(e: MouseEvent): void {
        const ctx = this.canvas.getContext('2d');
        if (ctx) {
            this.stack.pushAndAnimate(new RoundRectAnimation(200, e.clientX, e.clientY, 100, 50, 10), ctx);
        }
    }

    private removeStyles(): void {
        document.body.style.margin = '0';
        document.body.style.padding = '0';
    }

    private setCanvas(): void {
        this.removeCanvas();
        this.setCanvasStyle();
        document.body.appendChild(this.canvas);
        const ctx = this.canvas.getContext('2d');
        if (ctx) {
            this.stack.pushAndAnimate(new BlackFullScreenAnimation(1000), ctx);
        }
    }

    private removeCanvas(): void {
        if (this.canvas.parentElement) {
            this.canvas.parentElement.removeChild(this.canvas);
        }
    }

    private setCanvasStyle(): void {
        const browserScreen = BrowserScreen.instance;
        this.canvas.width = browserScreen.width;
        this.canvas.height = browserScreen.height;

        const context = this.canvas.getContext('2d');
        if (!context) return;

        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        context.fillStyle = 'black';
        context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
