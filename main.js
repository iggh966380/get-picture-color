const upload = document.querySelector('#upload');
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const img = new Image();
const rgbaText = document.querySelector('#rgba');

upload.addEventListener('change', file => {
  const uploadedFile = file.target.files[0];
  if (file) {
    img.src = URL.createObjectURL(uploadedFile);
    img.onload = function() {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      img.style.display = 'none';
    }

    const hoveredColor = document.querySelector('#hovered-color');
    
    function pick(event, dest) {
      const x = event.layerX;
      const y = event.layerY;
      const pixel = ctx.getImageData(x, y, 1, 1);
      const data = pixel.data;

      const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
      dest.style.background = rgba;

      return rgba;
    }

    canvas.addEventListener('mousemove', function(event) {
      const rgba = pick(event, hoveredColor);
      rgbaText.textContent = rgba;
    })
  }
});
