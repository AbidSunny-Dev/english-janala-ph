const getLesson=()=>{

    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(response=>response.json())
    .then(json=>displayLesson(json.data))
};


const lessonLoadWord=(id)=>{

  const url = `https://openapi.programming-hero.com/api/level/${id}`

  fetch(url)
  .then(response=>response.json())
  .then(data=>displayWord(data.data));

};


const displayWord=(data)=>{

  const wordContainer= document.getElementById("word-container");

//   wordContainer.innerHTML ="";

  data.forEach(word=>{

     const card = document.createElement("div");

     card.innerHTML =  `
     
     `

wordContainer.appendChild(card);

  })


}


const displayLesson=(lessons)=>{



const levelContainer= document.getElementById("level-container");

levelContainer.innerHTML=" ";

for(let lesson of lessons){


    const div= document.createElement("div");
    
    div.innerHTML =
    
    `<button onClick="lessonLoadWord(${lesson.level_no})" class="btn btn-outline btn-primary"
              ><i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button
            >`;
    

            levelContainer.appendChild(div);
    
    }
}




getLesson();