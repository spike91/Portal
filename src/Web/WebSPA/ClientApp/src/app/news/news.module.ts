import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';
import { NewsService } from './news.service';

@NgModule({
  declarations: [NewsComponent],
  providers: [NewsService],
  imports: [
      BrowserModule, SharedModule, CommonModule
    ]
})
export class NewsModule { }
