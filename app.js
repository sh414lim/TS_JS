const container = document.getElementById("root");

const ajax = new XMLHttpRequest(); // 출력결과 반환
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";
const content = document.createElement("div");

const getDate = (url) => {
  ajax.open("GET", url, false);
  ajax.send();

  return JSON.parse(ajax.response);
};

function newsFeed() {
  const newsFeed = getDate(NEWS_URL);
  const newsList = [];

  newsList.push("<ul>");
  for (let i = 0; i < 10; i++) {
    const title = newsFeed[i].title;
    const desc = newsFeed[i].comments_count;
    const id = newsFeed[i].id;

    newsList.push(`
      <li>
        <a href = "#${id}">${title} - ${desc}</a>
      </li>
      `);
  }
  newsList.push("</ul>");
  container.innerHTML = newsList.join(""); // 하나의 문자열 조인
}

function newsDetail() {
  const id = location.hash.substr(1);
  const url = CONTENT_URL.replace("@id", id);
  const newsContent = getDate(url);
  const subTitle = newsContent.title;

  container.innerHTML = `
          <h1>${subTitle}</h1>
      
          <div>
              <a href="#">back</a>
          </div>
        `;
}

function router() {
  const routePath = location.hash;
  console.log(routePath);
  if (routePath === "") {
    newsFeed();
  } else {
    newsDetail();
  }
}

window.addEventListener("hashchange", router);

router();
