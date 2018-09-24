var DummyTasks=[
  {title:"task one", start:Date("2018-01-01T01:00:00"), end:Date("2018-12-31T23:59:00"), reoccuring:"never", priority:3, estTime:10, participatingUsers:[]},
  {title:"task two", start:Date("2018-01-01T01:00:00"), end:Date("2018-01-01T09:00:00"), reoccuring:"never", priority:1, estTime:10, participatingUsers:[]},
  {title:"task three", start:Date("2018-01-01T01:00:00"), end:Date("2018-01-01T09:00:00"), reoccuring:"never", priority:3, estTime:10, participatingUsers:[]}
]



$(document).ready(function(){
  $("#createTask").click(function(){
      var task = {title:$("#taskTitle").val(),start:$("#start").val(), end:$("#end").val(), reoccuring:$("#reoccuring").val()};
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
               
               var taskListHTML = "<ul>";
               for( var i in DummyTasks)
               {
                 let t = DummyTasks[i];
                 var timeRemaining = 0;
                 console.log(t.start - t.end);
                 console.log("time :"+timeRemaining);
                 taskListHTML += "<li> "+t.title+" - Time Remaining: "+ timeRemaining+" </li>";                
               }
               taskListHTML+="</ul>"
                $("#taskList").html(taskListHTML);
               
            
          }
        })
      });
});


