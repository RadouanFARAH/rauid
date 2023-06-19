import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ArticleService } from 'src/app/services/article.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-slide',
  templateUrl: './slide.page.html',
  styleUrls: ['./slide.page.scss'],
})
export class SlidePage implements OnInit {
  article: any;
  url = environment.url
  constructor(    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private articleService: ArticleService) { }
    goBack() {
      this.navCtrl.back();
    }
  ngOnInit() {
    this.activatedRoute.params.subscribe((article)=>{
      this.article = article
    })
  }

}
