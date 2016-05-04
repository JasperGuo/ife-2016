
function grade(name,chinese,math,english){
	this.name=name;
	this.chinese=chinese;
	this.math=math;
	this.english=english;
	this.total= Number(chinese) +  Number(english) +  Number(math);
}

var tab=document.getElementById("gradeTab");
var stu_data=[];
stu_data[0]=new grade("小明","90","82","78");
stu_data[1]=new grade("小红","75","86","75");
stu_data[2]=new grade("小李","83","72","74");
stu_data[3]=new grade("小魏","70","90","92");
stu_data[4]=new grade("小王","94","88","88");

var rowState = {
    "chinese": true,
    "math": true,
    "english": true,
    "total": true
  };

function showTable(){
	for(var i=0;i<stu_data.length;i++){
    var newItem="<tr><td>"+stu_data[i].name+"</td><td>"+stu_data[i].chinese+"</td><td>"+stu_data[i].math+"</td><td>"+stu_data[i].english+"</td><td>"+stu_data[i].total+"</td></tr>"
    tab.innerHTML+=newItem;
   }
}

showTable();

//递增排序
function upOrder(stu_data,kind_id){
    stu_data.sort(function(a, b){
    return a[kind_id] - b[kind_id];
  });
  return stu_data;
}

//递减排序
function downOrder(stu_data,kind_id){
    stu_data.sort(function(a, b){
    return b[kind_id] - a[kind_id];
  });
  return stu_data;
}

function Order(kind_id){
	if(rowState[kind_id] == true){
		downOrder(stu_data,kind_id);
	}
	else
		upOrder(stu_data,kind_id);
	rowState[kind_id]=!rowState[kind_id];
    deleteData(tab);
	showTable();
}

//清空表格函数
function deleteData(tab){
  var len = tab.rows.length;
  for(var i = 1; i < len; i++){
    tab.deleteRow(1);
  }
}