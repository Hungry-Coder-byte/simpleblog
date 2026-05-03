import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Article } from '../types';

interface UserProfileProps {
  userId: string;
}

const UserProfile: React.FC<UserProfileProps> = () => {
  const { userId } = useParams<{ userId: string }>();
  const [userProfile, setUserProfile] = useState<{ name: string; email: string } | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
        const data = await response.json();
        setUserProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    const fetchUserArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/articles?author=${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user articles');
        }
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
    fetchUserArticles();
  }, [userId]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      {userProfile && (
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{userProfile.name}</h1>
          <p className="text-gray-600">{userProfile.email}</p>
        </div>
      )}
      <h2 className="text-xl font-semibold mb-4">Articles by {userProfile?.name}</h2>
      {articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        <ul className="space-y-4">
          {articles.map((article) => (
            <li key={article._id} className="border p-4 rounded-md">
              <h3 className="text-lg font-semibold">{article.title}</h3>
              <p className="text-gray-700">{article.content.substring(0, 100)}...</p>
              <a href={`/article/${article._id}`} className="text-blue-500 hover:underline">
                Read more
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserProfile;