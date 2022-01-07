let data = JSON.parse(new TextDecoder().decode(new Uint8Array([...atob(document.location.hash.substring(1))].map(c => c.charCodeAt()))))
console.debug(data)

if (!data.meta.cursed) {
  let meta = document.createElement("meta")
  meta.setAttribute("charset", "utf-8")
  document.head.appendChild(meta)
}

let content = document.getElementById("anim")
content.style.fontSize = data.meta.fontsize
content.style.fontFamily = data.meta.font

let c = 0
setInterval(function() {
  content.innerText = decodeURIComponent(data.frames[c++%data.frames.length])
}, Number(data.meta.speed), )