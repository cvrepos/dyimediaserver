var doAjax = function(dataString, onSuccess){
    $.ajax({					
        type: "GET",
        url: "http://127.0.0.1:8888/add?",
        data: dataString,
        success: onSuccess										
    });
};
var onSuccess = function(response) {
    console.log("added to the playlist");
};

$.each( $("iframe"), function(index, obj){
        var src = $(obj).attr('src');
        if(src.indexOf("youtube.com/embed/") != -1) {
            var values = src.split('/');
            if(values.length == 5) {
                doAjax("id=" + values[4], onSuccess);
            }
        }
});
