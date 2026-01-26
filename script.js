const WEB_APP_URL = https://script.google.com/macros/s/AKfycbzWtKAWn6ymYoYB2K994mnxKojN0kSHC3PPsa7K_hhOlUBFGWINh7sN0AhZBfJl95-lZg/exec; // Step 2 URL

document.getElementById("uploadForm").addEventListener("submit", function(e){
  e.preventDefault();

  const name = document.getElementById("name").value;
  const sid = document.getElementById("sid").value;
  const skill = document.getElementById("skill").value;
  const fileInput = document.getElementById("file");

  let fileName = fileInput.files[0] ? fileInput.files[0].name : "No file";

  const data = new URLSearchParams();
  data.append("name", name);
  data.append("sid", sid);
  data.append("skill", skill);
  data.append("file", fileName);

  fetch(WEB_APP_URL, { method: "POST", body: data })
    .then(res => res.text())
    .then(msg => {
      document.getElementById("msg").innerText = "✅ Submission stored in Google Sheet!";
      document.getElementById("uploadForm").reset();
    })
    .catch(err => {
      document.getElementById("msg").innerText = "❌ Submission failed. Try again.";
      console.error(err);
    });
});

