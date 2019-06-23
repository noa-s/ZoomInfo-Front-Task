import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { TriviaComponent } from './components/trivia/trivia.component';
import { ResultsComponent } from './components/results/results.component';
import { RouterModule, Routes } from '@angular/router';
import { Approutes } from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TriviaComponent,
    ResultsComponent
  ],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserModule,
    NgbModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot(Approutes, { useHash: false },
   //   { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
