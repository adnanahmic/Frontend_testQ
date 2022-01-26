import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Comment from './Comment';
import { getPostDetail } from '../service/api';

function PostDetail({ propMessage }) {
  const { id } = useParams();
  const [postDetail, setPostDetail] = useState({});
  console.log(`${propMessage} PostDetail`);
  useEffect(() => {
    getPostDetail(id)
      .then((response) => {
        setPostDetail(response);
      });
  }, [id])
  return (
    <div>
      <div className="title">{postDetail.title}</div>
      <div className="post">{postDetail.body}</div>
      {postDetail && postDetail.id && <Comment propMessage={propMessage} postId={postDetail.id} />}
    </div>
  )
}
PostDetail.propTypes = {
  propMessage: PropTypes.string.isRequired,
};

export default PostDetail;
