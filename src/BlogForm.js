// BlogForm.js
import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
  text-align: center;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 20px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  border: 1px solid #ccc;
  height: 150px;
`;

const FormButton = styled.button`
  background: #3498db;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
`;

const SearchContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 10px;
  z-index: 1000;
`;

const SearchInput = styled.input`
  width: 200px; /* Adjust the width to make it smaller */
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const BlogsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  margin: auto;
`;

const BlogContainer = styled.div`
  flex: 0 0 48%;
  margin: 10px 0;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
`;

const BlogImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const BlogTitle = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
`;

const BlogDetails = styled.p`
  font-size: 16px;
  color: #555;
  line-height: 1.5;
`;

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [image, setImage] = useState('');
  const [blogs, setBlogs] = useState([
    {
      title: 'City Centre',
      details: 'Best place to find all the required things.',
      image: 'https://4.bp.blogspot.com/_jTEO63-CIhM/S9Qg-svPm6I/AAAAAAAAB1Y/8mszs7oB4nU/s1600/CityCentreMallMangalore2.JPG'
    },
    {
      title: 'Pabbas',
      details: 'It’s a famous ice cream & snacks joint in Mangaluru. Cutlet & grilled sandwiches are good. There are varieties of ice creams to choose from. Gadbad ice cream is most preferred one. A must visit for ice cream enthusiasts.',
      image: 'https://th.bing.com/th/id/R.1770685925f5a8fa71358bb8dc35968f?rik=6ILtZ5pzkPWmDw&riu=http%3a%2f%2faroundmangalore.com%2fwp-content%2fuploads%2f2014%2f02%2fIMG_20140201_205229.jpg&ehk=z2o3YdX6nzjbPhaYWOBts6o8jxId8%2fp8mnJmHrW3PlA%3d&risl=&pid=ImgRaw&r=0'
    }
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBlog = { title, details, image };
    setBlogs([...blogs, newBlog]);
    // Clear form fields
    setTitle('');
    setDetails('');
    setImage('');
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.details.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <FormContainer>
        <h2>Create a New Blog</h2>
        <form onSubmit={handleSubmit}>
          <FormInput
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <FormTextarea
            placeholder="Blog Details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
          />
          <FormInput
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
          <FormButton type="submit">Submit</FormButton>
        </form>
      </FormContainer>

      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search by title or details..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchContainer>

      <BlogsWrapper>
        {filteredBlogs.map((blog, index) => (
          <BlogContainer key={index}>
            <BlogTitle>{blog.title}</BlogTitle>
            <BlogImage src={blog.image} alt={blog.title} />
            <BlogDetails>{blog.details}</BlogDetails>
          </BlogContainer>
        ))}
      </BlogsWrapper>
    </div>
  );
};

export default BlogForm;
