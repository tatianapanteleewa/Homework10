console.log();

let comments = [];

const fetchComments = () => {

    return fetch(
        'https://webdev-hw-api.vercel.app/api/v1/:Panteleewa-Tatiana/comments', {
        method: "GET"
    }).then((response) => {
        return response.json();
    })
        .then((responseData) => {
            const options = {
                year: '2-digit',
                month: 'numeric',
                day: 'numeric',
                timezone: 'UTC',
                hour: 'numeric',
                minute: '2-digit',
            };

            const appComments = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    date: new Date(comment.date).toLocaleString("ru-RU", options),
                    text: comment.text,
                    likes: comment.likes,
                    isLiked: false,
                };
            });
            comments = appComments;
        });
};
export { comments, fetchComments };