// KOPIOITU KOODI JOTTA TIETÄÄ PLAJONKO KELLO ON
const displayClock = () => {
    const timeDate = new Date();
    const clock = document.querySelector("#clock");
    const date = document.querySelector('#date');

    let hours = timeDate.getHours() % 12;
    let minutes = timeDate.getMinutes();
    let dayOrNight = '';

    if (hours.toString().length < 2) {
      hours = '0' + hours;
    }

    if (minutes.toString().length < 2) {
      minutes = '0' + minutes;
    }

    if (timeDate.getHours() <= 12) {
      dayOrNight = 'AM';
    } else {
      dayOrNight = 'PM';
    }

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = days[timeDate.getDay()];

    const clockOutput = hours + ' : ' + minutes + ' ' + dayOrNight;
    const dateOutput = 'Looks like another ' + today;

    clock.textContent = clockOutput;
    date.textContent = dateOutput;
  }


  window.onload = clockFunction = () => {
    displayClock();
    setInterval(displayClock, 1000)
  }
// KOPIOITU KOODI JOTTA TIETÄÄ PLAJONKO KELLO ON - loppu

var taskInput=document.getElementById("input");//lisää uusi tehtävä
var addButton=document.getElementsByTagName("button")[0];//lisää nappi
var incompleteTaskHolder=document.getElementById("incomplete");//ul tekemättömät tehtävät
var completedTasksHolder=document.getElementById("completed");//tehdyt tehtävät


//Uusi tehtävä lista

  var createNewTaskElement=function(taskString){

	var listItem=document.createElement("li");

	//input laatikko

	var checkBox=document.createElement("input");

	var label=document.createElement("label");

	var deleteButton=document.createElement("button");//poisto nappi

	label.innerText=taskString;

	//elementtien lisäys

	checkBox.type="checkbox";

	deleteButton.innerText="Delete";
	deleteButton.className="delete";

	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(deleteButton);
	return listItem;
}

var addTask=function(){
	console.log("Add Task...");
	//lisätään uusi listaus input.
	var listItem=createNewTaskElement(taskInput.value);
	//liitetään list item tekemättömiin
	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

	taskInput.value="";

}

//Poista
var deleteTask=function(){
		console.log("Delete Task...");

		var listItem=this.parentNode;
		var ul=listItem.parentNode;
		//poistaa isäntä(parent) listauksen ul:stä
		ul.removeChild(listItem);

}
//merkitään tehtävä suoritetuksi
var taskCompleted=function(){
		console.log("Complete Task...");

	//liitetään tehtävä listä tehtyihin tapahtumiin
	var listItem=this.parentNode;
	completedTasksHolder.appendChild(listItem);
				bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete=function(){
		console.log("Incomplete Task...");
//merkitään tehtävä suorittamattomaksi kun laatikosta poistetaan ruksi
		var listItem=this.parentNode;
	incompleteTaskHolder.appendChild(listItem);
			bindTaskEvents(listItem,taskCompleted);
}

var addTaskOnKeyPress = function(event) {
    if (event.keyCode === 13) {
      addTask();
    }
  };

addButton.addEventListener("click", addTask);
input.addEventListener('keypress', addTaskOnKeyPress);



//click handeri add task funtioon

var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
	var checkBox=taskListItem.querySelector("input[type=checkbox]");
	var deleteButton=taskListItem.querySelector("button.delete");

			//liitetään poistotapahtuma 'delete' nappiin
			deleteButton.onclick=deleteTask;
			//liitetään tehty tapahtuma check boxiin
			checkBox.onchange=checkBoxEventHandler;
}

//kierto tekemättömien tapahtumien ul listan aiheista
	for (var i=0; i<incompleteTaskHolder.children.length;i++){

		//liitetään tapahtumat tehtyjen tapahtumien listaan
		bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
	}

//kierto tehtyjen tapahtumien ul listaan
	for (var i=0; i<completedTasksHolder.children.length;i++){
	//liitetään tapahtumat tekemättömien tapahtumien listaukseen
		bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
	}
