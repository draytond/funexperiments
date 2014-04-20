//initialize the tabs that make up the page
$(function() {
    $( "#tabs" ).tabs();
});

//example of object oriented javascript
//using inheritance to define different ways of talking (whisper and yell, with Talk as base class)

function Talk(words){    // class
	this._message = words;
};

Talk.prototype.get = function fn1(){   // method1
	return this._message;
};

Talk.prototype.print = function fn1(){   // method2
	document.getElementById('sayTarget').innerHTML=this._message;
};

function Whisper(words){   //  subclass1
	Talk.call(this,words);
}

Whisper.prototype = Object.create(Talk.prototype);

Whisper.prototype.constructor = Whisper;

Whisper.prototype.print = function fn2(){   //  subclass1 method
	var toPrint = '<span style="font-size:50%; color: gray;">' + Talk.prototype.get.call(this) + "</span>";
	document.getElementById('sayTarget').innerHTML=toPrint;
}

function Shout(words){    //  subclass2
	Talk.call(this,words);
}

Shout.prototype = Object.create(Talk.prototype);

Shout.prototype.constructor = Shout;

Shout.prototype.print = function fn2(){   //  subclass2 method
	var toPrint = '<span style="font-size:150%; color: red;">' + Talk.prototype.get.call(this) + "!!!</span>";
	toPrint = toPrint.toUpperCase();
	document.getElementById('sayTarget').innerHTML=toPrint;
}

function getRadioValue() {  
	var inputs = document.getElementsByName("howToSay");
	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].checked) {
			return inputs[i].value;
		}
	}
	return "nothing";  // if the text box was left blank
}

function justSayIt(){  
	var talkText = document.getElementById('sayMe').value;
	var talkType = getRadioValue();

	switch(talkType){
		case "normal":
			var myMessage = new Talk(talkText);
			myMessage.print();
			break;
		case "shout":
			var myShout = new Shout(talkText);
			myShout.print();
			break;
		case "whisper":
			var myWhisper = new Whisper(talkText);
			myWhisper.print();
			break;
		case "nothing":
			alert("Doesn't look like you entered anything to print.  Hmmm.");
			break;
		default:
			alert("What is going on???");
	}

}