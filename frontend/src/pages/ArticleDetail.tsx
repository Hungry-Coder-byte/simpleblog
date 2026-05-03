import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Article } from '../types';

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/articles/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch article');
        }
        const data: Article = await response.json();
        setArticle(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!article) {
    return <div className="text-center">Article not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-600 mb-4">{article.createdAt}</p>
      <div className="prose">{article.content}</div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Tags</h2>
        <ul className="list-disc pl-5">
          {article.tags.map((tag) => (
            <li key={tag} className="text-gray-700">{tag}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArticleDetail;