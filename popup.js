document.getElementById("getUrl").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      // const linkElementList = document.getElementsByTagName("a")
      const linkElementList = document.querySelectorAll("li.article")
      const filteredList = []

      let date = new Date().getDate()
      if (date < 10) date = `0${date}`

      let month = new Date().getMonth() + 1
      if (month < 10) month = `0${month}`

      const year = new Date().getFullYear()

      // const condition = `31/05/${year}`
      const condition = `${date - 1}/${month}/${year}`
      // const condition = `${date}/${month}/${year}`

      for (const linkElement of linkElementList) {
        const time = linkElement.children[0].children[2].innerText
        if (time.includes(condition)) {
          const link = linkElement.childNodes[1].href
          filteredList.push(link)
        }
      }

      console.log(filteredList)
    }
  })
})