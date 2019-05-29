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
    hasNextPage: boolean;
    sortBy: string;
    itemCount: number;
    pageCount: number;
    activePage: number;
    prevPage: number;
    nextPage: number;
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
        this.hasNextPage = true;
        this.activePage = 0;
        this.pageCount = 10;
    }

    ngOnInit() {
         //Configuration Settings:
        if (this.configurationService.isReady)
            this.loadData();
        else
            this.configurationService.settingsLoaded$.subscribe(x => {
                this.loadData();
            });        
    }

    loadData() {
        this.route.paramMap.subscribe(paramMap => {
            this.searchTitle = paramMap.get("title");
            console.log(this.searchTitle);

            if (typeof this.searchTitle == 'string')
                this.loadNews(this.searchTitle, this.itemCount, this.activePage);
            else
                this.loadNews(null, this.itemCount, this.activePage);
        });
    }

    sortByChanged(val: string) {
        this.sortBy = val;
        console.log('sort by: ' + this.sortBy);
    }

    itemCountChanged(val: number) {
        this.itemCount = val;
        console.log('item count: ' + this.itemCount);
    }

    activePageChanged(event) {
        console.log(event);
        //this.activePage += 0;
        //this.prevPage = this.activePage - 1;
        //this.nextPage = this.activePage + 1;
        //console.log('active page: ' + this.activePage);
    }

    goNextPage() {
        console.log(this.news.count / this.news.pageSize);
        if (this.hasNextPage) {
            console.log('next page: ' + this.activePage);
            this.loadNews(this.searchTitle, this.itemCount, ++this.activePage);
        }
    }

    goPrevPage() {
        if (this.news != null && this.activePage > 0) {
            console.log('prev page: ' + this.activePage);
            this.loadNews(this.searchTitle, this.itemCount, --this.activePage);
        }
    }

    loadNews(title: string, pageSize: number, pageIndex: number) {
        this.getNewsByTitle(title, pageSize, pageIndex).subscribe((data: IPost) => {
            this.news = data;
        });
    }

    getNewsByTitle(title: string, pageSize: number, pageIndex: number) {
        //this.errorReceived = false;
        //this.service.getNewsByTitle(title, pageIndex, pageSize)
        //    .pipe(catchError((err) => this.handleError(err)))
        //    .subscribe(data => {
        //        this.news = data;
        //        this.newsItems = data.data;
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

        let found = items.filter(it => title == null || title != null && it.title.includes(title));
        
        return new Observable<IPost>(observer => {
            setTimeout(() => {
                observer.next({ data: found, count: 10, pageIndex: 0, pageSize: 20 } as IPost);
            }, 1000);
        });
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

        return this.getNewsByTitle(null, 10, 0);
    }

    private handleError(error: any) {
        this.newsItems = [];
        this.errorReceived = true;
        return Observable.throw(error);
    }
}
