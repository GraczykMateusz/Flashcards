import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {NgxCaptchaComponent, NgxCaptchaService} from '@binssoft/ngx-captcha';
import {Subscription} from 'rxjs';
import {CAPTCHA_CONFIG} from './config/captcha-config';
import {animate, keyframes, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss'],
  animations: [
    trigger('shake', [
      transition('* <=> *', [
        animate('220ms', keyframes([
          style({ transform: 'translateX(4px)' }),
          style({ transform: 'translateX(-4px)' }),
          style({ transform: 'translateX(4px)' }),
          style({ transform: 'translateX(-4px)' })
        ]))
      ])
    ])
  ],
  encapsulation: ViewEncapsulation.None
})

export class CaptchaComponent implements OnInit, OnDestroy {

  @ViewChild(NgxCaptchaComponent) child!: NgxCaptchaComponent;
  @Output() captchaStatusEmitter = new EventEmitter<any>();
  readonly captchaConfig = CAPTCHA_CONFIG;
  private captchaStatusSub!: Subscription;
  captchaStatus!: boolean;
  animationTrigger = false;

  constructor(private captchaService: NgxCaptchaService) {
  }

  ngOnInit() {
    this.captchaStatusSub = this.captchaService.captchStatus
      .subscribe(status => {
        console.log(status);
        if (status == null) return;
        if (status == false) this.animationTrigger = !this.animationTrigger;
        this.captchaStatus = status;
        this.captchaStatusEmitter.next(status);
      });
  }

  ngOnDestroy(): void {
    this.captchaService.setCaptchaStatus(null);
    this.captchaStatusSub.unsubscribe();
  }
}
