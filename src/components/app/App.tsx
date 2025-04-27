import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';
import { CSSProperties, useState } from 'react';
import { defaultArticleState } from 'src/constants/articleProps';
import clsx from 'clsx';
import styles from '../../styles/index.module.scss';
import '../../styles/index.scss';

export const App = () => {
	const [appState, setAppState] = useState(defaultArticleState);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appState.fontFamilyOption.value,
					'--font-size': appState.fontSizeOption.value,
					'--font-color': appState.fontColor.value,
					'--container-width': appState.contentWidth.value,
					'--bg-color': appState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm appState={appState} setAppState={setAppState} />
			<Article />
		</main>
	);
};
