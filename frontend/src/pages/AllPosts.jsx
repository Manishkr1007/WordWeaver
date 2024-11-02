import  { useState, useEffect } from "react";
import Container from "../components/container/Container";
import PostCard from "../components/PostCard";
import { useSelector } from "react-redux";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData); // Get logged-in user data

  useEffect(() => {
    if (userData?._id) {
      fetch(`http://localhost:3000/posts/user-posts/${userData._id}`)
        .then((response) => response.json())
        .then((posts) => setPosts(posts))
        .catch((error) => console.error("Error fetching posts:", error));
    }
  }, [userData]);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.length ? (
            posts.map((post) => (
              <div className="p-2 w-1/4" key={post._id}>
                <PostCard {...post} />
              </div>
            ))
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
