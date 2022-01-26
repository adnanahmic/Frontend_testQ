import React from "react";
import { getComment } from "../service/api";
import PropTypes from 'prop-types';

class Comment extends React.Component {
  state = {
    data: [],
    error: null,
    isLoading: true
  };

  componentDidMount() {
    console.log(`${this.props.propMessage} Comment`);
    this.setState({ isLoading: true }, this.getData());
  }

  getData() {
    getComment(this.props.postId)
      .then(response => {
        this.setState({
          data: response,
          isLoading: false
        });
      })
      .catch(error => {
        this.setState({
          error,
          isLoading: false
        });
      });
  }

  render() {
    const { error, isLoading, data } = this.state;
    return (
      <div>
        <h4>Comments</h4>
        {error && <p>{error.message}</p>}
        {isLoading ? (
          <h5>Loading....</h5>
        ) : (
          <div>
            {
              data.map((comment)=>{
                return (
                  <div key={comment.id}>
                    <p className="comment">{comment.body}</p>
                    <div>
                      <span className="by">Commented By:</span>
                      <span className="name">{comment.name}</span>
                    </div>
                  </div>
                )
              })
            }
          </div>
        )}
      </div>
    );
  }
}
Comment.propTypes = {
  propMessage: PropTypes.string.isRequired,
  postId: PropTypes.number.isRequired
};

export default Comment;
