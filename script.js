function addBox(text = "") {
  let div = document.createElement("div")
  div.style = "padding: 2px;"
  
  let frameInput = document.createElement("input")
  frameInput.type = "text"
  frameInput.className = "framein"
  frameInput.value = text
  div.appendChild(frameInput)
  let deleteButton = document.createElement("button")
  deleteButton.innerText = "X"
  deleteButton.style = "margin-left: 2px;"
  deleteButton.addEventListener("click", function() {
    document.getElementById("frameholder").removeChild(deleteButton.parentNode)
  })
  let duplicateButton = document.createElement("button")
  duplicateButton.innerText = "x2"
  duplicateButton.style = "margin-left: 2px;"
  duplicateButton.addEventListener("click", function() {
    addBox(frameInput.value)
  })
  
  div.appendChild(deleteButton)
  div.appendChild(duplicateButton)
  document.getElementById("frameholder").appendChild(div)
}

document.getElementById("add").addEventListener("click", function(e) {
  addBox()
})

document.getElementById("generate").addEventListener("click", function(e) {
  let out = "data:text/html,<html style=\"white-space:pre-wrap;font-size:"
  out += document.getElementById("fontsize").value.toString()
  out += "px;font-family:"
  out += document.getElementById("fonttype").value
  out += ";\">"
  if (!document.getElementById("cursed").checked) {
    out += "<meta charset=utf-8>"
  }
  out += "<script>i=0;setInterval(_=>document.body.textContent=["
  for (elem of document.querySelectorAll(".framein")) {
    out += "\"" + encodeURIComponent(elem.value) + "\","
  }
  out += "][i++%"
  out += document.querySelectorAll(".framein").length.toString()
  out += "],"
  out += document.getElementById("duration").value.toString()
  out += ")</script>"
  document.getElementById("output").innerText = out
  document.getElementById("output").href = out

  let encodedFrames = []
  for (elem of document.querySelectorAll(".framein")) {
    encodedFrames.push(encodeURIComponent(elem.value))
  }
  let perma = {"meta": {"font": document.getElementById("fonttype").value, "fontsize": document.getElementById("fontsize").value, "cursed": document.getElementById("cursed").checked, "speed": document.getElementById("duration").value}, "frames": encodedFrames}
  let b64 = "https://dancing-emoji.gingerindustries.repl.co/show.html#" + btoa([...new TextEncoder().encode(JSON.stringify(perma))].map(c => String.fromCharCode(c)).join(""))
  document.getElementById("permalink").innerText = b64
  document.getElementById("permalink").href = b64
  

})