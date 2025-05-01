import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties } from 'react';
import clsx from 'clsx';
import { useState } from 'react';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';
import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
  const [layoutConfig, updateLayout] = useState({
    fontFamily: defaultArticleState.fontFamilyOption.value,
    fontSize: defaultArticleState.fontSizeOption.value,
    fontColor: defaultArticleState.fontColor.value,
    contentWidth: defaultArticleState.contentWidth.value,
    backgroundColor: defaultArticleState.backgroundColor.value,
  });

  const handleFormSubmit = (formData: typeof defaultArticleState) => {
    updateLayout({
      fontFamily: formData.fontFamilyOption.value,
      fontSize: formData.fontSizeOption.value,
      fontColor: formData.fontColor.value,
      contentWidth: formData.contentWidth.value,
      backgroundColor: formData.backgroundColor.value,
    });
  };

  return (
    <main
      className={clsx(styles.main)}
      style={
        {
          '--font-family': layoutConfig.fontFamily,
          '--font-size': layoutConfig.fontSize,
          '--font-color': layoutConfig.fontColor,
          '--container-width': layoutConfig.contentWidth,
          '--bg-color': layoutConfig.backgroundColor,
        } as CSSProperties
      }>
      <ArticleParamsForm onSettingsChange={handleFormSubmit} />
      <Article />
    </main>
  );
};

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

