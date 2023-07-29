export default class BrowserScreen {
    private static _instance: BrowserScreen;

    constructor() {
        if (BrowserScreen._instance) {
            throw new Error('Cannot instantiate a singleton class');
        }
        BrowserScreen._instance = this;
    }

    public static get instance(): BrowserScreen {
        if (!BrowserScreen._instance) {
            BrowserScreen._instance = new BrowserScreen();
        }
        return BrowserScreen._instance;
    }

    public get width(): number {
        return window.innerWidth;
    }

    public get height(): number {
        return window.innerHeight;
    }

    public addOnResizeCallback(callback: Function): void {
        window.addEventListener('resize', () => callback());
    }

    public addOnClickCallback(callback: (e: MouseEvent) => void): void {
        window.addEventListener('click', (e: MouseEvent) => callback(e));
    }
}
