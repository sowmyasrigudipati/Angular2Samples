import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CollectionModule } from './collection.module';
const platform = platformBrowserDynamic();
platform.bootstrapModule(CollectionModule);
