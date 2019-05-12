import { IPostItem } from './postItem.model';

export interface IPost {
    pageIndex: number;
    data: IPostItem[];
    pageSize: number;
    count: number;
}