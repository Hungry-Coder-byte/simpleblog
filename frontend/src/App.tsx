import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ArticleDetail from './pages/ArticleDetail';
import CreateArticle from './pages/CreateArticle';
import EditArticle from './pages/EditArticle';
import UserProfile from './pages/UserProfile';

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/articles');
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        await response.json();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles/:id" element={<ArticleDetail />} />
          <Route path="/create" element={<CreateArticle />} />
          <Route path="/edit/:id" element={<EditArticle />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;