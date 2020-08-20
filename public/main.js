getCss.addEventListener('click', () => {
  const request = new XMLHttpRequest()
  request.open('GET', '/style.css')
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      const style = document.createElement('style')
      style.innerHTML = request.response
      document.head.appendChild(style)
    }
  }
  request.send()
})

getJs.addEventListener('click', () => {
  const request = new XMLHttpRequest()
  request.open('GET', '/2.js')
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      const script = document.createElement('script')
      script.innerHTML = request.response
      document.body.appendChild(script)
    }
  }
  request.send()
})

getHtml.addEventListener('click', () => {
  const request = new XMLHttpRequest()
  request.open('GET', '/3.html')
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      const html = document.createElement('template')
      html.innerHTML = request.response
      document.body.appendChild(html.content.firstChild)
    }
  }
  request.send()
})

getXml.addEventListener('click', () => {
  const request = new XMLHttpRequest()
  request.open('GET', '/4.xml')
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      const msg = request.responseXML.getElementsByTagName('warning')[0].textContent.trim()
      alert('从请求的XML中获取到以下信息：\n' + msg)
    }
  }
  request.send()
})

let currentPage = 1
let loadPage = (flag) => {
  const request = new XMLHttpRequest()
  request.open('GET', `/page${currentPage}.json`)
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      let next = document.querySelector('ul').nextElementSibling
      document.querySelector('ul').remove()
      let data = JSON.parse(request.response)
      let liStr = data.map(x => `<li>${x.id}</li>`).join('')
      let ul = document.createElement('ul')
      ul.innerHTML = liStr
      document.body.insertBefore(ul, next)
    } else if (request.readyState === 4 && request.status !== 200) {
      flag === true ? currentPage++ : currentPage--
      alert(`没有${flag === true ? '上一页' : '下一页'}`)
    }
  }
  request.send()
}

getPre.addEventListener('click', () => {
  currentPage--
  loadPage(true)
})

getNext.addEventListener('click', () => {
  currentPage++
  loadPage()
})