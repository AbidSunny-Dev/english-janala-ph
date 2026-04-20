const getLesson=()=>{

    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(response=>response.json())
    .then(json=>displayLesson(json.data))
};


const displayLesson=(lessons)=>{



const levelContainer= document.getElementById("level-container");

levelContainer.innerHTML=" ";

for(let lesson of lessons){


    const div= document.createElement("div");
    
    div.innerHTML =
    
    `<button href="" class="btn btn-outline btn-primary"
              ><i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button
            >`;
    

            levelContainer.appendChild(div);
    
    }
}




getLesson();