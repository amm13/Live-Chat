var socket = io.connect("http://192.168.1.39:8080" , {"forceNew":true});


socket.on("messages" , function(data){
	render(data);
});

function render(data){
	var html = data.map(function(value,index){
		return (`
			<div class="message">
				<strong>${value.nickname}</strong> say:
				<p>${value.text}</p>
			</div>
		`)
	}).join(" ");

	var message_div = document.getElementById("messages");
	message_div.innerHTML = html;
	message_div.scrollTop = message_div.scrollHeight;
}

function addMessage(e){
	var message = {
		nickname: document.getElementById("nickname").value,
		text: document.getElementById("text").value
	}

	document.getElementById("nickname").style.display = "none";

	socket.emit("add-message" , message);
	return false;
}