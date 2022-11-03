import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
`;
const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;
const Label = styled.label`
  font-size: 14px;
`;
const Upload = ({ setOpen }) => {
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleTags = (e) => {
    setTags(e.target.value.split(','));
  };

  const uploadVideo = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('video', video);
    try {
      const { data } = await axios.post(`/api/v1/videos/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setInputs((prev) => {
        return { ...prev, videoUrl: data.videoSrc };
      });
      if (data) {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const uploadImg = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('image', img);
    try {
      const { data } = await axios.post(`/api/v1/videos/uploadimg`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setInputs((prev) => {
        return { ...prev, imgUrl: data.imgSrc };
      });
      if (data) {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    video && uploadVideo();
  }, [video]);

  useEffect(() => {
    img && uploadImg();
  }, [img]);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (loading) {
        console.log('wait');
      } else {
        const res = await axios.post('/api/v1/videos', { ...inputs, tags });
        setOpen(false);
        res.status === 200 && navigate(`/video/${res.data._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>X</Close>
        <Title>Upload a New Video</Title>
        <Label>Video:</Label>

        <Input
          type='file'
          accept='video/*'
          onChange={(e) => setVideo(e.target.files[0])}
        />

        <Input
          type='text'
          placeholder='Title'
          name='title'
          onChange={handleChange}
        />
        <Desc
          placeholder='Description'
          name='desc'
          rows={8}
          onChange={handleChange}
        />
        <Input
          type='text'
          placeholder='Separate the tags with commas.'
          onChance={handleTags}
        />
        <Label>Image:</Label>

        <Input
          type='file'
          accept='image/*'
          onChange={(e) => setImg(e.target.files[0])}
        />

        <Button onClick={handleUpload}>Upload</Button>
      </Wrapper>
    </Container>
  );
};

export default Upload;
