export function getScrollTop() {
  let scrollTop = 0;
  let bodyScrollTop = 0;
  let documentScrollTop = 0;
  if (document.body) {
    bodyScrollTop = document.body.scrollTop;
  }
  if (document.documentElement) {
    documentScrollTop = document.documentElement.scrollTop;
  }
  scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
  return scrollTop + 2;
}

export function getScrollHeight() {
  let scrollHeight = 0;
  let bodyScrollHeight = 0;
  let documentScrollHeight = 0;
  if (document.body) {
    bodyScrollHeight = document.body.scrollHeight;
  }
  if (document.documentElement) {
    documentScrollHeight = document.documentElement.scrollHeight;
  }
  scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
  return scrollHeight;
}

export function getWindowHeight() {
  let windowHeight = 0;
  if (document.compatMode === 'CSS1Compat') {
    windowHeight = document.documentElement.clientHeight;
  } else {
    windowHeight = document.body.clientHeight;
  }
  return windowHeight;
}

class ScrollWatcher {
  private handlersMap: Map<string, Set<(type: string, isReturn: boolean) => any>>;

  constructor() {
    this.handlersMap = new Map();
  }

  on(target: string, handler: (type: string, isReturn: boolean) => any) {
    this.registerHandler(target, handler);
    setTimeout(() => {
      document.removeEventListener('scroll', this.handleScroll.bind(this));
      document.addEventListener('scroll', this.handleScroll.bind(this));
    }, 100);
  }

  off(target: string, handler?: (type: string, isReturn: boolean) => any) {
    const matchHandler = this.handlersMap.get(target);
    if (handler && matchHandler) {
      for (const item of matchHandler) {
        if (item === handler) {
          matchHandler.delete(handler);
        }
      }
    } else if (!handler) {
      this.handlersMap.delete(target);
    }
    if (this.handlersMap.size === 0) {
      document.removeEventListener('scroll', this.handleScroll);
    }
  }

  private registerHandler(target: string, handler: (type: string, isReturn: boolean) => any) {
    const matchHandler = this.handlersMap.get(target) || new Set();
    if (handler) {
      matchHandler.add(handler);
      this.handlersMap.set(target, matchHandler);
    }
    this.handlersMap.set(target, matchHandler);
  }

  private handleScroll() {
    const scrollTop = getScrollTop();
    const isBottom = this.handlersMap.has('bottom') && (scrollTop + getWindowHeight() > getScrollHeight());
    for (const [type] of this.handlersMap) {
      const handlers = this.handlersMap.get(type);
      const el: any = document.querySelector(type);
      if (type === 'bottom') {
        if (isBottom) {
          this.notifyHandlers(type, true, handlers);
        } else {
          this.notifyHandlers(type, false, handlers);
        }
      } else if (el) {
        if (scrollTop > el.offsetTop) {
          this.notifyHandlers(type, true, handlers);
        } else {
          this.notifyHandlers(type, false, handlers);
        }
      }
    }
  }

  private notifyHandlers(
    type: string,
    isReturn: boolean,
    handlers?: Set<(type: string, isReturn: boolean) => any>,
  ) {
    if (handlers) {
      for (const handler of handlers) {
        handler(type, isReturn);
      }
    }
  }
}

const swInstance = new ScrollWatcher();

export default swInstance;
