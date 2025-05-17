import { useEffect, useState } from "react";
import { FeedPost } from "../feed/FeedPost";
import { api } from "../../lib/api";
import { PostType } from "../../pages/Feed";

export default function ProfilePosts() {
  const [posts, setFeedPosts] = useState<
    Array<ReturnType<typeof transformPost>>
  >([]);
  const [loading, setLoading] = useState(true);
  const transformPost = (post: PostType) => ({
    id: post.id,
    user: {
      id: post.user.id,
      name: post.user.name,
      image: post.user.profile_image,
      location: post.destination,
      verified: post.user.verified,
    },
    content: {
      text: post.content,
      images: post.images.map((img) => img.image),
      timestamp: new Date(post.created_at).toLocaleString(),
    },
    engagement: {
      likes: post.likes,
      comments: post.comments_count,
      shares: 0,
    },
    liked: post.liked,
  });

  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts");
      const data = res.data;

      const transformed = data.data.map((post: unknown) =>
        transformPost(post as PostType)
      );

      setFeedPosts(transformed);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch feed:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div className="space-y-6">
      {loading ? (
        <div>Loading...</div>
      ) : (
        posts.map((post) => <FeedPost key={post.id} {...post} />)
      )}
    </div>
  );
}
