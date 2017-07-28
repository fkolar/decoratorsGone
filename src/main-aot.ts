import { platformBrowser }    from '@angular/platform-browser';
import { AppModuleNgFactory } from '../out-aot/src/app/app.module.ngfactory';

console.log('Running AOT compiled');
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);