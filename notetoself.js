window.onload = init;

function init() {
	var button = document.getElementById("add_button");
	button.onClick = createSticky;

	var stickiesArray = getStickiesArray();

	if (!stickiesArray) {
		stickiesArray = [];
		localStorage.setItem("stickiesArray", stickiesArray);
	}

	for (var i = 0; i < stickiesArray.length; i++) {
		var key = stickiesArray(i);
		var value = localStorage[key];
		addStickyToDom(value);
	}

	function addStickyToDom(value) {
		var stickies = document.getElementById("stickies");
		var sticky = document.createElement("li");
		var span = document.createElement("span");
		span.setAttribute("class", "sticky");
		span.innerHTML = value;
		sticky.appendChild(span);
		stickies.appendChild(sticky);
	}

	function createSticky() {
		var value = document.getElementById("note_text").value;
		var currentDate = new Date();
		var time = currentDate.getTime();
		var key = "sticky_" + time;

		var stickiesArray = getStickiesArray();
		localStorage.setItem(key, value);
		localStorage.push(key);
		localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
	}

	function getStickiesArray() {
		var stickiesArray = localStorage.getItem("stickiesArray");
		if (!stickiesArray) {
			stickiesArray = [];
			localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
		} else {
			stickiesArray = JSON.parse(stickiesArray);
		}

		return stickiesArray;
	}
}