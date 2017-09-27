(function() {
  var questions = [{
    question: "what is the capital of Morrocco",
    choices: ["Fez", "Marakesh", "Meknes", "Rabat"],
    correctAnswer: "Rabat"
  }, {
    question: "Sequoia National Park is located in which U.S. state?",
    choices: ["florida", "idaho", "Washinton  State", "California"],
    correctAnswer: "California"
  }, {
    question: "What is the most common type of pitch thrown by pitchers in baseball?",
    choices: ["knuckle Ball", "Slider", "Fast Ball"],
    correctAnswer: "Fast Ball"
  }, {
    question: "The Van Gogh museum is located in what European capital city?",
    choices: ["Barcelona", "Paris", "munich", "Amsterdam"],
    correctAnswer: "Amsterdam"
  }, {
    question: "What was the name of the currency used in Spain before the euro?",
    choices: ["Peso", "Franc", "Pesetas", "Dinero"],
    correctAnswer: "Pesetas"
  },
  {
    question: "Who is the only head basketball coach to win both an NCAA national championship and an NBA title?",
    choices: ["Larry Brown", "Tim  Floyd", "RICK PITINO", "MIKE DUNLAP"],
    correctAnswer: "Larry Brown"
  }];

  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object

  // Display initial question
  displayNext();

  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();

    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {
      return false;
    }
    choose();

    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });

  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });

  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });

  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });

  // Creates and returns the div that contains the questions and
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });

    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);

    var question = $('<p>').append(questions[index].question);
    qElement.append(question);

    var radioButtons = createRadios(index);
    qElement.append(radioButtons);

    return qElement;
  }

  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }

  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }

  // Displays next requested element
  function displayNext() {
 count =  30;
 document.getElementById("timer").innerHTML="Time Remaining: " +count + " secs";
    quiz.fadeOut(function() {
      $('#question').remove();

      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }

        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){

          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
var count=30;

var counter=setInterval(timer, 1000); //1000 will  run it every 1 second
document.getElementById("timer").innerHTML="Time Remaining: " +count + " secs";
function timer()
{
  count=count-1;
  if (count <= 0)
  {
     clearInterval(counter);
     document.getElementById("timer").innerHTML="Time Remaining :" + count + " secs";
     displayNext();
     return;
  }

  document.getElementById("timer").innerHTML="Time Remaining :" + count + " secs";
}



  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});

    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
        console("NumCorrect ", numCorrect);
      }
    }

    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right!!!');
    return score;
  }
})()
