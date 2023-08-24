import { Injectable } from '@angular/core';
import {ViewportScroller} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor(private viewportScroller: ViewportScroller) { }

  scrollTo(anchor: string): void {
    this.viewportScroller.scrollToAnchor(anchor);
  }

  behaviorScrollTo(elementId: string): void {
    const yOffset = 10; // Додаткове зміщення, якщо потрібно
    const element = document.getElementById(elementId);

    if (element) {
      const options: ScrollToOptions = {
        top: element.offsetTop + yOffset,
        behavior: 'smooth' // Встановлюємо плавне прокручування
      };

      // this.viewportScroller.scrollToPosition([0, element.offsetTop + yOffset]);
      window.scrollTo(options);
    }
  }
}
