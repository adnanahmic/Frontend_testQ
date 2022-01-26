import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { getPosts, getUsers } from '../service/api';
import Comment from './Comment';

class Post extends React.Component {
  constructor(p) {
    super(p);
    this.state = {
      posts: [],
      filteredPosts: [],
      users: {},
      error: null,
      isLoading: true,
      current: null,
    }
  }

  componentDidMount() {
    const { propMessage = '' } = this.props;
    console.log(`${propMessage} Post`);
    this.setState({ isLoading: true });
    this.getData()
  }

  handleSearch(value) {
    let {posts} = this.state;
    if(value && value.length > 0){
      const filteredPosts = posts.filter((post) => post.userName.toLowerCase().match(value))
      this.setState({filteredPosts});
    }
    else{
      this.setState({ filteredPosts: posts });
    }
  }
  async getData(value) {
    const users = await getUsers();
    const posts = await getPosts();
    let finalPosts = [];
    posts && posts.forEach((post) => {
      let userObj = users.find((userObj) => userObj.id == post.userId)
      finalPosts.push({
        ...post,
        userName: userObj.name
      })
      this.setState({posts: finalPosts, filteredPosts: finalPosts, users, isLoading: false})
    })
  }

  getComments(id) {
    this.setState({
      current: id,
    });
  }

  render() {
    const {
      error, isLoading, filteredPosts, current,
    } = this.state;
    const {
      propMessage,
    } = this.props;
    return (
      <div>
        <SearchBar
          propMessage={propMessage}
          onChange={(value) => { this.handleSearch(value) }}
        />
        {error && <p>{error.message}</p>}
        {isLoading ? (
          <h5>Loading....</h5>
        ) : (
          <ul>
            {filteredPosts.map((post) => (
              <li key={post.id}>
                <Link to={`/posts/${post.id}`}>
                  <div className="title">{post.title}</div>
                </Link>
                <div className="post">{post.body}</div>
                <div className="post">
                  By {post.userName}
                </div>
                <a href="#">
                  <div
                    className="link"
                    onClick={(e) => {
                      e.stopPropagation()
                      this.getComments(post.id)
                    }}
                  >
                    View Comment
                  </div>
                </a>
                {current === post.id
                && <Comment postId={post.id} propMessage={propMessage} />}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
Post.propTypes = {
  propMessage: PropTypes.string.isRequired,
};
export default Post;
