import { Component } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {WordService} from './word.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  options = [
    {action: () => this.wordService.spam(this.phrase), name:'Is Spam'},
    {action: () => this.wordService.noSpam(this.phrase), name:"Isn't Spam"}
  ];
  result = 'Welcome to the spam checker';
  private phrase: string ='';

  constructor(private modalService: NgbModal,
              private wordService: WordService) {
  }

  learn(content) {
    if(this.phrase!==''){
      this.modalService.open(content,{ centered: true });
    }
  }

  guess() {
    if(this.phrase!=='') {
      const guessing = this.wordService.guess(this.phrase);
      this.result = 'The phrase is '+guessing.category+' with a probability of '+(guessing.probability*100)+'%';
    }
  }

  toDo(close, other) {
    close();
    other();
    this.phrase ='';
  }
}
