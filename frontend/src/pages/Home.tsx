import React, { useEffect, useState } from 'react';
import { Article } from '../types';
import { useSearchParams } from 'react-router-dom';

const Home: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('query') || '';

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/articles${searchQuery ? `?query=${searchQuery}` : ''}`);
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [searchQuery]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get('query') as string;
    setSearchParams({ query });
  };

  if (loading) {
    return <div className="text-center">Loading articles...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          name="query"
          defaultValue={searchQuery}
          placeholder="Search articles..."
          className="border rounded p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white rounded p-2 mt-2">Search</button>
      </form>
      <h1 className="text-2xl font-bold mb-4">Published Articles</h1>
      <ul>
        {articles.map(article => (
          <li key={article._id} className="border-b py-2">
            <a href={`/articles/${article._id}`} className="text-blue-600 hover:underline">
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;