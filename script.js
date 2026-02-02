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

    try {
      // REMOVED the 'headers' section to avoid CORS pre-flight errors
      const response = await fetch(WEB_APP_URL, {
        method: "POST",
        mode: "no-cors", // Use this if you just want it to send and don't need the 'Success' text back immediately
        body: JSON.stringify({
          studentName: studentName,
          studentId: studentId,
          skill: document.getElementById("skill").value,
          fileData: base64Data,
          fileName: file.name
        })
      });

      // Since we are using "no-cors", the browser won't let us read 'response.text()'
      // We manually set the success message after the fetch completes.
      message.innerHTML = "✅ Submission sent! Check your Google Sheet.";
      document.getElementById("uploadForm").reset();

    } catch (error) {
      message.innerHTML = "❌ Error: " + error.message;
    }
  };

  reader.readAsDataURL(file);
});
