// angular2
import {provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {AppCmp} from './app/components/app';

// 3rd party dependencies
import {TranslateService} from 'ng2-translate/ng2-translate';

// app
import {AppConfig} from './frameworks/app.framework/core/services/app-config.service';
import {CORE_APP_PROVIDERS} from './frameworks/app.framework/_providers';
import {Multilingual} from './frameworks/app.framework/i18n/services/multilingual.service';

// Web
import {COMMON_WEB_PROVIDERS} from './frameworks/web.framework/_providers';

// Config
AppConfig.DEBUG.LEVEL_4 = true;

// include for production builds
// import {enableProdMode} from 'angular2/core';
// enableProdMode() // include for production builds

bootstrap(AppCmp, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  provide(LocationStrategy, { useClass: HashLocationStrategy }),
  CORE_APP_PROVIDERS,
  provide(Multilingual, {
    useFactory: (translate) => {
      Multilingual.SUPPORTED_LANGUAGES = AppConfig.SUPPORTED_LANGUAGES;
      return new Multilingual(translate);
    },
    deps: [TranslateService]
  }),
  COMMON_WEB_PROVIDERS
])
.catch(err => console.error(err));

// In order to start the Service Worker located at "./sw.js"
// uncomment this line. More about Service Workers here
// https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
// if ('serviceWorker' in navigator) {
//   (<any>navigator).serviceWorker.register('./sw.js').then(function(registration) {
//     console.log('ServiceWorker registration successful with scope: ',    registration.scope);
//   }).catch(function(err) {
//     console.log('ServiceWorker registration failed: ', err);
//   });
// }
