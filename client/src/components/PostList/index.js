import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REMOVE_POST } from '../../utils/mutations';

const PostList = ({
  posts,
  title,
  showTitle = true,
  showUsername = true,
  onDeletePost,
}) => {
  const [removePostMutation] = useMutation(REMOVE_POST);

  const handleDeletePost = async (postId) => {
    if (!postId) {
      console.error('Invalid postId');
      return;
    }

    try {
      await removePostMutation({
        variables: { postId },
      });
      onDeletePost(postId);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (!posts.length) {
    return <h3>No Posts Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {posts &&
        posts.map((post) => (
          <div
            key={post._id}
            className="card mb-3"
            style={{
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}
          >
            <h4
              className="card-header bg-primary text-white p-3 m-0"
              style={{
                fontSize: '1.2rem',
                backgroundColor: 'black',
                borderRadius: '8px',
              }}
            >
              {showUsername ? (
                <Link className="text-white" to={`/profiles/${post.postAuthor}`}>
                  {post.postAuthor} <br />
                  <span style={{ fontSize: '1rem' }}>
                    shared this ink on {post.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You shared this ink on {post.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-white p-3">
              <p>{post.postText}</p>
            </div>

            <div className="button-group">
              <Link
                className="btn btn-primary btn-block btn-squared mr-2"
                to={`/posts/${post._id}`}
              >
                Join the discussion about this ink.
              </Link>

              <div className="delete-post-button">
                <button
                  className="btn btn-danger btn-squared"
                  onClick={() => handleDeletePost(post._id)}
                >
                  Delete Post
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostList;