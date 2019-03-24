const users = [{
  id: 1,
  name: 'Tolu',
  email: 'dan@yahoo.com',
  age: 6
}, {
  id:2,
  name: 'Daniel',
  email: "dan@emaail.com",
  age: 7
}]

const posts = [{
  id: 1,
  title: "Going home",
  body: "Home sweet home",
  published: true,
  authorId: 1,
  commentId: 1
}, {
  id: 2,
  title: "peculiar",
  body: "peculiar is precious to me",
  published: true,
  authorId: 1,
  commentId: 1
}]

const comments = [{
  id: 1,
  text: '33j3',
  authorId: 1,
  postId: 1
},
  {
    id: 2,
    text: 'I am home',
    authorId: 2,
    postId: 2
}]

const db = {
  users,
  posts,
  comments
}

export default db;

