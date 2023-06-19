import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  url = environment.url

  constructor(private http: HttpClient) { }

  getArticleByID(article) {
    return this.http.post(this.url + '/user/getArticleByID', {article})
  }

  addArticle(article) {
    return this.http.post(this.url + '/user/addArticle', article)
  }

  deleteArticle(article) {
    return this.http.post(this.url + '/user/deleteArticle', {article})
  }
  getArticles() {
    return this.http.get(this.url + '/user/getArticles')
  }
}
