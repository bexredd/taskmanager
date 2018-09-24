$(document).ready(function(){
  $("#createTask").click(function(){
      var task = {title:$("#taskTitle").val(),start:$("#start").val(), end:$("#end").val(), reoccuring:$("#reoccuring").val()};
      jobj = JSON.stringify(task);
      $("#json").text(jobj);
      console.log(jobj);
      
      var url = "task";
        $.ajax({
          url:url,
          type: "POST",
          data: jobj,
          contentType: "application/json; charset=utf-8",
          success: function(data,textStatus) {
               $("#taskAdded").html(textStatus);
          }
        })
      });
});