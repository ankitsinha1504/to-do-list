const input = document.querySelector("input");
const alert = document.querySelector(".invalid");
const add_btn = document.querySelector("button");
const wrapper = document.querySelector(".list-wrapper");
const list = document.querySelector(".list");
const reset = document.querySelector(".reset button");
const edit = document.querySelector("a");
let inputValue = "";
var i = 0;


let LIST = [];

//////get item to Local Storage////
let data = localStorage.getItem("TODO");
if(data){
  LIST = JSON.parse(data);
  loadList(LIST);
}
else {
  LIST = [];
}

/////////////LOAD items to user interface//////////
function loadList(array) {
  array.forEach(function(item) {
      addToDo(item);
  });
}

///////input//////////

add_btn.addEventListener("click", function(){
  var inputText = input.value;
  if(inputText == ""){
    alert.classList.toggle("visibility");
    setTimeout(function(){
      alert.classList.toggle("visibility");
    }, 3000 );
  }
  else {
    inputValue = input.value;

    addToDo(inputValue);
    LIST.push(inputValue);
    //////add item to Local Storage////
    localStorage.setItem("TODO", JSON.stringify(LIST));
    ///////////
    location.reload();
    i++;
    inputValue = "";
    input.value = inputValue;
  }
});

////////Enter Key Press////////////
document.addEventListener("keydown", function(event) {
    if(event.keyCode == 13){
      var inputText = input.value;
      if(inputText == ""){
        alert.classList.toggle("visibility");
        setTimeout(function(){
          alert.classList.toggle("visibility");
        }, 3000 );
      }
      else {
        inputValue = input.value;

        addToDo(inputValue);
        LIST.push(inputValue);
        //////add item to Local Storage////
        localStorage.setItem("TODO", JSON.stringify(LIST));
        ////////////////
        location.reload();
        i++;
        inputValue = "";
        input.value = inputValue;
    }
  }
});


function addToDo(inputValue) {
  wrapper.classList.remove("visibility");
  var innerText = `
                  <li class="li-item">
                    <a href="#" class= "a-check">
                      <i class="fas fa-check-circle" style="color: #59b959"></i>
                    </a>
                    <a class="a-trash" "href="#`+i+`">
                      <i class="fas fa-trash-alt icon"></i>
                    </a>`+ inputValue + `</li>`;
  list.insertAdjacentHTML("beforeend", innerText);
}

//////////////Reset Button ////////////////////
reset.addEventListener("click", function() {
    localStorage.clear();
    location.reload();

});

//////////////Delete Button///////////
for(var j = 0 ; j < LIST.length + 1 ; j++){
document.querySelectorAll(".a-trash")[j].addEventListener("click", function(event) {

      this.parentNode.parentNode.removeChild(this.parentNode);

      LIST.splice(LIST.indexOf(event.target.parentNode.parentNode.textContent), 1);
      //////add item to Local Storage////
      localStorage.setItem("TODO", JSON.stringify(LIST));
      ////////////////
      if(LIST.length == 0){
          wrapper.classList.add("visibility");
      }
      else {
          //Do nothing
      }
});
}

for(var j = 0 ; j < LIST.length + 1 ; j++){
document.querySelectorAll(".a-check")[j].addEventListener("click", function(event) {
    event.target.parentNode.parentNode.classList.toggle("strike");

});
}
