// // XHR
// let xhr = new XMLHttpRequest();
//   xhr.open('GET', 'article.html.tpl');
//   xhr.onload = function() {
//     // tem article.html
//     let parserHTML = new DOMParser();
//     let template = parserHTML.parseFromString(xhr.response, 'text/html').body.firstChild;
//
//     let xhrJSON = new XMLHttpRequest();
//       xhrJSON.open('GET', 'https://my-json-server.typicode.com/tsunehito/db-articles/articles');
//       xhrJSON.onload = function() {
//         // article JSON
//         let articles;
//         try {
//           articles = JSON.parse(xhrJSON.response);
//         } catch (e) {}
//           // articles null | [];
//           if (articles) {
//             for (let article of articles){
//               let clone = template.cloneNode(true);
//                   clone.querySelector('[article-content]').innerText = article.content
//               document.querySelector('#articles').appendChild(clone);
//             }
//           }
//       }
//
//         xhrJSON.send();
//   }
//   xhr.send();

// FETCH

fetch('article.html.tpl').then(response => response.text() ).then( templateString => {
  let parserHTML = new DOMParser();
  let template = parserHTML.parseFromString(templateString, 'text/html').body.firstChild;

  fetch('https://my-json-server.typicode.com/tsunehito/db-articles/articles').then(response => response.json()).then(articles => {

    if (articles) {
      for (let article of articles){
        let clone = template.cloneNode(true);
            clone.querySelector('[article-content]').innerText = article.content;
            clone.querySelector('#img').src = 'img/'+ article.img;
            clone.querySelector('#view-content').href = 'http://localhost:8080/ajax_jquery/db-articles/project/article/' + article.id;
            document.querySelector('#articles').appendChild(clone);
      }
    }
  });
});

let url = document.querySelector('#view-content').onclick(function(){
  fetch('view_article.html.tpl').then(response => response.text()).then(templateStringOfView => {
    let parserHTML = new DOMParser();
    let template = parserHTML.parseFromString(templateStringOfView, 'text/html').body.firstChild;

    fetch('https://my-json-server.typicode.com/tsunehito/db-articles/articles/' + article.id).then(response => response.json()).then(contents => {
      if (contents){
        for(let content of contents){
          let clone = template.cloneNode(true);
              clone.querySelector('[article_title]').innerText = article.title;
              document.querySelector('#body').appendChild(clone);
        }
      }
    })
  })
});
