import axios from 'axios';

export function getPosts() {
  return new Promise((resolve, reject) => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}
export function getUsers() {
  return new Promise((resolve, reject) => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}

export function getPostDetail(id) {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}

export function getComment(id) {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}
