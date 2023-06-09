import React from 'react';
import { useQuery } from '@apollo/client';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

import PostList from '../components/PostList';
import PostForm from '../components/PostForm';

import { QUERY_POSTS } from '../utils/queries';
import GoogleMaps from '../components/GoogleMaps';

const Home = () => {
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ borderRadius: '6px', borderColor: 'blanchedalmond', borderStyle: 'inset', borderWidth: 'thick', }}
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
