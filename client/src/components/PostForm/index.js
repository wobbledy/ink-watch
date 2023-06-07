import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
// import { MUTATION_MATCHUPS } from '../../utils/mutations';

import { ADD_POST } from '../../utils/mutations';
import { QUERY_POSTS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const PostForm = () => {
  const [postText, setPostText] = useState('');

  // const [imagePreview, setImagePreview] = useState(null);

  // const [imageFile, setImageFile] = useState({});

  // const [imageUrl, setImageUrl] = useState(null);

  const [characterCount, setCharacterCount] = useState(0);

  const [addPost, { error }] = useMutation(ADD_POST, {
    update(cache, { data: { addPost } }) {
      try {
        const { posts } = cache.readQuery({ query: QUERY_POSTS });

        cache.writeQuery({
          query: QUERY_POSTS,
          data: { posts: [addPost, ...posts] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, posts: [...me.posts, addPost] } },
      });
    },
  });

  // const [postImage] = useMutation(MUTATION_MATCHUPS, {
  //   fetchPolicy: "no-cache",
  // });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addPost({
        variables: {
          // image: imageUrl ? imageUrl : '',
          postText,
          postAuthor: Auth.getProfile().data.username,
        },
      });

      setPostText('');
      // setImagePreview('');
      // setImageFile(null);
      // setImageUrl(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'postText' && value.length <= 280) {
      setPostText(value);
      setCharacterCount(value.length);
    }
  };


  // const handleImagePreview = (e) => {
  //   const file = e.target.files[0];
  //   setImageFile(file);

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.addEventListener("load", (e) => {
  //       setImagePreview(e.target.result);
  //     });
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const handleSubmit = async () => {
  //   try {
  //     const res = await postImage({ variables: { file: imageFile } });
  //     const imageUrl = res.data.uploadImage.image;
  //     setImageUrl(imageUrl);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };


  return (
    <div>
      <h3>Welcome to Ink Watch, where tattoo artists can share their art, helping people decide who their next artist is.</h3>

      <h4>Have some ink to share?</h4>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${characterCount === 280 || error ? 'text-danger' : ''
              }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="postText"
                placeholder="Here's a new post..."
                value={postText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* <div className="App">

              <div className="uploadImage">
                <input
                  type="file"
                  accept="image/png, image/jpg, image/jpeg, image/webp"
                  onChange={(e) => handleImagePreview(e)}
                />
              </div>

              

              <p>{imageUrl}</p>

              <div
                className="image-preview-div"
                style={{ display: imagePreview === "" ? "none" : "flex" }}
              >
                <img src={imagePreview} alt="" />
              </div>

            </div> */}

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Post
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default PostForm;
