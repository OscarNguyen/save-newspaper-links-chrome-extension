function getLinks() {

  // const linkElementList = document.getElementsByTagName("a")
  const linkElementList = document.querySelectorAll("li.article")
  const filteredList = []

  let date = new Date().getDate()
  if (date < 10) date = `0${date}`

  let month = new Date().getMonth() + 1
  if (month < 10) month = `0${month}`

  const year = new Date().getFullYear()

  // const condition = `30/06/${year}`
  const condition = `${date - 1}/${month}/${year}`
  // const condition = `${date}/${month}/${year}`
  console.log(condition)
  for (const linkElement of linkElementList) {
    const time = linkElement.children[0].children[2].innerText
    if (time.includes(condition)) {
      const link = linkElement.childNodes[1].href
      filteredList.push(link)
    }
  }

  //  let linkList = new Blob([filteredList.toString()],{type:'text/plain'})

  url = URL.createObjectURL(new Blob([filteredList.length > 0 && filteredList.toString()], { type: 'text/plain' }));
  // if(!!textFile){
  //   window.URL.revokeObjectURL(textFile)
  // }
  // textFile = window.URL.createObjectURL(linkList)

  // result = "changed"
  // isDone = true

  // console.log("casd", url)
  console.log(filteredList)
  return url
  // console.log("chrome", customChrome)
}


document.getElementById("getUrl").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  let result = "initial"
  let url = ""
  let isDone = false
  console.log(chrome)

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: getLinks
  }, (result) => {
    console.log("res", result)
  })
  // let docContent = "..." /* your content */;
  // console.log("cc")

  // let doc = URL.createObjectURL(new Blob([result.length > 0 && result.toString()], { type: 'text/plain' }));
  if (isDone) {
    console.log("done", url)
    chrome.downloads.download({ url, filename: "cc.txt", conflictAction: 'overwrite', saveAs: true });
  }



  // chrome.fileSystem.chooseEntry({
  //   type: 'saveFile', suggestedName: "cc.txt"
  // },
  //   (entry) => {
  //     entry.createWriter(writer => {
  //       writer.onwriteend = event => {
  //         alert("saved")
  //       }
  //       writer.write("dsda")
  //     })
  //   }
  // )

  // const linkElementList = document.querySelectorAll("li.article")
  // const filteredList = []

  // let date = new Date().getDate()
  // if (date < 10) date = `0${date}`

  // let month = new Date().getMonth() + 1
  // if (month < 10) month = `0${month}`

  // const year = new Date().getFullYear()

  // // const condition = `31/05/${year}`
  // // const condition = `${date - 1}/${month}/${year}`
  // const condition = `${date}/${month}/${year}`

  // for (const linkElement of linkElementList) {
  //   const time = linkElement.children[0].children[2].innerText
  //   if (time.includes(condition)) {
  //     const link = linkElement.childNodes[1].href
  //     filteredList.push(link)
  //   }
  // }


})

