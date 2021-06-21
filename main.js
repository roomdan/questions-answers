accesForm=document.getElementById("form-content");
titleQuestion=document.getElementById("question-point");
allanswers=document.getElementById("answers-point");
triviaExecute=document.getElementById("trivia-game-focus");

accesValuesForm= async event => {

    document.getElementById("bg-img").style.display = "none"; "trivia-game-focus"
    document.getElementById("trivia-game-focus").style.display = "flex"

    event.preventDefault();
    amount=document.getElementById("trivia_amount").value;
    category= document.getElementById("trivia_category").value;
    difficulty=document.getElementById("trivia_difficulty").value;
    type=document.getElementById("trivia_type").value;

    urlApi=`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;

    accesApi= await fetch(urlApi);
    accesApiJSON= await accesApi.json();
    accesResult = await accesApiJSON.results;
    // console.log(accesResult)

    initialsPoints= accesResult.length;
    points=1;
    index=0;
     addQuestion=()=>{

        //START resets//
        titleQuestion.innerHTML = "";
        allanswers.innerHTML = "";
        //END resets//

        //START title Questions//
       question=accesResult[index].question;
       createTitle= document.createElement("h2")
       createTitle.setAttribute("class", "title-questions")
       createTitle.innerText = question;
       titleQuestion.appendChild(createTitle);
       //END title Questions//

       //START answers//
       correct=accesResult[index].correct_answer;
       createButton = document.createElement("button");
       createButton.setAttribute("type", "submit")
       createButton.setAttribute("class", "btn-answers");
       createButton.innerText = correct;      

       allanswers.appendChild(createButton)

       incorrects= accesResult[index].incorrect_answers.forEach(incorrect => {
        
        createButton2 = document.createElement("button");
        createButton2.setAttribute("type", "submit")
        createButton2.setAttribute("class", "btn-answers")
        createButton2.innerText = incorrect;
        
        allanswers.appendChild(createButton2)
        //END answers//

        //SCORE
        sum=()=>{
            points++
        };
        createButton.addEventListener("click", sum);
       })
        index++
        score=points
        //SCORE

    }
    addQuestion();
    
    triviaExecute.addEventListener("submit", addQuestion)
}

accesForm.addEventListener("submit", accesValuesForm)
