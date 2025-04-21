function updateMaskRects() {
  const placeholders = document.querySelectorAll(".placeholder");
  const video = document.getElementById("bg-video");

  const svgWidth = window.innerWidth;
  const svgHeight = window.innerHeight;

  let maskRects = "";

  placeholders.forEach((placeholder) => {
    const rect = placeholder.getBoundingClientRect();
    const x = rect.left;
    const y = rect.top;
    const width = rect.width;
    const height = rect.height;

    maskRects += `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="white" />`;
  });

  const svgMask = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}">
      <mask id="video-mask" maskUnits="userSpaceOnUse">
        <rect width="100%" height="100%" fill="black" />
        ${maskRects}
      </mask>
      <rect width="100%" height="100%" fill="white" mask="url(#video-mask)" />
    </svg>
  `;

  const encoded = encodeURIComponent(svgMask).replace(/'/g, "%27").replace(/"/g, "%22");
  const dataUrl = `url("data:image/svg+xml;utf8,${encoded}")`;

  video.style.maskImage = dataUrl;
  video.style.webkitMaskImage = dataUrl;
}

window.addEventListener("load", () => {
  updateMaskRects();
  setTimeout(updateMaskRects, 100);
  setTimeout(updateMaskRects, 300);
  if (document.fonts) {
    document.fonts.ready.then(updateMaskRects);
  }
});

window.addEventListener("resize", updateMaskRects);
