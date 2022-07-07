import { Vue, Component } from 'vue-property-decorator';

const MIN_DISTANCE = 10;

@Component
export default class TouchMixin extends Vue {
  private pos = {
    startX: 0,
    startY: 0,
    deltaX: 0,
    deltaY: 0,
  }

  get isVertical(): boolean {
    return this.isVerticalDirection(Math.abs(this.pos.deltaX),
      Math.abs(this.pos.deltaY));
  }

  private touchStart(e: TouchEvent) {
    this.pos.startX = e.touches[0].clientX;
    this.pos.startY = e.touches[0].clientY;
  }

  private touchMove(e: TouchEvent) {
    this.pos.deltaX = e.touches[0].clientX - this.pos.startX;
    this.pos.deltaY = e.touches[0].clientY - this.pos.startY;
  }

  private isVerticalDirection(x: number, y: number): boolean {
    return y > x && y > MIN_DISTANCE;
  }
}
