import React from 'react';
import { Link } from 'react-router-dom';

const PostList = ({
  posts,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!posts.length) {
    return <h3>No Posts Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {posts &&
        posts.map((post) => (
          <div key={post._id} className="card mb-3" style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
            <h4 className="card-header bg-primary text-white p-3 m-0" style={{ fontSize: '1.2rem', backgroundColor: 'black', borderRadius: '8px' }}>
              {showUsername ? (
                <Link className="text-white"
                to={`/profiles/${post.postAuthor}`}>
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
            
            <Link
              className="btn btn-primary btn-block btn-squared mt-5 mb-5 mr-5 ml-5"
              to={`/posts/${post._id}`}
            >
              Join the discussion about this ink.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default PostList;
