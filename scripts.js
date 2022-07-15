const loadBtn = document.querySelector(".js-load");
const resultsContainer = document.querySelector(".js-results");
const searchInput = document.querySelector(".js-input");
const repContainer = document.querySelector(".rep-container");
const responseContainer = document.querySelector(".response-container");

// url API
const githubApiUrl = "https://api.github.com/users/";
const jphApiUrl = "https://jsonplaceholder.typicode.com/posts";

const responseAsyncAxios = async (value) => {
  try {
    const { data } = await axios.get(githubApiUrl + value);
    return data;
  } catch (error) {
    return null;
  }
};
const responseFetch = (limit) => {
  repContainer.innerHTML = "";
  fetch(jphApiUrl + `?_limit=${limit}`)
    .then((resp) => {
      resp.json().then((item) => {
        item.map((i) => {
          repContainer.innerHTML += `
            <h2>${i.title}</h2>
            <p>${i.body}</p>
          `;
        });
      });
    })
    .catch(() => {
      return null;
    });
};

loadBtn.addEventListener("click", async function (evt) {
  evt.preventDefault();
  const searchValue = searchInput.value.trim().toLowerCase();
  if (!searchValue.length) {
    responseContainer.innerHTML = "<h1>Пользователь не найден</h1>";
    repContainer.innerHTML = "";
    return;
  }

  let data = await responseAsyncAxios(searchValue);
  if (!data) {
    responseContainer.innerHTML = "<h1>Пользователь не найден</h1>";
    repContainer.innerHTML = "";
    return;
  }
  responseContainer.innerHTML = `
    <img src="${data.avatar_url}">
    <p> Имя: <span>${data.name}</span><p>
    <p> О себе: <span>${data.bio}</span><p>
    <p> Кол-во репозиториев: <span>${data.public_repos}</span><p>
  `;
  responseFetch(data.public_repos);
});
