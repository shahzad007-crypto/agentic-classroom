const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbweWrIHVMs-4xJlgPrKXPjIDF2kfmUvDvGnbqdoxYWVGXzDYrxbWlDWJkPUkdBhRIkz/exec";

document.getElementById("uploadForm").addEventListener("submit", async function(e){
  e.preventDefault();

  const studentName = document.getElementById("studentName").value;
  const studentId = document.getElementById("studentId").value;
  const file = document.getElementById("fileInput").files[0];
  const message = document.getElementById("message");

  if(!file){
    message.innerHTML = "❌ Please select a file.";
    return;
  }

  message.innerHTML = "Uploading...";

  const reader = new FileReader();
  reader.onload = async function(){
    const base64Data = reader.result.split(',')[1];

    const response = await fetch(WEB_APP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        studentName: studentName,
        studentId: studentId,
        skill: document.getElementById("skill").value,
        fileData: base64Data,
        fileName: file.name
      })
    });

    const result = await response.text();
    message.innerHTML = result;
  };

  reader.readAsDataURL(file);
});
