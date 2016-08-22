(function ()
 {
   function doubleNumber(n)
   {
     if (n < 10)
       return "0" + n;
     else
       return "" + n;
   }

   function createTimeString(d)
   {
     return doubleNumber(d.getHours()) + ":" + doubleNumber(d.getMinutes());
   }

   function handleMessage()
   {
     var inputBox = $("#inputbox");
     var text = inputBox.text();

     if (!(/^\S/).test(text))
       return;

     var bubble = document.createElement("div");
     bubble.className = "bubble you";
     bubble.appendChild(document.createTextNode(text));

     var timestamp = document.createElement("div");
     var timestampText = createTimeString(new Date());
     timestamp.appendChild(document.createTextNode(timestampText));
     timestamp.className = "timestamp";
     bubble.appendChild(timestamp);

     $("#speech-container").append(bubble);

     inputBox.empty();

     var container = $("#speech-container")[0];
     container.scrollTop = container.scrollHeight;
   }

   function swapPeople()
   {
     $("#speech-container .bubble").each(function() {
       if (/\byou\b/.test(this.className))
         this.className = "bubble them";
       else
         this.className = "bubble you";
     });
   }

   function setup()
   {
     $("#inputbox").keypress(function(e) {
       if (e.which == 13) {
         e.preventDefault();

         handleMessage();
       } else if (e.keyCode == 9) {
         e.preventDefault();

         swapPeople();
       }
     });

       handleMessage();
     });
   }

   $(document.body).ready(setup);
 })();
