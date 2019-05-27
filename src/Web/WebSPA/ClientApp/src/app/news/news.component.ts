import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, Subscription, from } from 'rxjs';
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
    sortBy: string;
    itemCount: number;
    notFound: string;
    searchTitle: string;
    news: IPost;
    newsItemsObservable: Observable<IPostItem[]>
    newsItems: IPostItem[];
    authenticated: boolean = false;
    authSubscription: Subscription;
    errorReceived: boolean;

    constructor(private service: NewsService, private configurationService: ConfigurationService, private route: ActivatedRoute) {
        //configurationService.load();
        this.sortBy = 'date';
        this.itemCount = 10;
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
        this.getNews(20, 0);
    }

    sortByChanged(val: string) {
        this.sortBy = val;
    }

    itemCountChanged(val: number) {
        this.itemCount = val;
    }

    loadNews(title: string, pageSize: number, pageIndex: number) {

    }

    getNewsByTitle(title: string, pageSize: number, pageIndex: number) {
        //this.errorReceived = false;
        //this.service.getNewsByTitle(title, pageIndex, pageSize)
        //    .pipe(catchError((err) => this.handleError(err)))
        //    .subscribe(data => {
        //        this.news = data;
        //        this.newsItems = data.data;
        //    });
    }

    getNews(pageSize: number, pageIndex: number) {
        this.errorReceived = false;
        //this.service.getNews(pageIndex, pageSize)
        //    .pipe(catchError((err) => this.handleError(err)))
        //    .subscribe(data => {
        //        this.news = data;
        //        this.newsItems = data.data;
        //        //this.paginationInfo = {
        //        //    actualPage: catalog.pageIndex,
        //        //    itemsPage: catalog.pageSize,
        //        //    totalItems: catalog.count,
        //        //    totalPages: Math.ceil(catalog.count / catalog.pageSize),
        //        //    items: catalog.pageSize
        //        //};
        //    });
        
        let items = [
            { id: 1, date: new Date('05-05-2019'), title: 'Title 1', text: 'Some text.....', author: 'Firstname Lastname' } as IPostItem,
            { id: 2, date: new Date('05-05-2019'), title: 'Title 2', text: 'Some text.....', author: 'Firstname Lastname' } as IPostItem,
            { id: 3, date: new Date('05-05-2019'), title: 'Title 3', text: 'Some text.....', author: 'Firstname Lastname' } as IPostItem,
            { id: 4, date: new Date('05-05-2019'), title: 'Title 4', text: 'Some text.....', author: 'Firstname Lastname' } as IPostItem,
            { id: 5, date: new Date('05-05-2019'), title: 'Title 5', text: 'Some text.....', author: 'Firstname Lastname' } as IPostItem,
            { id: 6, date: new Date('05-05-2019'), title: 'Title 6', text: 'Some text.....', author: 'Firstname Lastname' } as IPostItem,
            { id: 7, date: new Date('05-05-2019'), title: 'Title 7', text: 'Some text.....', author: 'Firstname Lastname' } as IPostItem,
            { id: 8, date: new Date('05-05-2019'), title: 'Title 8', text: 'Some text.....', author: 'Firstname Lastname' } as IPostItem,
            { id: 9, date: new Date('05-05-2019'), title: 'Title 9', text: 'Some text.....', author: 'Firstname Lastname' } as IPostItem,
            { id: 10, date: new Date('05-05-2019'), title: 'Title 10', text: 'Some text.....', author: 'Firstname Lastname' } as IPostItem

        ];

        this.newsItemsObservable = from([items]);
        this.news = { data: items, count: 1, pageIndex: 0, pageSize: 20 } as IPost;
    }

    private handleError(error: any) {
        this.newsItems = [];
        this.errorReceived = true;
        return Observable.throw(error);
    }
}
