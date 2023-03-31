const getListCommentsEdit = (comment, index) => {
    return `<li id = "list-comment" data-index = '${index}' class="comment">
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
              <button data-index = '${index}' class="${comment.liked ? 'like-button -active-like' : 'like-button'
        }"></button>
            </div>
          </div>
        </li>`;
};

export { getListCommentsEdit }; 