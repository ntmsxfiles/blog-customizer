import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	type ArticleStateType,
} from './constants/articleProps';
import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [layoutConfig, updateLayoutConfig] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': layoutConfig.fontFamilyOption.value,
					'--font-size': layoutConfig.fontSizeOption.value,
					'--font-color': layoutConfig.fontColor.value,
					'--container-width': layoutConfig.contentWidth.value,
					'--bg-color': layoutConfig.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onSettingsChange={updateLayoutConfig} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
