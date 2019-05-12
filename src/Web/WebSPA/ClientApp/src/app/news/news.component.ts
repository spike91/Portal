import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NewsService } from './news.service';
import { ConfigurationService } from '../shared/services/configuration.service';

import { IPost } from '../shared/models/post.model';
import { IPostItem } from '../shared/models/postItem.model';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
    news: IPost;
    authenticated: boolean = false;
    authSubscription: Subscription;
    errorReceived: boolean;

    constructor(private service: NewsService, private configurationService: ConfigurationService) {
        //configurationService.load();
    }

    ngOnInit() {
         //Configuration Settings:
        if (this.configurationService.isReady)
            this.loadData();
        else
            this.configurationService.settingsLoaded$.subscribe(x => {
                this.loadData();
            });
        //this.loadData();
    }

    loadData() {
        this.getNews(20, 0);
    }

    getNews(pageSize: number, pageIndex: number) {
        this.errorReceived = false;
        this.service.getNews(pageIndex, pageSize)
            .pipe(catchError((err) => this.handleError(err)))
            .subscribe(data => {
                this.news = data;
                //this.paginationInfo = {
                //    actualPage: catalog.pageIndex,
                //    itemsPage: catalog.pageSize,
                //    totalItems: catalog.count,
                //    totalPages: Math.ceil(catalog.count / catalog.pageSize),
                //    items: catalog.pageSize
                //};
            });
    }

    private handleError(error: any) {
        this.errorReceived = true;
        return Observable.throw(error);
    }
}
