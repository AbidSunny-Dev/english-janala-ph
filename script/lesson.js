
const createElement=(arr)=>{


const htmlElements = arr.map(el=>`<button class="btn bg-[#EDF7FF]">${el}</button>`)



return htmlElements.join(" ");


}


const manageSpinner=(status)=>{
  
if(status==true){

document.getElementById("spinner").classList.remove("hidden")
document.getElementById("word-container").classList.add("hidden")
}else{


document.getElementById("spinner").classList.add("hidden")
document.getElementById("word-container").classList.remove("hidden")

}




}



const getLesson=()=>{

    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(response=>response.json())
    .then(json=>displayLesson(json.data))
};


const lessonLoadWord=(id)=>{
  manageSpinner(true);

  const url = `https://openapi.programming-hero.com/api/level/${id}`;

  fetch(url)
  .then(response=>response.json())
  .then(data=>{

   removeActive();


   const clickBtn =document.getElementById(`lesson-btn-${id}`);

   clickBtn.classList.add("active");


    displayWord(data.data);
  });

};

const displayLesson=(lessons)=>{



const levelContainer= document.getElementById("level-container");

levelContainer.innerHTML=" ";

for(let lesson of lessons){


    const div= document.createElement("div");
    
    div.innerHTML =
    
    `<button id="lesson-btn-${lesson.level_no}" onClick="lessonLoadWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"
              ><i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button
            >`;
    

            levelContainer.appendChild(div);
    
    }
}


const removeActive=()=>{

const lessonsBtn=document.querySelectorAll(".lesson-btn");


lessonsBtn.forEach(btn=> btn.classList.remove("active"));


}

const loadWordDetails= async(id)=>{

  const url = `https://openapi.programming-hero.com/api/word/${id}`



const res = await fetch(url);

const details = await res.json();

displayWordDetails(details.data);



}








const displayWordDetails = (word)=>{



  const detailBox = document.getElementById("word-details-container");

  detailBox.innerHTML=`
  
  
  <div class="">
  <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone"></i> :${word.pronunciation})</h2>
</div>

<div class="space-y-1">
  <h2 class="text-xl font-bold">Meaning</h2>
  <p class="font-medium font-bangla">${word.meaning}</p>
</div>

<div class="space-y-1">
  <h2 class="font-bold text-xl">Example</h2>
  <p>${word.sentence}</p>
</div>

<div class="space-y-1">
  <h2 class="font-bold font-bangla">সমার্থক শব্দ গুলো</h2>
  
  <div class="gap-3">
   
  ${createElement(word.synonyms)}

  </div>
</div>
  
  
  `


document.getElementById("word_modal").showModal();


}




const displayWord=(data)=>{

  const wordContainer= document.getElementById("word-container");

  wordContainer.innerHTML ="";


  if(data.length==0){

    wordContainer.innerHTML =`
    
    

   <div class="font-bangla text-center col-span-full space-y-4 py-10">

      <img src="./assets/alert-error.png" alt="" class="mx-auto">


  <p class=" text-gray-400  font bold text-xl">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
  <p class=" font-bold text-4xl">নেক্সট Lesson এ যান</p>


   </div>
    
    `;

  manageSpinner(false);
    return;
  }

  data.forEach(word=>{

     const card = document.createElement("div");

     card.innerHTML =  `
     
   <div class="bg-white py-10 px-5 text-center rounded-xl shadow-sm space-y-4">
  
    <h2 class="text-2xl font-bold ">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
    <p class="font-medium text-[20px]">Meaning /Pronounciation</p>
    <div class="font-bangla text-3xl font-semibold">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"}/ ${word.pronunciation ? word.pronunciation : "Pronounciation পাওয়া যায়নি"}"</div>

     <div class="flex justify-between items-center">
      <button  onclick="loadWordDetails(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
      <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
     </div>

   </div>
     `

wordContainer.appendChild(card);

  });

manageSpinner(false);

};







getLesson();