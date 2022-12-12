import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ConfigService } from "src/@vex/services/config.service";

@Injectable({
  providedIn: "root",
})
export class SharedService {
  currentLang: string;
  changePassword: boolean;
  isOrganizationFound: boolean;
  isFirstLogin: boolean;
  constructor(public translate: TranslateService,
    private configService: ConfigService,
    ) {}

  initLang() {
    if (localStorage.getItem("currentLang")) {
      if (localStorage.getItem("currentLang") == "ar") {
        this.configService.updateConfig({
          rtl: true,
        });
      } else {
        this.configService.updateConfig({
          rtl: false,
        });
      }
    } else {
      localStorage.setItem("currentLang", "en");
    }

    this.currentLang = localStorage.getItem("currentLang") || "en";
    this.translate.use(this.currentLang);
    
  }

  changeCurrentLang(lang: string) {
    const storedLang = localStorage.getItem("currentLang");
    if (storedLang == lang) {
      return;
    } else {
      this.translate.use(lang);
      localStorage.setItem("currentLang", lang);
      location.reload();
    }
  }
  dir() {
    let dir = localStorage.getItem("currentLang");
    return dir;
  }
}
