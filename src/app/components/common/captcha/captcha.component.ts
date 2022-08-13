import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NgxCaptchaComponent, NgxCaptchaService} from '@binssoft/ngx-captcha';
import {Subscription} from 'rxjs';
import {CAPTCHA_CONFIG} from './config/captcha-config';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CaptchaComponent implements OnInit, OnDestroy {

  readonly captchaConfig = CAPTCHA_CONFIG;
  private captchaStatus!: Subscription;

  constructor(private captchaService: NgxCaptchaService) {
  }

  ngOnInit() {
    this.captchaStatus = this.captchaService.captchStatus
      .subscribe(status => {
        if (status == false) {
          alert("Opps!\nCaptcha mismatch");
        } else if (status == true) {
          alert("Success!\nYou are right");
        }
      });
  }

  ngOnDestroy(): void {
    this.captchaStatus.unsubscribe();
  }
}
