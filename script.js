document.getElementById("uploadForm").addEventListener("submit", function(e){
 e.preventDefault();
 document.getElementById("msg").innerText =
 "✅ Submission received! (In real system, file + data stored)";
});

