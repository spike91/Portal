import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NewsService } from '../news/news.service';
import { IPostItem } from '../shared/models/postItem.model';


@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {
    id: string;
    post: IPostItem;
    errorReceived: boolean;

    constructor(private service: NewsService, private route: ActivatedRoute) { }

    ngOnInit() {        
        this.route.paramMap.subscribe(paramMap => {
            this.id = paramMap.get("id") || "0";
            if (parseInt(this.id) > 0)
                this.getNewsById(this.id);
        });
    }

    getNewsById(id: string) {
        this.errorReceived = false;
        //this.service.getNewsById(id)
        //    .pipe(catchError((err) => this.handleError(err)))
        //    .subscribe(data => {
        //        this.post = data as IPostItem;
        //    });
        this.post = { id: parseInt(this.id), date: new Date('05-22-2019'), title: 'Title', text: 'Text....', author: 'Author Author' } as IPostItem;
    }

    private handleError(error: any) {
        this.post = null;
        this.errorReceived = true;
        return Observable.throw(error);
    }
}
