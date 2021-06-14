import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

const baseStyles = style({
  // display: 'block',
  position: 'absolute', // to stack on top of each other
  top: 0,
  left: 0,
  width: '100%',
  height: '100%'
})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnim', [
      transition(':increment', [
        style({
          position: 'relative',
          overflow: 'hidden'
        }),

        query(':enter, :leave', [
          baseStyles
        ], { optional: true }),
        // query(':enter', [
        //  style({
        //    opacity: 0
        //  })
        // ], { optional: true }),

        // to group two animations 
        group([
          query(':leave', [
            animate('250ms ease-in', style({
              opacity: 0,
              transform: 'translateX(-50px)'
            }))
          ], { optional: true }),
  
          query(':enter', [
            style({
              transform: 'translateX(50px)',
              opacity: 0
            }),
            animate('250ms 120ms ease-out', style({
              opacity: 1,
              transform: 'translateX(0)'
            }))
          ], { optional: true })
        ])
      ]),

      transition(':decrement', [
        style({
          position: 'relative',
          overflow: 'hidden'
        }),

        query(':enter, :leave', [
          baseStyles
        ], { optional: true }),
        // query(':enter', [
        //  style({
        //    opacity: 0
        //  })
        // ], { optional: true }),

        // to group two animations 
        group([
          query(':leave', [
            animate('250ms ease-in', style({
              opacity: 0,
              transform: 'translateX(50px)'
            }))
          ], { optional: true }),
  
          query(':enter', [
            style({
              transform: 'translateX(-50px)',
              opacity: 0
            }),
            animate('250ms 120ms ease-out', style({
              opacity: 1,
              transform: 'translateX(0)'
            }))
          ], { optional: true })
        ])
      ]),

      transition('* => secondary', [
        style({
          position: 'relative',
          // overflow: 'hidden'
        }),

        query(':enter, :leave', [
          baseStyles
        ], { optional: true }),
  
        group([
          query(':leave', [
            animate('250ms ease-in', style({
              opacity: 0,
              transform: 'scale(0.8)'
            }))
          ], { optional: true }),
  
          query(':enter', [
            style({
              transform: 'scale(1.2)',
              opacity: 0
            }),
            animate('250ms 120ms ease-out', style({
              opacity: 1,
              transform: 'scale(1)'
            }))
          ], { optional: true })
        ])
      ]),

      transition('secondary => *', [
        style({
          position: 'relative',
          // overflow: 'hidden'
        }),

        query(':enter, :leave', [
          baseStyles
        ], { optional: true }),
  
        group([
          query(':leave', [
            animate('250ms ease-in', style({
              opacity: 0,
              transform: 'scale(1.25)'
            }))
          ], { optional: true }),
  
          query(':enter', [
            style({
              transform: 'scale(0.8)',
              opacity: 0
            }),
            animate('250ms 120ms ease-out', style({
              opacity: 1,
              transform: 'scale(1)'
            }))
          ], { optional: true })
        ])
      ])

    ]),

    trigger('bgAnim', [
      transition(':leave', [
        animate(1000, style({
          opacity: 0
        }))
      ])
    ]),

    trigger('fadeAnim', [
      transition(':enter', [
        style({
          opacity: 0
        }),
        animate(250, style({
          opacity: 1
        }))
      ]),

      transition(':leave', [
        animate(250, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit{

  backgrounds: string[] = [
    'https://images.unsplash.com/photo-1623171959896-1c81bed7f8fb?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max'
  ]

  loadingBGImage: boolean

  dateTime: Observable<Date>

  ngOnInit() {
    // for making time to update without reloading the page
    this.dateTime = timer(0, 1000).pipe(
      map(() => {
        return new Date()
      })
    )
  }
  
  prepareRoute(outlet: RouterOutlet) {
    if (outlet.isActivated) {
      const tab = outlet.activatedRouteData['tab'] 
      if (!tab) return 'secondary'
      return tab
    }
  }

  async changeBGImage() {
    this.loadingBGImage = true;
    const result = await fetch('https://source.unsplash.com/random/1920x1080', {
      method: 'HEAD'
    })

    // if the image is same as the one we added
    const alreadyGot = this.backgrounds.includes(result.url)
    if (alreadyGot) {
      // same image as the earlier one so re-run the func.
      return this.changeBGImage()
    }

    this.backgrounds.push(result.url)
  }

  onBGImageLoad(imgEvent: Event) {

    /** BG image has loaded so now, remove old BG 
     * from the backgrounds array
     */

    const imgElement = imgEvent.target as HTMLImageElement
    const src = imgElement.src
    this.backgrounds = this.backgrounds.filter(b => b === src)
    // this.backgrounds = [src]
    this.loadingBGImage = false
  }

}

