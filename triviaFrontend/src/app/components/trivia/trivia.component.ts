import { Component, OnInit, ViewChild, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.css']
})
export class TriviaComponent implements OnInit {
  @Output() finish = new EventEmitter();

  constructor(private mainService: MainService) { }
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    console.log(event);
    this.answerChecked=false;
}
  // @ViewChild('question') question: ElementRef;

  currQ:any;
  currect:Number;
  allQ:Array<any>;
  fourAnswers: Array<string>;
  resultsArr: Array<any>=[];
  // button
  btnValue:String="OK";
  btnColor:String="#F0F0F0";
  answerChecked:Boolean=false;
  //answer
  answerResponseImg:String="Group.png";
  userChoice: any;
  borderWidth:String="5px";
  boderColor:String='#0D7BAB bold'
  boderWidthBold:String=''
  currElement:any;


  ngOnInit() {
    this.startTrivia()
  }

  setAnswersArr(){
    this.fourAnswers=[];
    this.fourAnswers= this.currQ.incorrect_answers.map(a=>a)
    this.fourAnswers.push(this.currQ.correct_answer)
    this.fourAnswers.sort(() => Math.random() - 0.5);
    }
  

  startTrivia(){
    this.mainService.getAllQuestions().subscribe(data=>{
      this.allQ=data;
      this.currQ=data[0];
      this.currQ.index=0;
      
      this.setAnswersArr();
      console.log(data)
    });
  }

  chooseAnswer(answer, index,ev){
    //set border width
    if(this.btnValue == 'OK'){
      let allAns = document.getElementsByClassName('answer')  as HTMLCollectionOf<HTMLElement>;
      for (let i = 0; i < allAns.length; i++) {
        allAns[i].style.borderWidth='';      
        allAns[i].className+=' hoverShadow';
      }
      this.currElement=ev.currentTarget;
      this.currElement.style.borderWidth='4px';
      this.userChoice=index;

      if(this.btnColor!="green"){
        this.btnColor="green"
        this.btnValue="OK"
      }
    } 
  }

  submitAnswer(){
    
    if(this.btnValue == 'Continue'){
      let allAns = document.getElementsByClassName('answer')  as HTMLCollectionOf<HTMLElement>;
      for (let i = 0; i < allAns.length; i++) {
        allAns[i].style.borderWidth='';      
        allAns[i].style.borderColor="#0D7BAB";      
      }
      if(this.resultsArr.length< 10){

        let tempQ = this.allQ[this.currQ.index]
        tempQ.index=this.currQ.index+1;
        this.currQ=tempQ;
        this.setAnswersArr();    
        this.answerChecked=false;
        this.btnValue='OK'
        this.btnColor='#28a745'
        this.answerResponseImg='Group.png';
        this.userChoice=null;  

      }else{
        this.finish.emit(this.resultsArr)
      }

      
    }else if(this.btnValue == 'OK' && this.resultsArr.length<10){

      let allAns = document.getElementsByClassName('answer')  as HTMLCollectionOf<HTMLElement>;
      for (let i = 0; i < allAns.length; i++) {
        allAns[i].classList.remove('hoverShadow');
      }

      let base="../../../assets/"
      if(this.fourAnswers[this.userChoice] == this.currQ.correct_answer){
        debugger
          
        this.currElement.style.borderColor='#28a745';
        this.answerResponseImg= base+'Group.png'
      }else{
        this.currElement.style.borderColor='red';
        this.answerResponseImg= base+'Group 3.png'
      }
      this.resultsArr.push({question:this.currQ, userAnswer: this.fourAnswers[this.userChoice]});
      this.btnValue="Continue";
      this.btnColor="#FF8F48";
    }
  }



}
