import  {useEffect, useState} from 'react'
import { Link, useNavigate, useParams} from "react-router-dom"

import Button from "../components/Button"
import Container from "../components/container/Container"
import parse from "html-react-parser"
import {useSelector } from "react-redux"

function Post() {
  const [post, setPost] = useState(null)
  const {slug} = useParams()
  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)
  const isAuthor = post && userData ? post.userid === userData.$id : false
  const [imageUrl, setImageUrl] = useState();
  useEffect(() => {   
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post)
          getImageUrl(post);
        }else {
          navigate("/")
        }
      })
    }
  }, [slug, navigate])
  console.log(post)

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredimage);
        navigate("/")
      }
    })
  }

  const getImageUrl = async (post) => {
    const imgurl = await appwriteService.getFilePreview(post?.featuredimage);
    console.log(imgurl)
    setImageUrl(imgurl?.href)
  }

  console.log(imageUrl)
 
  return post ? (
    <div className="py-8">
      <Container>
        <div className='w-full flex justify-center mb-4 relative border rounded-xl p-2'>
          
          <img src={imageUrl} alt={post.title} className='rounded-xl h-96   mr-16' />
          
          { isAuthor && (
            <div className="absolute-right-3  top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">Edit</Button>
              </Link>
              <Button bgColor="bg-red-500" 
              onClick={deletePost}
              >Delete</Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <div className="browser-css">
            {parse(post.content)}
          </div>
        </div>
      </Container>
    </div>
  ) : null
}

export default Post