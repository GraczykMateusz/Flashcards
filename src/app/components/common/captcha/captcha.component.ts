import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NgxCaptchaService} from '@binssoft/ngx-captcha';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CaptchaComponent implements OnInit {

  captchaStatus: any = null;
  captchaConfig: any = {
    length: 6,
    back: {
      stroke: "#000000",
      solid: "#dcdcdc"
    },
    font: {
      color: "#000000",
      size: "40px"
    }
  };

  constructor(private captchaService: NgxCaptchaService) {
  }

  ngOnInit() {
    this.captchaService.captchStatus.subscribe((status) => {
      this.captchaStatus = status;
      if (status == false) {
        alert("Opps!\nCaptcha mismatch");
      } else if (status == true) {
        alert("Success!\nYou are right");
      }
    });
  }
}
