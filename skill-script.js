//example of object oriented javascript
//using inheritance to define different ways of talking (whisper and yell, with Talk as base class)

function Talk(words) {    // class
    "use strict";
    this.message = words;
}

Talk.prototype.get = function () {   // method1
    "use strict";
    return this.message;
};

Talk.prototype.print = function () {   // method2
    "use strict";
    document.getElementById('sayTarget').innerHTML = this.message;
};

function Whisper(words) {   //  subclass1
    "use strict";
    Talk.call(this, words);
}

Whisper.prototype = Object.create(Talk.prototype);

Whisper.prototype.print = function () {   //  subclass1 method
    "use strict";
    var toPrint = '<span style="font-size:50%; color: gray">' + Talk.prototype.get.call(this) + "</span>";
    document.getElementById('sayTarget').innerHTML = toPrint;
};

function Shout(words) {    //  subclass2
    "use strict";
    Talk.call(this, words);
}

Shout.prototype = Object.create(Talk.prototype);

Shout.prototype.print = function () {   //  subclass2 method
    "use strict";
    var toPrint = '<span style="font-size:150%; color: red;">' + Talk.prototype.get.call(this) + "!!!</span>";
    toPrint = toPrint.toUpperCase();
    document.getElementById('sayTarget').innerHTML = toPrint;
};

function getRadioValue() {
    "use strict";
    var inputs = document.getElementsByName("howToSay"),
        i;
    for (i = 0; i < inputs.length; i += 1) {
        if (inputs[i].checked) {
            return inputs[i].value;
        }
    }
    return "nothing";  // if the text box was left blank
}

function justSayIt() {
    "use strict";
    var talkText = document.getElementById('sayMe').value,
        talkType = getRadioValue(),
        myMessage,
        myShout,
        myWhisper;

    switch (talkType) {
    case "normal":
        myMessage = new Talk(talkText);
        myMessage.print();
        break;
    case "shout":
        myShout = new Shout(talkText);
        myShout.print();
        break;
    case "whisper":
        myWhisper = new Whisper(talkText);
        myWhisper.print();
        break;
    case "nothing":
        alert("Doesn't look like you entered anything to print.  Hmmm.");
        break;
    default:
        alert("What is going on???");
    }
}


$(document).ready(function () {
    //initialize the tabs that make up the page with jquery accordion widget
    "use strict";
    $("#tabs").tabs();

    // AJAX examples
    $('#load').click(function () {
        $('#ajaxTarget').load('ajax/loadme.txt #thePartToLoad');
    });

    $("#get").click(function () {
        $.get("ajax/getme.txt", function (data) {
            // I prefer console.log() for debugging since it doesn't stop all of the page's processes
            console.log(data);
            // Note: this isn't going to work locally unless you have a server set up
            $('#ajaxTarget').html(data);
        });
    });

    $("#post").click(function () {
        $.post("myserver.php", {username: "UzrN4m3", password: "SuP3R_S3cRET-P4SSW0rd"}, function (data, status) {
            $('#ajaxTarget').html("Username and Password data passed to server:<br />" + data + "<br />Status: " + status);
        });
    });

    $("#ajax").click(function () {
        $.ajax({
            url: "ajax/ajaxme.txt",
            beforeSend: function () {
                // found this random color generator on 
                //http://css-tricks.com/snippets/javascript/random-hex-color/ 
                //although I modified it slightly to include the # so it's easier to use in this case
                var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
                $('#ajaxTarget').css('background-color', randomColor);
            },
            success: function (response) {
                $("#ajaxTarget").html(response);
            },
            error: function () {
                $('#ajaxTarget').html("Hmmm, it looks like there was some kind of error.  Are you trying to run this locally?");
            }
        });
    });

    function printTable(theData) {
        var theTOC = "<h4>JavaScript: The Good Parts</h4>";
        $(theData.javaScriptTheGoodParts).each(function (value) {
            theTOC += "Chapter " + value.chapter + ": " + value.title + "<br />";
        });
        $('#jsonTarget').html(theTOC);
    }

    $('#getjson').click(function () {
        $.getJSON('ajax/goodparts.json', function (data) {
            printTable(data);
        });
    });

    $('#jsonajax').click(function () {
        $.ajax({
            url: "ajax/goodparts.json",
            dataType: "json",
            type: "get",
            cache: false,
            success: function (data) {
                printTable(data);
            }
        });
    });

    $('#jsonreset').click(function () {
        $('#jsonTarget').html("Table of contents should show up here...");
    });

    $('#zip').keyup(function () {
        var yourzip = $(this).val(),
            requestURL;

        if (yourzip.length === 5 && $.isNumeric(yourzip)) {
            requestURL = "http://ZiptasticAPI.com/" + yourzip + "?callback=?";
            $.getJSON(requestURL, null, function (data) {
                var outputzip = "";
                if (data.city) {
                    outputzip += data.city;
                }
                if (data.state) {
                    outputzip += ", " + data.state;
                }
                $('#mytown').html(outputzip);
            });
        }
    });

    //makes the donuts draggable within the pink dashed box
    $('#sortable').sortable();

    //turns an ordinary text field into a datepicker
    $("#birthday").datepicker();

    //making Wile E Coyote eplode when clicked
    $(".wilecoyote").click(function () {
        var myeffects = ["explode", "blind", "bounce", "clip", "fade",
            "fold", "highlight", "puff", "pulsate", "shake"],
            i = Math.floor(Math.random() * 10);

        $(this).effect(myeffects[i], 400);
        $('#resetwilecoyote').show();
    });

    $('#resetwilecoyote').click(function () {
        console.log('clicked');
        $('.wilecoyote').show();
        $(this).hide();
    });
});  // end of $(document).ready