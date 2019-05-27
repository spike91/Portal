import { Component, OnInit, ViewChild, ElementRef,EventEmitter,Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { DataService } from '../shared/services/data.service';
import { SearchService } from '../shared/services/search.service';
import { IPostItem } from '../shared/models/postItem.model';
import { IPost } from '../shared/models/post.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
    @Output() newsOutput = new EventEmitter<IPost>();
    postStr: any;
    news: IPost;
  postFound: IPostItem;
  posts: IPostItem[];

  constructor(
      private dataService: DataService, private searchService: SearchService, private router: Router
  ) {
      
  }

    ngOnInit() {
    }

    onSubmit(f) {
        let title = (<HTMLInputElement>document.getElementById('search')).value;
        if (typeof (title) == 'string' && title.length >= 3) {
            (<HTMLInputElement>document.getElementById('search')).value = "";
            this.searchChanged(title);
        }
    }

    searchChanged(value) {
        this.goToNewsPage(value);
        //this.news = { pageIndex: 0, pageSize: 0, data: [{ id: 1, title: 'test', text: 'test' } as IPostItem], count: 1 } as IPost;
        //this.newsOutput.emit(this.news);
        //this.searchService.getNewsById(value);
    }

    postSearch(value) {
        //if (value != null && value.length > 0)
        //    this.searchService.getNewsByTitle(value, 10)
        //        .subscribe((data: IPostItem[]) => this.posts = data);
        this.posts = [{ id: 1, title: 'test', text: 'test' } as IPostItem];
    }

    goToNewsPage(title) {
        //this.router.navigate(['/news', { title: title }]);
        this.router.navigate(['/news/search', title]);
    }

}
