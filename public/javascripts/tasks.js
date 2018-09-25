var Tasks=[];

window.onload= function(){
    getTasks();
}

$(document).ready(function(){
  $("#createTask").click(function(){
      //check to see if all form fields have been completed
      if(!validateForm())
      {
          alert("Please Complete All Fields");
          return false;
      }
      else{

          var task = {title:$("#taskTitle").val(),start:$("#start").val(), end:$("#end").val(), reoccuring:$("#reoccuring").val(), 
                    numOfReoccurances:$("[name=numOfReoccurances]").val(), priority:$("[name=priority]").val(), estTime:$("[name=estTime]").val()};
          if($("#reoccuring").val() != 'never')
          {createReoccuringTask(task);}
          else
          {createTask(task);}
          
          return false;
      }
    });
});

function createTask(task){
  var jobj = JSON.stringify(task);
  $("#json").text(jobj);

  var url = "task";
    $.ajax({
      url:url,
      type: "POST",
      data: jobj,
      contentType: "application/json; charset=utf-8",
      success: function(data,textStatus) {
          getTasks();
      }
    })
}

function createReoccuringTask(task){
    createTask(task)
    if(task.reoccuring =="day")
    { 
        console.log(task.numOfReoccurances);
        for(var i=0; i< task.numOfReoccurances; i++)
        {
            //TODO: adding Day is not working.
            task.start = (new Date(task.start));
            task.start = (task.start.add(1).day());
            console.log(task.start);
        }
    }
}

function getTasks(){
    $.getJSON('task', function(data) {
      Tasks = data;
      createListHTML(data);
    })
}

function updateStatus(i){
        var status = prompt("Please Enter your new status");
           var task = Tasks[i];
           task.status = status;
           var jobj = JSON.stringify(task);
           $("#json").text(jobj);

           var url = "task";
             $.ajax({
              url:url,
              type: "PUT",
              data: jobj,
              contentType: "application/json; charset=utf-8",
              success: function(data,textStatus) {
                  getTasks();
              }
            })
          return false;
}

function validateForm() {
  var isValid = true;
  $("form#newTaskForm :input").each(function() {
    if ( $(this).val() === '')
        isValid = false;
  });
  return isValid;
}

function createListHTML(list){
    var taskListHTML ="";
       for( var i in list)
       {
         let t = list[i];
         let currentTime = new Date();
         let e = new Date(t.end);
         //get hours left up to one decimal
         var timeRemaining = Math.round(((e-currentTime) / (1000*60*60))*10)/10;
         taskListHTML += "<h4> "+t.title+"</h4> <p>Due in: "+ timeRemaining+" hrs</p>";
         taskListHTML += "<p>Estimated amount of work: "+ t.estTime+" hours</p>";
         taskListHTML += "<p>Status: "+ t.status;
         taskListHTML += ' <button class="statusButton" onclick="updateStatus('+i+')">Update</button></p>';
         
       }
        $("#taskList").html(taskListHTML);
}

function sortOnPriority(){
    Tasks.sort(function(a,b){
        //let aTimeRem = ((new Date(a.end))- (new Date()));

        let aScore = a.estTime *a.priority;
        //let bTimeRem = ((new Date(b.end))- (new Date()));
        let bScore = b.estTime *b.priority;
        return bScore-aScore;
    });
    createListHTML(Tasks);
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
