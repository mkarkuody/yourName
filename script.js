
// added this code for the result function in HTML (Merdad)
$(function () {
    $('[data-callout-hover-reveal]').hover(function () {
        $(this).find('.callout-footer').slideDown(250);
    }, function () {
        $(this).find('.callout-footer').slideUp(250);
    });
})
// added this function for converting voice to text(Merdad)
function record() {
    var recognition = new webkitSpeechRecognition();
    recognition.lang = "en-GB";

    recognition.onresult = function(event) {
        // console.log(event);
        document.getElementById('speechToText').value = event.results[0][0].transcript;
    }
    recognition.start();

}
// end of voice recognition(Merdad)

$("#submit").on("click", function (event) {
    window.location.assign("./results.html")
    event.preventDefault();
    var name = $("#speechToText").val();
    var queryUrl = "https://api.agify.io?name=" + name;
    var queryUrl2 = "https://api.nationalize.io?name=" + name;

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        localStorage.setItem("age", JSON.stringify(response));
        var ageResult = $("<td>").text(response.age);
        $("#age").append(ageResult);
    });

    $.ajax({
        url: queryUrl2,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        localStorage.setItem("nationality", JSON.stringify(response));
        var nationalityResult = $("<td>").text(response.country[0].country_id);
        $("#nationality").append(nationalityResult);
    })

});
var nameEl= document.getElementById("speechToText")
var yourName= document.getElementById("yourName")
var value= nameEl.value;
yourName.innerHTML=value;

$(document).ready(function () {
    $("#submit").click(function () {
        $(".hero-section-text").toggle(".results");
    });
});