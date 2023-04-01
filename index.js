import { comments } from "./fetchAndRenderComments";
import { getListCommentsEdit } from "./getListComments";
import renderComments from "./renderComments";
import { fetchAndRenderComments } from "./fetchAndRenderComments";

const buttonElement = document.getElementById('add-button');
const listElement = document.getElementById('list');
const nameInputElement = document.getElementById('name-input');
const commentInputElement = document.getElementById('comment-input');
// const likeCounter = document.querySelectorAll('.likes-counter');
// const inputText = document.getElementById("comment-input");

commentInputElement.value = "";
nameInputElement.value = "";

// let comments = [];

const downloadAlert = () => {
    alert('Приложение загружается...');
}

// const fetchAndRenderComments = () => {
//     return fetch(
//         'https://webdev-hw-api.vercel.app/api/v1/:Panteleewa-Tatiana/comments', {
//         method: "GET"
//     }).then((response) => {
//         return response.json();
//     })
//         .then((responseData) => {
//             const options = {
//                 year: '2-digit',
//                 month: 'numeric',
//                 day: 'numeric',
//                 timezone: 'UTC',
//                 hour: 'numeric',
//                 minute: '2-digit',
//             };

//             const appComments = responseData.comments.map((comment) => {
//                 return {
//                     name: comment.author.name,
//                     date: new Date(comment.date).toLocaleString("ru-RU", options),
//                     text: comment.text,
//                     likes: comment.likes,
//                     isLiked: false,
//                 };
//             });
//             comments = appComments;
//             renderComments();
//         });
// };

// const clickLikeButton = () => {
//     const likeButtonsElements = document.querySelectorAll('.like-button');
//     for (const likeButtonElement of likeButtonsElements) {
//         likeButtonElement.addEventListener('click', (event) => {
//             const index = likeButtonElement.dataset.index;
//             if (comments[index].isLiked === false) {
//                 comments[index].isLiked = true;
//                 comments[index].likes += 1;
//             } else if (comments[index].isLiked === true) {
//                 comments[index].isLiked = false;
//                 comments[index].likes -= 1;
//             }
//             renderComments();
//             event.stopPropagation();

//         });
//     }
// };

// const clickComment = () => {
//     const commentElements = document.querySelectorAll(".comment");
//     for (const commentElement of commentElements) {
//         commentElement.addEventListener("click", () => {
//             const index = commentElement.dataset.index;
//             const userComment = `>  ${comments[index].text} \n \n ${comments[index].name}`;
//             document.getElementById("comment-input").value = userComment;
//             console.log(userComment);

//         })
//     }
// }

// const renderComments = () => {
//     const commentsHtml = comments
//         .map((comment, index) => {
//             return `<li id = "list-comment" data-index = '${index}' class="comment">
//           <div class="comment-header">
//             <div>${comment.name}</div>
//             <div>${comment.date}</div>
//           </div>
//           <div class="comment-body">
//             <div class="comment-text">
//               ${comment.text}
//             </div>
//           </div>
//           <div class="comment-footer">
//             <div class="likes">
//               <span class="likes-counter">${comment.likes}</span>
//               <button data-index = '${index}' class="${comment.liked ? 'like-button -active-like' : 'like-button'
//                 }"></button>
//             </div>
//           </div>
//         </li>`;
//         })
//         .join('');

//     listElement.innerHTML = commentsHtml;
//     clickLikeButton();
//     clickComment();
// };


downloadAlert();
fetchAndRenderComments(comments);

// const getListCommentsEdit = (comment, index) => {
//     return `<li id = "list-comment" data-index = '${index}' class="comment">
//           <div class="comment-header">
//             <div>${comment.name}</div>
//             <div>${comment.date}</div>
//           </div>
//           <div class="comment-body">
//             <div class="comment-text">
//               ${comment.text}
//             </div>
//           </div>
//           <div class="comment-footer">
//             <div class="likes">
//               <span class="likes-counter">${comment.likes}</span>
//               <button data-index = '${index}' class="${comment.liked ? 'like-button -active-like' : 'like-button'
//         }"></button>
//             </div>
//           </div>
//         </li>`;
// };


// const renderComments = (getListComments) => {
//     const commentsHtml = comments
//         .map((comment, index) => getListComments(comment, index)).join("");

//     listElement.innerHTML = commentsHtml;
//     clickLikeButton();
//     clickComment();
// };

renderComments(listElement, getListCommentsEdit);

buttonElement.addEventListener('click', () => {

    nameInputElement.classList.remove('error');
    commentInputElement.classList.remove('error');


    if (nameInputElement.value.length <= 1) {
        nameInputElement.classList.add('error');
        alert('Введено слишком короткое значение');
        return;
    } else if (commentInputElement.value.length <= 1) {
        commentInputElement.classList.add('error');
        alert('Введено слишком короткое значение');
        return;
    }

    buttonElement.disabled = true;
    buttonElement.textContent = 'Комментарий добавляется...';
    let form = document.querySelector('.add-form');
    let formStyle = form.style.cssText;
    formStyle.cssText += 'display: block';

    fetch(
        'https://webdev-hw-api.vercel.app/api/v1/:Panteleewa-Tatiana/comments', {
        method: "POST",
        body: JSON.stringify({
            text: commentInputElement.value,
            name: nameInputElement.value,
            forceError: true,
        }),
    })
        .then((response) => {
            if (response.status === 201) {
                return response.json();
            } else {
                throw new Error('Сервер упал');
            }
        })
        .then(fetchAndRenderComments)
        .then((data) => {
            buttonElement.disabled = false;
            buttonElement.textContent = 'Написать';
            nameInputElement.value = '';
            commentInputElement.value = '';
        })
        .catch((error) => {
            buttonElement.disabled = false;
            buttonElement.textContent = 'Написать';
            alert('Кажется, что-то пошло не так, попробуйте позже...');
            console.warn(error);
        });

    renderStudents(listElement, getListStudentsEdit);
});





