import { comments } from "./fetchAndRenderComments";

const renderComments = (getListComments) => {
    const commentsHtml = comments
        .map((comment, index) => getListComments(comment, index)).join("");

    listElement.innerHTML = commentsHtml;
    const clickLikeButton = () => {
        const likeButtonsElements = document.querySelectorAll('.like-button');
        for (const likeButtonElement of likeButtonsElements) {
            likeButtonElement.addEventListener('click', (event) => {
                const index = likeButtonElement.dataset.index;
                if (comments[index].isLiked === false) {
                    comments[index].isLiked = true;
                    comments[index].likes += 1;
                } else if (comments[index].isLiked === true) {
                    comments[index].isLiked = false;
                    comments[index].likes -= 1;
                }
                renderComments();
                event.stopPropagation();

            });
        }
    };
    const clickComment = () => {
        const commentElements = document.querySelectorAll(".comment");
        for (const commentElement of commentElements) {
            commentElement.addEventListener("click", () => {
                const index = commentElement.dataset.index;
                const userComment = `>  ${comments[index].text} \n \n ${comments[index].name}`;
                document.getElementById("comment-input").value = userComment;
                console.log(userComment);

            })
        }
    }
    clickLikeButton();
    clickComment();
};

export default renderComments;

renderComments(listElement, getListCommentsEdit); 