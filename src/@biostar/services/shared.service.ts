import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  currentLang: string;
  changePassword: boolean;
  isOrganizationFound: boolean;
  isFirstLogin: boolean;
  constructor(public translate: TranslateService) {}

  initLang() {
    localStorage.getItem('currentLang')
      ? localStorage.getItem('currentLang')
      : localStorage.setItem('currentLang', 'en');
    this.currentLang = localStorage.getItem('currentLang') || 'en';
    this.translate.use(this.currentLang);
  }

  changeCurrentLang(lang: string) {
    const storedLang = localStorage.getItem('currentLang');
    if (storedLang == lang) {
      return;
    } else {
      this.translate.use(lang);
      localStorage.setItem('currentLang', lang);
      location.reload();
    }
  }
  dir() {
    let dir = localStorage.getItem('currentLang');
    return dir;
  }
}
