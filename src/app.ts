import BlackFullScreenAnimation from "./animations/black_full_screen_animation";
import AbstractAnimation from "./core/abstract_animation";
import BrowserScreen from "./core/screen";

export default class App {
    private canvas: HTMLCanvasElement = document.createElement('canvas');
    private animation?: AbstractAnimation;

    constructor() {
        this.removeStyles();
        this.setCanvas();
        BrowserScreen.instance.addOnResizeCallback(() => this.onResize());
    }

    private onResize(): void {
        this.setCanvasStyle();
    }

    private removeStyles(): void {
        document.body.style.margin = '0';
        document.body.style.padding = '0';
    }

    private setCanvas(): void {
        this.removeCanvas();
        this.setCanvasStyle();
        document.body.appendChild(this.canvas);
        this.animation = new BlackFullScreenAnimation(this.canvas, 1000);
        this.animation.start();
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
