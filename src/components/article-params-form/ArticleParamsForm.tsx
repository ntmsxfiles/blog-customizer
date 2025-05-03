import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import styles from './ArticleParamsForm.module.scss';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	type ArticleStateType,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	onSettingsChange: (formState: ArticleStateType) => void;
	title?: string;
};

export const ArticleParamsForm = ({
	onSettingsChange,
	title = 'Задайте параметры',
}: ArticleParamsFormProps) => {
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const [isOpen, setIsOpen] = useState(false);
	const placeholderRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (e: Event) => {
			if (!placeholderRef.current || !(e.target instanceof HTMLElement)) return;
			if (!placeholderRef.current.contains(e.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('click', handleClickOutside, { capture: true });
		return () => document.removeEventListener('click', handleClickOutside);
	}, [isOpen]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSettingsChange(formState);
		setIsOpen(false);
	};

	const handleClear = () => {
		setFormState(defaultArticleState);
		onSettingsChange(defaultArticleState);
	};

	return (
		<div ref={placeholderRef}>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />

			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h2' size={31} weight={800} uppercase>
						{title}
					</Text>

					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(value) =>
							setFormState({ ...formState, fontFamilyOption: value })
						}
					/>

					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(value) =>
							setFormState({ ...formState, fontSizeOption: value })
						}
					/>

					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={(value) =>
							setFormState({ ...formState, fontColor: value })
						}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(value) =>
							setFormState({ ...formState, backgroundColor: value })
						}
					/>

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(value) =>
							setFormState({ ...formState, contentWidth: value })
						}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleClear}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
