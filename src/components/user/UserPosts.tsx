import { useEffect, useState } from "react";
import { FeedPost } from "../feed/FeedPost";
import { api } from "../../lib/api";
import { PostType } from "../../pages/Feed";

export function UserPosts({ username }: { username: string }) {
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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get(`/posts?username=${username}`);
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
    fetchPosts();
  }, []);
  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white rounded-lg p-4 animate-pulse">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
            <div className="flex justify-between">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  //   if (error) {
  //     return (
  //       <div className="bg-red-50 p-4 rounded-lg text-red-600">
  //         <p>Error loading posts: {error}</p>
  //       </div>
  //     );
  //   }

  if (posts.length === 0) {
    return (
      <div className="bg-white rounded-lg p-8 text-center">
        <p className="text-gray-500">No posts to display</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <FeedPost key={post.id} {...post} />
      ))}
    </div>
  );
}
