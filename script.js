document.getElementById("quiz").style.display = "none";
document.getElementById("scorediv").style.display = "none";

let index = 0;
let correctanswer = [];
let inncorrectanswer = [];
let score = 0;
let initialOptionStyles = {};

function startQuiz() {
    document.getElementById("startdiv").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    displayData();
}

async function displayData(){
    let response = await fetch("https://the-trivia-api.com/v2/questions");
    let data = await response.json();
    console.log(data[index]);

    
    
    correctanswer.push(data[index].correctAnswer);

    document.getElementById("question").innerText = data[index].question.text;
    document.getElementById("category").innerText = data[index].category;
    document.getElementById("difficulty").innerText = data[index].difficulty;
    
    // Assuming data is defined and has appropriate values
    var data1     = [
        {
        correctAnswer: data[index].correctAnswer,
        incorrectAnswers: [
            data[index].incorrectAnswers[0], 
            data[index].incorrectAnswers[1], 
            data[index].incorrectAnswers[2]
        ]
        }
    ];

    // Generate a random order for the options
    var order = [0, 1, 2, 3];
    order.sort(() => Math.random() - 0.5);

    // Set the innerText of each option element
    for (var i = 0; i < 4; i++) {
        var optionIndex = order[i];
        var optionText;

        if (optionIndex === 0) {
            optionText = data1[0].correctAnswer;
        } else {
            optionText = data1[0].incorrectAnswers[optionIndex - 1];
        }

        document.getElementById(`option${i + 1}`).innerText = optionText;
    }
}

function checkAnswer(option){
    var options = document.querySelectorAll(".quiz p");
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });

    var selectedOption = option.innerText;
    if (selectedOption === correctanswer[index]) {
        score++;
        document.getElementById("score").innerHTML = `<p id="score">Score: ${score}/10</p>`;
        option.style.border = 'solid 3px green';
        option.innerHTML += '<i class="fa-solid fa-circle-check"></i>';
    }
    else{
        option.style.border = 'solid 3px red';
        option.innerHTML += '<i class="fa-solid fa-circle-xmark"></i>';
        options.forEach(opt =>{
            if(opt.innerText === correctanswer[index]){
                opt.style.border = 'solid 3px green';
                opt.innerHTML += '<i class="fa-solid fa-circle-check"></i>';
            }

        });

    }
    
}

function nextQuestion(){
    index++;
    if(index <= 9){
        var options = document.querySelectorAll('.quiz p');
        options.forEach(option => {
            option.style.pointerEvents = 'auto';
            option.style.border = 'solid black 3px'; // Reset border style
            option.innerHTML = option.innerText; // Remove any inner HTML content 
        });
        document.getElementById("question").style.border = 'none';
        document.getElementById("score").style.border = 'none';
        displayData();
    }else{
        document.getElementById("quiz").style.display = "none";
        document.getElementById("scorediv").style.display = "flex";
        document.getElementById("finalscore").innerText = `Score: ${score}/10`;

    }
}


function playagain() {
        // Reset variables and states
        index = 0;
        correctanswer = [];
        inncorrectanswer = [];
        score = 0;
    
        // Hide the score div and show the start div
        document.getElementById("scorediv").style.display = "none";
        document.getElementById("startdiv").style.display = "flex";
    
        // Reset the score display
        document.getElementById("score").innerHTML = `<p id="score">Score: 0/10</p>`;
    
        // Reset the options in the quiz div
        var options = document.querySelectorAll('.quiz p');
        options.forEach(option => {
            option.style.pointerEvents = 'auto';
            option.style.border = 'solid black 3px'; // Reset border style
            option.innerHTML = option.innerText; // Remove any inner HTML content 
        });

        document.getElementById("question").style.border = 'none';
        document.getElementById("score").style.border = 'none';
}














