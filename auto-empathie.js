(function ()
 {
   var flipped = false;

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
     var message = inputBox.text();

     if (!(/\S/).test(message))
       return;

     $("#note").remove();

     var bubble = document.createElement("div");
     bubble.className = "bubble you";

     var inner = document.createElement("div");
     inner.className = "bubble-inner";

     var text = document.createElement("span");
     text.className = "text";
     text.appendChild(document.createTextNode(message));

     inner.appendChild(text);

     var timestamp = document.createElement("div");
     var timestampText = createTimeString(new Date());
     timestamp.appendChild(document.createTextNode(timestampText));
     timestamp.className = "timestamp";
     inner.appendChild(timestamp);

     bubble.appendChild(inner);

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

     if (flipped)
       $("#face").css("transform", "");
     else
       $("#face").css("transform", "scaleX(-1)");

     flipped = !flipped;
   }

   function setup()
   {
     $("#inputbox").keypress(function(e) {
       if (e.which == 13 || e.which == 10) {
         e.preventDefault();

         if (e.ctrlKey)
           swapPeople();
         else
           handleMessage();
       }
     });

     $("#face").click(function(e) {
       swapPeople();
     });
   }

   $(document.body).ready(setup);
 })();
