import React from 'react'
import appwriteService from "../appwrite/config"
import { useState } from 'react'
import { useEffect } from 'react'
import Container from '../components/container/Container'
import PostCard from "../components/PostCard"
import car from "../assets/img/car.jpg"
import dog from '../assets/img/dog.jpg'
import mountain from '../assets/img/mountain.jpg'
import ChatBotEmbed from "../components/chatbot.jsx";

function Home() {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    })
  }, [])
  console.log(posts)
  if (posts.length === 0) {
    return (
      <div className='w-full py-8'>
      <Container>
        <div className="flex flex-wrap">
        <div className="flex flex-wrap justify-center">
      <div className="w-full md:w-1/2 lg:w-1/3 p-4 transition-all hover:scale-105">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img className="w-full h-40 object-cover object-center" src={car} alt="Post 1" />
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Automotive</h2>
            <p className="text-gray-600">In this blog, we delve into the world of automotive passion, exploring the thrill of speed, the elegance of design, and the stories behind every engine's roar. Join us on a journey of car love.</p>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 lg:w-1/3 p-4 transition-all hover:scale-105">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img className="w-full h-40 object-cover object-center" src={dog} alt="Post 2" />
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Dog love</h2>
            <p className="text-gray-600">The human-dog relationship is a profound bond rooted in companionship, loyalty, and mutual understanding. It transcends language barriers, offering love, comfort, and unwavering support through life's highs and lows.</p>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 lg:w-1/3 p-4 transition-all hover:scale-105">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img className="w-full h-40 object-cover object-center" src={mountain} alt="Post 3" />
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Travelling in mountain</h2>
            <p className="text-gray-600">Travelling in mountains offers exhilarating experiences, from breathtaking vistas to challenging trails. It's a journey of self-discovery , where every step reveals landscapes and unforgettable adventures.</p>
          </div>
        </div>
      </div>

      {/* Add more posts as needed */}
    </div>
        </div>
      </Container>
      <ChatBotEmbed/>

    </div>
    )
  }

  return (
    <div className='w-full py-8'>
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div className="p-2 w-1/4" key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Home