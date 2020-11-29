function showLoading(message){
    $("#loading-message").text((message !== '') ? message : 'Loading...');
    $("#wrapper").fadeIn();
}

function hideLoading(){
    $("#wrapper").fadeOut();
}

//ESC key
$(document).keyup(function(e) {
    //ESC
    if (e.key === 27){
        $("#wrapper").fadeOut();
    }
});