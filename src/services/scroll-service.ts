import { fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const getScrollAsStream = (): Observable<number> => {
  const wheelEvent = fromEvent(window, 'wheel');
  const scrollEvent = fromEvent(window, 'scroll');
  const touchEvent = fromEvent(window, 'touchmove');
  const mouseWheelEvent = fromEvent(window, 'mousewheel');
  const resizeEvent = fromEvent(window, 'resize');

  const stream = merge(
    scrollEvent.pipe(map((): number => getScroll())),
    touchEvent.pipe(map((): number => getScroll())),
    wheelEvent.pipe(map((): number => getScroll())),
    mouseWheelEvent.pipe(map((): number => getScroll())),
    resizeEvent.pipe(map((): number => getScroll()))
  );

  return stream;
};

const getScroll = (): number => {
  const currentScroll = window.pageYOffset;
  const container = document.getElementById('home');

  if (container) {
    let percent = currentScroll / container.clientHeight;
    percent = Math.max(percent, 0);
    percent = Math.min(percent, 1);
    return percent;
  }

  return 0;
};

export { getScrollAsStream, getScroll };
