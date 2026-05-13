const widthDisplay = document.getElementById("window-width");
const heightDisplay = document.getElementById("window-height");
const unitSelect = document.getElementById("unit-select");

function getViewportSize() {
   return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
   };
}

function formatMeasurement(value, unit) {
   const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
   const bodyFontSize = parseFloat(getComputedStyle(document.body).fontSize);

   if (unit === "em") {
      return `${(value / bodyFontSize).toFixed(2)}em`;
   }

   if (unit === "rem") {
      return `${(value / rootFontSize).toFixed(2)}rem`;
   }

   if (unit === "percent") {
      return value;
   }

   return `${value}px`;
}

function updateWindowSize() {
   const size = getViewportSize();
   const selectedUnit = unitSelect.value;

   if (selectedUnit === "percent") {
      const widthPercent = (size.width / screen.width) * 100;
      const heightPercent = (size.height / screen.height) * 100;

      widthDisplay.textContent = `${widthPercent.toFixed(1)}%`;
      heightDisplay.textContent = `${heightPercent.toFixed(1)}%`;
      return;
   }

   widthDisplay.textContent = formatMeasurement(size.width, selectedUnit);
   heightDisplay.textContent = formatMeasurement(size.height, selectedUnit);
}

window.addEventListener("resize", updateWindowSize);
unitSelect.addEventListener("change", updateWindowSize);
updateWindowSize();