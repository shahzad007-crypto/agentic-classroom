const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzWtKAWn6ymYoYB2K994mnxKojN0kSHC3PPsa7K_hhOlUBFGWINh7sN0AhZBfJl95-lZg/exec";

document.getElementById("uploadForm").addEventListener("submit", async function(e){
  e.preventDefault();

  const studentId = document.getElementById("studentId").value;
  const file = document.getElementById("fileInput").files[0];
  const message = document.getElementById("message");

  if(!file){
    message.innerHTML = "❌ Please select a file.";
    return;
  }

  message.innerHTML = "Uploading... Please wait.";

  const reader = new FileReader();
  reader.onload = async function(){
    const base64Data = reader.result.split(',')[1];

    const response = await fetch(WEB_APP_URL, {
      method: "POST",
      body: JSON.stringify({
        studentId: studentId,
        fileData: base64Data,
        fileName: file.name
      })
    });

    const result = await response.text();
    message.innerHTML = result;
  };

  reader.readAsDataURL(file);
});
