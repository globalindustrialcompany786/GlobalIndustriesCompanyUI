import { Component, ElementRef, AfterViewInit, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-index-introduction',
  templateUrl: './index-introduction.component.html',
  styleUrls: ['./index-introduction.component.css']
})
export class IndexIntroductionComponent implements AfterViewInit {
  constructor() {}

  @ViewChildren('counter') counterElements!: QueryList<ElementRef>;

  counters = [
    { iconClass: 'fa fa-thumbs-o-up', value: 2147, label: 'Happy Customers', colored: true },
    { iconClass: 'fa fa-group', value: 3275, label: 'Registered Members', colored: true },
    { iconClass: 'fa fa-shopping-cart', value: 289, label: 'Project Completed', colored: true },
    { iconClass: 'fa fa-user', value: 1563, label: 'Satisfied Coustomer', colored: true }
  ];

  ngAfterViewInit() {
    this.animateCounters();
  }

  private animateCounters() {
    this.counterElements.forEach((element, index) => {
      const targetValue = this.counters[index].value;
      this.animateCounter(targetValue, element.nativeElement, index);
    });
  }

  private animateCounter(targetValue: number, element: HTMLElement, index: number) {
    let current = 0;
    const step = Math.ceil(targetValue / 50);
    const interval = setInterval(() => {
      current += step;
      if (current >= targetValue) {
        current = targetValue;
        clearInterval(interval);
      }
      element.innerText = current.toString();
    }, 80);

    this.counters[index].colored = true; // Add class 'colored' when animating
  }
}
