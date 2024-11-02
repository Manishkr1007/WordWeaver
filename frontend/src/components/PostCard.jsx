
import { Link } from 'react-router-dom';

function PostCard({ $id, featuredImage, title }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full mb-4">
          <img 
            src={featuredImage} // Use featuredImage directly
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
