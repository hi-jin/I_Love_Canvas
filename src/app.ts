import BlackFullScreenAnimation from "./animations/black_full_screen_animation";
import RoundRectAnimation from "./animations/round_rect_animation";
import RoundRectTextAnimation from "./animations/round_rect_text_animation";
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
        const text = prompt("");
        const ctx = this.canvas.getContext('2d');
        if (ctx && text) {
            this.stack.pushAndAnimate(new RoundRectTextAnimation(200, e.clientX, e.clientY, text), ctx);
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
        this.canvas.width = browserScreen.width * window.devicePixelRatio;
        this.canvas.height = browserScreen.height * window.devicePixelRatio;
        this.canvas.style.width = `${browserScreen.width}px`;
        this.canvas.style.height = `${browserScreen.height}px`;

        const context = this.canvas.getContext('2d');
        if (!context) return;
        
        context.scale(window.devicePixelRatio, window.devicePixelRatio);
        context.clearRect(0, 0, browserScreen.width, browserScreen.height);
        context.fillStyle = 'black';
        context.fillRect(0, 0, browserScreen.width, browserScreen.height);
    }
}
