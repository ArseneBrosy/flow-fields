const urlParams = new URLSearchParams(window.location.search);

const mode = urlParams.get("mode");

const head= document.getElementsByTagName('head')[0];
let newScript = document.createElement("script");
newScript.src = `js/${mode}.js`;
head.appendChild(newScript);