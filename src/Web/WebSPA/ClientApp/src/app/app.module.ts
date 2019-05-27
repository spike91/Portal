import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { NewsService } from './news/news.service';
import { SearchService } from './shared/services/search.service';
import { SharedModule } from './shared/shared.module';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { NewsComponent } from './news/news.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
      FetchDataComponent,
      NewsComponent,
      SearchBarComponent,
      NewsDetailComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
      HttpClientModule,
      SharedModule.forRoot(),
    FormsModule,
    RouterModule.forRoot([
      { path: 'counter', component: CounterComponent },
      { path: 'news', component: NewsComponent },
        { path: 'news/search/:title', component: NewsComponent },      
        { path: '', component: HomeComponent, pathMatch: 'full' },
        { path: 'news/description/:id', component: NewsDetailComponent },
        { path: '**', component: HomeComponent }
    ])
  ],
    providers: [AppService, NewsService, SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
