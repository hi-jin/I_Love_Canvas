/**
 * 스택에 저장되는 레코드
 */
export default abstract class DrawRecord {
    /**
     * 애니메이션을 위한 함수
     * 
     * canvas에 애니메이션을 그린다.
     */
    abstract animate(
        ctx: CanvasRenderingContext2D,
        clearCtx: (ctx: CanvasRenderingContext2D) => void,
    ): Promise<void>;

    /**
     * 애니메이션 완료 후 결과만 그리는 함수
     */
    abstract draw(
        ctx: CanvasRenderingContext2D,
    ): void;
}
