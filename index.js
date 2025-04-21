function updateMaskRects() {
  const placeholders = document.querySelectorAll(".placeholder");
  const svg = document.getElementById("video-mask-layer");
  const svgRect = svg.getBoundingClientRect();

  placeholders.forEach((placeholder, index) => {
    const rect = placeholder.getBoundingClientRect();
    const svgX = rect.left - svgRect.left;
    const svgY = rect.top - svgRect.top;

    const maskRect = document.getElementById(`mask-${index + 1}`);
    if (maskRect) {
      maskRect.setAttribute("x", svgX);
      maskRect.setAttribute("y", svgY);
      maskRect.setAttribute("width", rect.width);
      maskRect.setAttribute("height", rect.height);
    }
  });
}

window.addEventListener("load", () => {
  updateMaskRects();
  setTimeout(updateMaskRects, 100);
  setTimeout(updateMaskRects, 500);
});

window.addEventListener("resize", updateMaskRects);
