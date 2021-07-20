//FETCH AND ACCES API'S DATA 
const accesPromes = async (url) => {
    const  accesApi= await fetch(url);
    const  accesApiJSON= await accesApi.json()
    return accesApiJSON.results
 }

 //ACCES HTML PROTOTYPES
 const form = document.getElementById("bg-img");
 const accesForm=document.getElementById("form-content");
 const answersPoints = document.getElementById('answers-point')
 const titleQuestion=document.getElementById("question-point");
 const triviaExecute=document.getElementById("trivia-game-focus");
 const AppTriviaGame = document.getElementById("trivia-game-focus");
 const button1 = document.getElementById('butto-resp-1');
 const button2 = document.getElementById('butto-resp-2');
 const button3 = document.getElementById('butto-resp-3');
 const button4 = document.getElementById('butto-resp-4');
 const contentVisualEndBox = document.getElementById('content-visual-end-box');
 const scoreDiv = document.getElementById('final-score-item');

 let position = 0;
 const allQuestions = [];
 const answers = [];
 const abcCount = [];

 let typeOfQuestions = true;

 const asks = answers.sort();
//CREATE APP TRIVIA -QUESTIONS-AND-ANSWERS
 function GameFrontContent (pet) {
    titleQuestion.innerText = 'Generando Contenido'

    pet.forEach(element => {
        allQuestions.push(element.question);
        const inc = element.incorrect_answers;
        inc.push(element.correct_answer);
        abcCount.push(element.correct_answer);
        answers.push(inc);
    });
 }

const contentApp = ()=>{

    if(typeOfQuestions) {
               //TITLE TRIVIA QUESTION X
               if(position>=0&&position<allQuestions.length)
               {
                   titleQuestion.innerText = allQuestions[position];
                   //OPTIONS ANSWERS
                   button1.innerText = asks[position][0]
                   button2.innerText = asks[position][1];
                   button3.innerText = asks[position][2];
                   button4.innerText = asks[position][3];
               }
               else {
                   titleQuestion.innerText = 'Loading Questions...';
               }
    }
    else {
               //TITLE TRIVIA QUESTION X
               if(position>=0&&position<allQuestions.length)
               {
                   titleQuestion.innerText = allQuestions[position];
                   //OPTIONS ANSWERS
                   button1.innerText = asks[position][0]
                   button2.innerText = asks[position][1];
                   button3.style.display = 'none';
                   button4.style.display = 'none';
               }
               else {
                   titleQuestion.innerText = 'Loading Questions...';
               }
    }
}

 //UNIT DOM COMPONENTS AND PRINT API RESPONSE
const createVisualAppContent = fetchs=>{
    const amount=document.getElementById("trivia_amounts").value;
    const category= document.getElementById("trivia_category").value; 
    const difficulty=document.getElementById("trivia_difficulty").value;
    const type=document.getElementById("trivia_type").value;

    if(type === 'multiple') {typeOfQuestions} 
    else {typeOfQuestions = false}

  const urlApi=`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;
    fetchs = async (value)=>{
            await accesPromes(value).then(
            data=>{
                GameFrontContent(data)
                contentApp();
            }
        )
    }
    return fetchs(urlApi);
}

// RENDER ALL CONTENT
 const onClickEjecutable = (events)=>{
    events.preventDefault();
    form.style.display = 'none';
    AppTriviaGame.style.display='flex';
    createVisualAppContent();
    contentApp();
 }
 accesForm.addEventListener('submit', onClickEjecutable);
 
//ALL ANSWERS
const responses = []
//ALL ANSWERS
//INNER TEXT RESPONSES
const addResults = ()=> {
    document.getElementById('visual-margin-top').style.display = 'flex';
    contentVisualEndBox.innerText = '';
    scoreDiv.innerText = '';
    let x = 1;
    for(let i= 0; i<responses.length; i++) {
        const createlist = document.createElement('ul');
        const createItem = document.createElement('li');
        createItem.innerText = 'Answer ' + x + ': ' +  responses[i];
        createlist.appendChild(createItem);
        contentVisualEndBox.appendChild(createItem);
        x++
    }

scoreDiv.innerText = 'You answered correctly ' + score + ' questions out of ' + allQuestions.length;
}

//finnal game//
const resultsAndMore =()=> {
    answersPoints.innerHTML ='';
    titleQuestion.innerText = '';

    const create = document.createElement('button');
    create.setAttribute('class', 'button-final-results');
    create.innerText='See Results';
    answersPoints.appendChild(create);
    create.addEventListener('click', ()=>{addResults();})
    titleQuestion.innerText = 'Game Over, Check Your Results.';
} 

const clickOnABtnQuestion = ()=>{
    position++
    contentApp();
    if(position===abcCount.length) {resultsAndMore()}
}

let score = 0;

const validateAnswers = (button)=>{
    abcCount.forEach(element => {
        if(button.innerText === element)
        {score++}
    });
}

    button1.addEventListener('click', e=>{e.preventDefault();validateAnswers(button1) ; responses.push(button1.innerText); clickOnABtnQuestion()});
    button2.addEventListener('click', e=>{e.preventDefault();validateAnswers(button2) ; responses.push(button2.innerText); clickOnABtnQuestion()});
    button3.addEventListener('click', e=>{e.preventDefault();validateAnswers(button3) ; responses.push(button3.innerText); clickOnABtnQuestion()});
    button4.addEventListener('click', e=>{e.preventDefault();validateAnswers(button4) ; responses.push(button4.innerText); clickOnABtnQuestion()});
