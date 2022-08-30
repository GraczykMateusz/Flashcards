import {animate, group, query, style, transition, trigger} from '@angular/animations';

export const blurAnimation = trigger('blurAnimation', [
  // Transition between any two states
  transition('* <=> *', [
    // Events to apply
    // Defined style and animation function to apply
    // Config object with optional set to true to handle when element not yet added to the DOM
    query(':enter, :leave', style({ position: 'fixed', width: '100%', zIndex: 2 }), { optional: true }),
    // group block executes in parallel
    group([
      query(':enter', [
        style({ opacity: 0, filter: 'blur(1em)' }),
        animate('0.8s ease-in', style({ opacity: 1, filter: 'blur(0)' }))
      ], { optional: true }),
      query(':leave', [
        style({ opacity: 1, filter: 'blur(0)' }),
        animate('0.8s ease-out', style({ opacity: 0, filter: 'blur(1em)' }))
      ], { optional: true })
    ])
  ])
]);
