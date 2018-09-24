var DummyTasks=[
  {title:"task one", start: new Date("2018-01-01T01:00:00"), end: new Date("2018-12-31T23:59:00"), reoccuring:"never", priority:3, estTime:10, participatingUsers:[]},
  {title:"task two", start:new Date("2018-01-01T01:00:00"), end: new Date("2018-01-01T09:00:00"), reoccuring:"never", priority:1, estTime:10, participatingUsers:[]},
  {title:"task three", start: new Date("2018-01-01T01:00:00"), end: new Date("2018-01-01T09:00:00"), reoccuring:"never", priority:3, estTime:10, participatingUsers:[]}
]



$(document).ready(function(){
  $("#createTask").click(function(){
      //check to see if all form fields have been completed
      if(!validateForm())
      {
          alert("Please Complete All Fields");
      }
      else{
          var task = {title:$("#taskTitle").val(),start:$("#start").val(), end:$("#end").val(), reoccuring:$("#reoccuring").val(), 
                    numOfReoccurances:$("#numOfReoccurances").val()};
          var jobj = JSON.stringify(task);
          $("#json").text(jobj);
          console.log(jobj);
          
          var url = "task";
            $.ajax({
              url:url,
              type: "POST",
              data: jobj,
              contentType: "application/json; charset=utf-8",
              success: function(data,textStatus) {
                  createListHTML(DummyTasks)
              }
            })
      }
    });
});

function validateForm() {
    console.log("in validate form");
  var isValid = true;
  $("form#newTaskForm :input").each(function() {
    if ( $(this).val() === '')
        isValid = false;
        console.log("returning false for :"+ $(this));
  });
  return false;
}

function createListHTML(list){
                 var taskListHTML = "<ol>";
               for( var i in list)
               {
                 let t = list[i];
                 var timeRemaining = (t.end- t.start) / (1000*60*60);
                 taskListHTML += "<li> "+t.title+" - Due in: "+ timeRemaining+" hrs </li>";                
               }
               taskListHTML+="</ol>"
                $("#taskList").html(taskListHTML);
}

function displayReoccuringMenu(){
    var timeMeasurment = document.getElementById("reoccuring").value;
    if(timeMeasurment == "never")
    {menuHtml =""}
    else{
        var menuHtml= '<label>For how many '+ timeMeasurment+ 's: </label> <input type="number" name="numOfReoccurances"/>'
    }
     $("#reoccuringMenu").html(menuHtml);
}