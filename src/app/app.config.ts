import { HttpClientModule } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {FormsModule} from "@angular/forms";

export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom(FormsModule), importProvidersFrom(HttpClientModule), provideRouter(routes)]
};
