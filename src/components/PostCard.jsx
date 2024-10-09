import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import appwriteService from "../appwrite/config.js";

function PostCard({ $id, featuredimage, title }) {
  const [imageUrl, setImageUrl] = useState();

  const getImageUrl = async () => {
    const url = await appwriteService.getFilePreview(featuredimage);
    setImageUrl(url?.href);
  };

  useEffect(() => {
    getImageUrl();
  }, [featuredimage]);

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full mb-4">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-auto object-cover rounded-xl" 
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
