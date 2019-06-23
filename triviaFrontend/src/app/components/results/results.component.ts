import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  @Input('resultsArr') resultsArr: Array<any>;
  counter: number=0;
  constructor() { }

  ngOnInit() {
    this.resultsArr.forEach(q => {
      if(q.question.correct_answer == q.userAnswer){
        this.counter++
        q.state='success';
        q.color='#b3ffb3';
      }else{
        q.state='error';
        q.color='#ff9999';
      }
    });

  }

}
