import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {NgxCaptchaService} from '@binssoft/ngx-captcha';
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
  @Output() captchaStatusEmitter = new EventEmitter<any>();
  private captchaStatus!: Subscription;

  constructor(private captchaService: NgxCaptchaService) {
  }

  ngOnInit() {
    this.captchaStatus = this.captchaService.captchStatus
      .subscribe(status => {
        if (status == null) return;
        this.captchaStatusEmitter.next(status);
      });
  }

  ngOnDestroy(): void {
    this.captchaStatus.unsubscribe();
  }
}
