let targetFormat = "png";

function setFormat(format) {
  targetFormat = format;
  document.getElementById("status").innerText =
    "Target format: " + format.toUpperCase();
}

function convertImage() {
  const input = document.getElementById("fileInput");
  const file = input.files[0];

  if (!file) {
    document.getElementById("status").innerText = "No file selected";
    return;
  }

  const img = new Image();
  const reader = new FileReader();

  reader.onload = e => {
    img.src = e.target.result;
  };

  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    const mime = targetFormat === "png" ? "image/png" : "image/jpeg";
    const dataURL = canvas.toDataURL(mime, 0.95);

    const link = document.createElement("a");
    link.href = dataURL;
    link.download =
      file.name.split(".")[0] + "." + targetFormat;

    link.click();
    document.getElementById("status").innerText = "Download started";
  };

  reader.readAsDataURL(file);
}
