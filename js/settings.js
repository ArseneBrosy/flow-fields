document.addEventListener("input", (e) => {
  if (document.querySelector(`#${e.target.id}-text`) === null) {
    return;
  }
  document.querySelector(`#${e.target.id}-text`).innerHTML = e.srcElement.value;
});

document.querySelector("#reset-screen").addEventListener("change", (e) => {
  RESET_CANVAS = e.target.checked;
});

document.querySelector("#show-trails").addEventListener("change", (e) => {
  SHOW_TRAILS = e.target.checked;
  document.querySelector("#trails-size-parameter").style.display = e.target.checked ? "block" : "none"
});

document.querySelector("#trails-size").addEventListener("change", (e) => {
  PATH_SIZE = e.target.value;
});

document.querySelector("#background-color").addEventListener("change", (e) => {
  const color = document.querySelector("#background-color").value;
  const opacity = document.querySelector("#background-opacity").value;
  const r = parseInt(color.substring(1,3), 16);
  const g = parseInt(color.substring(3,5), 16);
  const b = parseInt(color.substring(5), 16);
  BACKGROUND_COLOR = `rgba(${r}, ${g}, ${b}, ${opacity})`;
});

document.querySelector("#background-opacity").addEventListener("change", (e) => {
  const color = document.querySelector("#background-color").value;
  const opacity = document.querySelector("#background-opacity").value;
  const r = parseInt(color.substring(1,3), 16);
  const g = parseInt(color.substring(3,5), 16);
  const b = parseInt(color.substring(5), 16);
  BACKGROUND_COLOR = `rgba(${r}, ${g}, ${b}, ${opacity})`;
});

document.querySelector("#particles-color").addEventListener("change", (e) => {
  const color = document.querySelector("#particles-color").value;
  const opacity = document.querySelector("#particles-opacity").value;
  const r = parseInt(color.substring(1,3), 16);
  const g = parseInt(color.substring(3,5), 16);
  const b = parseInt(color.substring(5), 16);
  PARTICLES_COLOR = `rgba(${r}, ${g}, ${b}, ${opacity})`;
});

document.querySelector("#particles-opacity").addEventListener("change", (e) => {
  const color = document.querySelector("#particles-color").value;
  const opacity = document.querySelector("#particles-opacity").value;
  const r = parseInt(color.substring(1,3), 16);
  const g = parseInt(color.substring(3,5), 16);
  const b = parseInt(color.substring(5), 16);
  PARTICLES_COLOR = `rgba(${r}, ${g}, ${b}, ${opacity})`;
});

document.querySelector("#particles-multicolor").addEventListener("change", (e) => {
  PARTICLES_MULTICLOR = e.target.checked;
});