var xhr = new XMLHttpRequest();
function findCats(){
    var count = document.getElementById("catsCount").value;
    if(count>10){
        alert("Za dużo! Nie mamy tyle kotów na magazynie.")
    }else if(count<1){
        alert("Musisz wpisać liczbę od 1 do 10!")
    }else{
        xhr.open("GET", "https://api.thecatapi.com/v1/images/search?limit="+count, true);
        xhr.onload = function(){
            var cats = JSON.parse(this.responseText);
            var divCats = document.getElementById("cats");
            divCats.innerHTML="";
            for(let x=0; x<cats.length; x++){
               divCats.innerHTML += '<img src="'+cats[x].url+'" width="300" height="300" class="img-fluid cats" alt="Responsive image">'
            }
    }


};
xhr.send();
}
Correct = 0;
Wrong = 0;
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  
  function random(){

    var random1 =Math.floor(Math.random() * 10000); 
    var random2 =Math.floor(Math.random() * 10000); 
    var random3 =Math.floor(Math.random() * 10000); 
    var random4 =Math.floor(Math.random() * 10000); 
    var random5 =Math.floor(Math.random() * 10000); 
    var random6 =Math.floor(Math.random() * 10000); 

    var random11 =Math.floor(Math.random() * 1000); 
    var random22 =Math.floor(Math.random() * 1000); 
    var random33 =Math.floor(Math.random() * 1000); 
    var random44 =Math.floor(Math.random() * 1000); 
    var random55 =Math.floor(Math.random() * 1000); 
    var random66 =Math.floor(Math.random() * 1000); 

    var chart2 = bb.generate({
        data: {
          x: "x",
          columns: [
          ["x", 30, 50, 100, 230, 300, 1000],
          ["data1", random1, random2, random3, random4, random5, random6],
          ["data2", random11, random22, random33, random44, random55, random66]
          ]
        },
        bindto: "#chart2"
      });
  
  
}

  random();
  function finish(){
    Correct = 0;
    Wrong = 0;
    var sprawdzamy = document.getElementsByClassName("check");
    for(let x=0; x<sprawdzamy.length; x++){
        if(sprawdzamy[x].checked==true && sprawdzamy[x].value=="correct"){
            Correct+=1;
        }

        if(sprawdzamy[x].checked==true && sprawdzamy[x].value=="wrong"){
            Wrong+=1;
        }

        if(sprawdzamy[x].value=="correct"){
            sprawdzamy[x].parentNode.classList.add("correct");
        }

        if(sprawdzamy[x].value=="wrong" && sprawdzamy[x].checked==true){
            sprawdzamy[x].parentNode.classList.add("wrong");
        }
      
    }
    var chart = bb.generate({
        bindto: "#chart",
        data: {
            type: "bar",
            columns: [
                ["Correct questions", Correct],
                ["Wrong questions", Wrong]
            ],
        }
    });
  }
function startQuiz(){
    let Category = document.getElementById("category").value;
    let lvl = document.getElementById("lvl").value;
   

    xhr.open("GET", "https://opentdb.com/api.php?amount=10&category="+Category+"&difficulty="+lvl+"&type=multiple", true);
    xhr.onload = function(){
    var quiz = JSON.parse(this.responseText);
    var put = document.getElementById("questions");
    put.innerHTML="";
    quiz = quiz.results;

    
    for(let x=0; x<quiz.length; x++){
        quiz[x].incorrect_answers.push(quiz[x].correct_answer)
        quiz[x].incorrect_answers = shuffle(quiz[x].incorrect_answers)

            put.innerHTML+=`
            <p class='quizTEXT'>`+quiz[x].question+`</p>
            
            `
            for(let w=0; w<quiz[x].incorrect_answers.length; w++){
                if(quiz[x].incorrect_answers[w]==quiz[x].correct_answer){
                    console.log("XD");
                    put.innerHTML += `
                    <div class="form-check">
                        <input class="form-check-input  check" type="radio" name="`+quiz[x].correct_answer+`" id="exampleRadios1" value="correct">
                        <label class="form-check-label" for="exampleRadios1">
                            `+quiz[x].incorrect_answers[w]+`
                        </label>
                    </div>
                    `
                }else{
                put.innerHTML += `
                <div class="form-check">
                    <input class="form-check-input check"  type="radio" name="`+quiz[x].correct_answer+`" id="exampleRadios1" value="wrong">
                    <label class="form-check-label" for="exampleRadios1">
                        `+quiz[x].incorrect_answers[w]+`
                    </label>
                </div>
                `
                }
            }
            
        }
        document.getElementById("finish").innerHTML=`<button type="submit" onclick="finish()" class="btn btn-primary submitek">Zakończ quiz i podlicz punkty</button>`

       
        
 
    }
xhr.send();
}
