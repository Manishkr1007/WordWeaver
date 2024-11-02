import { useState } from 'react'
import {useParams, useNavigate} from "react-router-dom"
import { useEffect } from 'react'
import Container from "../components/container/Container"
import PostForm from "../components/post-form/PostForm"

function EditPost() {
  const [post, setPost] = useState(null)
  const {slug} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post)
        }else {
          navigate("/")
        }
      })
    }
  }, [slug, navigate])

  return (
    <div className='py-6'>
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  )
}

export default EditPost