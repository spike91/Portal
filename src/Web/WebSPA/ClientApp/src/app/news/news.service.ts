import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { DataService } from '../shared/services/data.service';
import { ConfigurationService } from '../shared/services/configuration.service';
import { IPost } from '../shared/models/post.model';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class NewsService {
  private newsUrl: string = '';

    constructor(private service: DataService, private configurationService: ConfigurationService) {
        this.configurationService.settingsLoaded$.subscribe(x => {
            this.newsUrl = this.configurationService.serverSettings.newsUrl + '/api/v1/News/items';
        });
    }

    getNews(pageIndex: number, pageSize: number): Observable<IPost> {
        let url = this.newsUrl;

        url = url + '?pageSize=' + pageSize + '&pageIndex=' + pageIndex;

        return this.service.get(url)
            .pipe(
                map((response: any) => {
                    return response;
                })
            );
    }
}
