import { ArrowButton } from 'src/ui/arrow-button';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { useModal } from 'src/hooks/index';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

type Props = {
	appState: ArticleStateType;
	setAppState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = ({ appState, setAppState }: Props) => {
	const rootRef = useRef<HTMLElement>(null);
	const { isOpen, toggle } = useModal(false, rootRef);
	const [fontFamily, setFontFamily] = useState(appState.fontFamilyOption);
	const [fontSize, setFontSize] = useState(appState.fontSizeOption);
	const [fontColor, setFontColor] = useState(appState.fontColor);
	const [bgColor, setBgColor] = useState(appState.backgroundColor);
	const [contentWidth, setContentWidth] = useState(appState.contentWidth);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setAppState((prev) => ({
			...prev,
			fontFamilyOption: fontFamily,
			fontColor: fontColor,
			backgroundColor: bgColor,
			contentWidth: contentWidth,
			fontSizeOption: fontSize,
		}));
		toggle();
	};

	const handleReset = () => {
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontColor(defaultArticleState.fontColor);
		setBgColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		setFontSize(defaultArticleState.fontSizeOption);
		setAppState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggle} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}
				ref={rootRef}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={fontFamily}
						onChange={setFontFamily}
						title='шрифт'
					/>
					<RadioGroup
						name='fontsize'
						options={fontSizeOptions}
						selected={fontSize}
						onChange={setFontSize}
						title='размер шрифта'
					/>
					<Select
						options={fontColors}
						selected={fontColor}
						onChange={setFontColor}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={bgColor}
						onChange={setBgColor}
						title='цвет фона'
					/>
					<Select
						options={contentWidthArr}
						selected={contentWidth}
						onChange={setContentWidth}
						title='ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
