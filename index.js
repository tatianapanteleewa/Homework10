const buttonElement = document.getElementById('add-button');
const listElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");
const likeCounter = document.querySelectorAll(".likes-counter")

const dateOption = {
  year: '2-digit',
  month: 'numeric',
  day: 'numeric',
};
const timeOption = {
  timezone: 'UTC',
  hour: 'numeric',
  minute: '2-digit',
}
let nowDate = new Date().toLocaleString("ru-RU", dateOption);
let nowTime = new Date().toLocaleString("ru-RU", timeOption);

const comments = [
  {
    name: "Глеб Фокин",
    date: "12.02.22 12:18",
    text: "Это будет первый комментарий на этой странице",
    likes: 3,
    liked: false,
  },
  {
    name: "Варвара Н.",
    date: "13.02.22 19:22",
    text: "Мне нравится как оформлена эта страница! ❤",
    likes: 75,
    liked: true,
  },
];

const clickLikeButton = () => {
  const likeButtonsElements = document.querySelectorAll(".like-button");
  for (const likeButtonElement of likeButtonsElements) {
    likeButtonElement.addEventListener("click", () => {
      const index = likeButtonElement.dataset.index;
      if (comments[index].liked === false) {
        comments[index].liked = true;
        comments[index].likes += 1;
      } else if (comments[index].liked === true) {
        comments[index].liked = false;
        comments[index].likes -= 1;
      }
      renderComments();
    });
  }
};


const renderComments = () => {
  const commentsHtml = comments
    .map((comment, index) => {
      return `<li id = "list-comment" class="comment">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button data-index = '${index}' class="${comment.liked ? "like-button -active-like" : "like-button"
        }"></button>
            </div>
          </div>
        </li>`;
    })
    .join("");

  listElement.innerHTML = commentsHtml;
  clickLikeButton();
};

renderComments();
clickLikeButton();



buttonElement.addEventListener("click", () => {
  nameInputElement.classList.remove("error");
  commentInputElement.classList.remove("error");

  if (nameInputElement.value === "") {
    nameInputElement.classList.add("error");
    return;
  } else if (commentInputElement.value === "") {
    commentInputElement.classList.add("error");
    return;
  }

  comments.push({
    name: nameInputElement.value,
    date: nowDate + " " + nowTime,
    text: commentInputElement.value,
    likes: 0,
    liked: false,
  });

  renderComments();
  clickLikeButton();
  nameInputElement.value = "";
  commentInputElement.value = "";
});


