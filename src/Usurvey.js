import React, { Component } from 'react';

//Set database variables
var firebase = require('firebase');
var uuid = require('uuid');

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyB9y5mckze5o3us8lTIT7vwRczJzWGKrmc",
    authDomain: "usurvey-4de7b.firebaseapp.com",
    databaseURL: "https://usurvey-4de7b.firebaseio.com",
    projectId: "usurvey-4de7b",
    storageBucket: "usurvey-4de7b.appspot.com",
    messagingSenderId: "50416050177"
  };
  firebase.initializeApp(config);



class Usurvey extends Component {

  nameSubmit(event){
    var studentName = this.refs.name.value;
    this.setState({studentName: studentName}, () => {console.log(this.state)});
  }

  answerSelected(event){
    //  work on this
    var answers = this.state.answers;

    if(event.target.name === 'answer1'){
      answers.answer1 = event.target.value;
    } else if(event.target.name === 'answer2'){
      answers.answer2 = event.target.value;
    } else if(event.target.name === 'answer3'){
      answers.answer3 = event.target.value;
    }

    this.setState({answers: answers}, () => {console.log(this.state)});
  }

  questionSubmit(){
    //update database by creating an object
    firebase.database().ref('uSurvey/'+ this.state.uid).set({
      studentName: this.state.studentName,
      answers: this.state.answers
    });
    this.setState({isSubmitted: true});
  }
  constructor(props){
    super(props);

    this.state = {
      uid: uuid.v1(),
      studentName: '',
      answers: {
        answer1: '',
        answer2: '',
        answer3: ''
      },
      isSubmitted: false
    };

    //Every method used inside render must be binded
    this.nameSubmit = this.nameSubmit.bind(this);
    this.answerSelected = this.answerSelected.bind(this);
    this.questionSubmit = this.questionSubmit.bind(this);
  }



  render(){
    var studentName;
    var questions;

    //Default state
    if (this.state.studentName === ''  && this.state.isSubmitted === false){
      studentName = <div>

        <h1>What is your name?</h1>

        <form onSubmit={this.nameSubmit}>
          <input className="namy" type="text" placeholder="Enter your name" ref="name" />
        </form>

      </div>
      questions = '';

    } else if (this.state.studentName !== '' && this.state.isSubmitted === false){

      studentName = <h1>Welcome {this.state.studentName}</h1>;

      questions = <div>
        <h2>Please answer these quesions.</h2>
        <form onSubmit={this.questionSubmit}>
          <div className='card'>
            <label>What courses you like the most?</label> <br />
            <input type='radio' name='answer1' value='Technology' onChange={this.answerSelected}/>Technology
            <input type='radio' name='answer1' value='Business' onChange={this.answerSelected}/>Business
            <input type='radio' name='answer1' value='Design' onChange={this.answerSelected}/>Art
          </div>
          <div className='card'>
            <label>You are a: </label> <br />
            <input type='radio' name='answer2' value='Student' onChange={this.answerSelected}/>Student
            <input type='radio' name='answer2' value='in-job' onChange={this.answerSelected}/>in-job
            <input type='radio' name='answer2' value='looking-job' onChange={this.answerSelected}/>looking-job
          </div>
          <div className='card'>
            <label>Was this learing helpful: </label> <br />
            <input type='radio' name='answer3' value='yes' onChange={this.answerSelected}/>Yes
            <input type='radio' name='answer3' value='no' onChange={this.answerSelected}/>No
            <input type='radio' name='answer3' value='maybe' onChange={this.answerSelected}/>Maybe
          </div>
          <input className='feedback-button' type='submit' value='submit'/>
        </form>
      </div>;
    } else if(this.state.studentName !== '' && this.state.isSubmitted === true){
      studentName = <h1>Thanks, {this.state.studentName}</h1>
    }

    return(
      <div>
        {studentName}
        ---------------------------------
        {questions}
      </div>
    );
  }
}

export default Usurvey;
