import React from 'react';
import { useMutation } from '@apollo/client';
import { REMOVE_COMMENT } from '../../utils/mutations';

const CommentList = ({ comments = [], onDeleteComment }) => {
  const [removeCommentMutation] = useMutation(REMOVE_COMMENT);

  const handleDeleteComment = async (commentId) => {
    if (!commentId) {
      console.error('Invalid commentId');
      return;
    }

    try {
      await removeCommentMutation({
        variables: { commentId },
      });
      onDeleteComment(commentId);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  if (!comments.length) {
    return <h3>No Comments Yet</h3>;
  }

  return (
    <>
      <h3
        className="p-5 display-inline-block"
        style={{ borderBottom: '1px dotted #1a1a1a' }}
      >
        Comments
      </h3>
      <div className="flex-row my-4">
        {comments &&
          comments.map((comment) => (
            <div key={comment._id} className="col-12 mb-3 pb-3">
              <div className="p-3 bg-dark text-light">
                <h5 className="card-header">
                  {comment.commentAuthor} commented{' '}
                  <span style={{ fontSize: '0.825rem' }}>
                    on {comment.createdAt}
                  </span>
                </h5>
                <p className="card-body">{comment.commentText}</p>

                <div className="delete-comment-button">
                  <button
                    className="btn btn-danger btn-squared"
                    onClick={() => handleDeleteComment(comment._id)}
                  >
                    Delete Comment
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default CommentList;