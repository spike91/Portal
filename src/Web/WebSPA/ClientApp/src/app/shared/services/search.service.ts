import { Injectable } from '@angular/core';
import { IPost } from '../models/post.model';
import { IPostItem } from '../models/postItem.model';
import { DataService } from '../services/data.service';
import { ConfigurationService } from '../services/configuration.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class SearchService {
    private newsUrl: string = '';

    constructor(private service: DataService, private configurationService: ConfigurationService) {
        this.configurationService.settingsLoaded$.subscribe(x => {
            this.newsUrl = this.configurationService.serverSettings.newsUrl + '/api/v1/News/items';
        });
    }

    getNewsByTitle(text: number, size: number): Observable<IPostItem[]> {
        let url = this.newsUrl;

        url = url + '?search=' + text + '&size=' + size;

        return this.service.get(url)
            .pipe(
                map((response: any) => {
                    return response;
                })
            );
    }

    getNewsById(id: number): Observable<IPostItem> {
        let url = this.newsUrl;

        url = url + '?id=' + id;

        return this.service.get(url)
            .pipe(
                map((response: any) => {
                    return response;
                })
            );
    }
}
