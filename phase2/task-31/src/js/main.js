var campus = {
	"北京": [
				"北京大学",
				"清华大学",
				"北京交通大学",
				"北京邮电大学",
				"北京师范大学",
				"人民大学"
			],
	"西安": [
				"西安交通大学",
				"西北工业大学",
				"长安大学",
				"西安电子科技大学"
			]
}


function renderCampusOptions(campuses){
	var array = [];
	var length = campuses.length;
	for (var i = 0; i < length; i++) {
		array.push(`<option valud = "${campuses[i]}">${campuses[i]}</option>`)
	};
	return array.join(" ");
}

function cityOnchangeHandler(event){
	var city = this.options[this.selectedIndex].value;
	var campusSelect = this.nextElementSibling;
	campusSelect.innerHTML = renderCampusOptions(campus[city]);
}

function studentRadioOnclickHandler(event){
	var campusSelectBlcok = document.getElementsByClassName("campus-option-block")[0];	
	if (campusSelectBlcok.classList.contains('form-block-unvisible')) {
		document.getElementsByClassName("company-block")[0].classList.add("form-block-unvisible");
		campusSelectBlcok.classList.remove('form-block-unvisible');
	}
};


function nonstudentRadioOnclickHandler(event){
	var companyBlock = document.getElementsByClassName("company-block")[0];	
	if (companyBlock.classList.contains('form-block-unvisible')) {
		document.getElementsByClassName("campus-option-block")[0].classList.add('form-block-unvisible');
		companyBlock.classList.remove('form-block-unvisible');
	}
};

function init(){
	document.getElementById("city").onchange = cityOnchangeHandler;
	document.getElementById("student").onclick = studentRadioOnclickHandler;
	document.getElementById("nonstudent").onclick = nonstudentRadioOnclickHandler;
}

window.onload = function(){
	init();
}