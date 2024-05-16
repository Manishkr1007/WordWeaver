import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import appwriteService from "../appwrite/config.js"

function PostCard(post) {
  const { $id, featuredimage, title } = post;
  const [imageUrl, setImageUrl] = useState();

  const getImageUrl = async () => {
    const url = await appwriteService.getFilePreview(featuredimage);
    setImageUrl(url?.href);
  }

  useEffect(() => {
    getImageUrl()
  }, [featuredimage])
  console.log(imageUrl)
  return (
    <Link to={`/post/${$id}`}>
        <div
        className='w-full bg-gray-100 rounded-xl p-4'
        >
            <div
            className='w-full justify-center mb-4'
            >
                <img src={imageUrl} alt={title}
                className='rounded-xl'
                />
            </div>
            <h2 className='text-xl font-bold'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard