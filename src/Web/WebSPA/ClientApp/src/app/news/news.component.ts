import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
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
    notFound: string;
    searchTitle: string;
    news: IPost;
    newsItems: IPostItem[];
    authenticated: boolean = false;
    authSubscription: Subscription;
    errorReceived: boolean;

    constructor(private service: NewsService, private configurationService: ConfigurationService, private route: ActivatedRoute) {
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

        this.route.paramMap.subscribe(paramMap => {
            this.searchTitle = paramMap.get("title");
            if (typeof this.searchTitle == 'string')
                this.getNewsByTitle(this.searchTitle, 10, 0);        
        });
    }

    loadData() {
        //this.getNews(20, 0);
    }

    getNewsByTitle(title: string, pageSize: number, pageIndex: number) {
        this.errorReceived = false;
        this.service.getNewsByTitle(title, pageIndex, pageSize)
            .pipe(catchError((err) => this.handleError(err)))
            .subscribe(data => {
                this.news = data;
                this.newsItems = data.data;
            });
    }

    getNews(pageSize: number, pageIndex: number) {
        this.errorReceived = false;
        this.service.getNews(pageIndex, pageSize)
            .pipe(catchError((err) => this.handleError(err)))
            .subscribe(data => {
                this.news = data;
                this.newsItems = data.data;
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
        this.newsItems = [];
        this.errorReceived = true;
        return Observable.throw(error);
    }
}
