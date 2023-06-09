import React from 'react';
import { useQuery } from '@apollo/client';

import PostList from '../components/PostList';
import PostForm from '../components/PostForm';

import { QUERY_POSTS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{
            borderRadius: '6px',
            borderColor: 'blanchedalmond',
            borderStyle: 'inset',
            borderWidth: 'thick',
            boxShadow: 'rgba(22, 31, 39, 0.42) 0px 60px 123px -25px rgba(19, 26, 32, 0.08) 0px 35px 75px -35px'
          }}
        >
          <PostForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <PostList
              posts={posts}
              title="Some Feed for Post(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
