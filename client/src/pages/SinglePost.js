import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import { QUERY_SINGLE_POST } from '../utils/queries';

const SinglePost = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { postId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_POST, {
    // pass URL parameter
    variables: { postId: postId },
  });

  const post = data?.post || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3" style={{ backgroundColor: '#f5f5f5', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.6)', color: '#333', padding: '20px' }}>
  <h3 className="card-header bg-primary text-dark p-2 m-0" style={{ fontSize: '2rem', marginBottom: '10px' }}>
    {post.postAuthor} <br />
    <span style={{ fontSize: '1rem', color: '#666' }}>
      shared this on {post.createdAt}
    </span>
  </h3>
  <div className="bg-white p-4 mb-4" style={{ borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
    <blockquote
      className="p-0 m-0"
      style={{
        fontSize: '1.2rem',
        fontStyle: 'italic',
        lineHeight: '1.5',
        color: '#555',
        borderLeft: '4px solid #007bff',
        paddingLeft: '15px',
      }}
    >
      {post.postText}
    </blockquote>
  </div>
  <div className="my-4">
    <CommentList comments={post.comments} />
  </div>
  <div className="m-3 p-4" style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
    <CommentForm postId={post._id} />
  </div>
</div>
  );
};

export default SinglePost;
