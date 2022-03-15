import React from "react";
import ArticlePreview from "./ArticlePreview";

const ArticleList = ({
  pager,
  articles,
  loading,
  articlesCount,
  currentPage,
}) => {
  if (!articles) {
    return <div className="article-preview">Loading...</div>;
  }
  if (articles?.length === 0) {
    return <div className="article-preview">No articles are here yet</div>;
  }
  return (
    <div>
      {articles.map((article) => {
        return <ArticlePreview article={article} key={article.slug} />;
      })}
    </div>
  );
};

export default ArticleList;
