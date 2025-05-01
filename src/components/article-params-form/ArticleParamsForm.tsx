import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useEffect, useRef, useState } from 'react';
import styles from './ArticleParamsForm.module.scss';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import clsx from 'clsx';
import {
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
} from 'src/constants/articleProps';

const defaultParams = {
    fontFamilyOption: defaultArticleState.fontFamilyOption,
    fontSizeOption: defaultArticleState.fontSizeOption,
    fontColor: defaultArticleState.fontColor,
    backgroundColor: defaultArticleState.backgroundColor,
    contentWidth: defaultArticleState.contentWidth,
  };

  export const ArticleParamsForm = ({
    onSettingsChange,
  }: {
    onSettingsChange: (formState: typeof defaultParams) => void;
  }) => {
    const [uiSettings, setUiSettings] = useState({ ...defaultParams, isOpen: false });
    const placeholderRef = useRef<HTMLDivElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSettingsChange({
        fontFamilyOption: uiSettings.fontFamilyOption,
        fontSizeOption: uiSettings.fontSizeOption,
        fontColor: uiSettings.fontColor,
        backgroundColor: uiSettings.backgroundColor,
        contentWidth: uiSettings.contentWidth,
      });
      setUiSettings((prev) => ({ ...prev, isOpen: false }));
    };

    const handleClear = () => {
      setUiSettings((prev) => ({
        ...defaultParams,
        isOpen: prev.isOpen,
      }));
      onSettingsChange(defaultArticleState);
    };

  const handleClickOutside = (e: Event) => {
    if (!placeholderRef.current || !(e.target instanceof HTMLElement)) return;
    if (!placeholderRef.current.contains(e.target)) {
      setUiSettings((prev) => ({ ...prev, isOpen: false }));
    }
  };

  const setupOutsideClickListener = () => {
    if (!uiSettings.isOpen) return;

    document.addEventListener('click', handleClickOutside, { capture: true });
    return () => document.removeEventListener('click', handleClickOutside);
  };

  useEffect(setupOutsideClickListener, [uiSettings.isOpen]);

  return (
    <div ref={placeholderRef}>
      <ArrowButton
        isOpen={uiSettings.isOpen}
        onClick={() =>
          setUiSettings((prev) => ({ ...prev, isOpen: !prev.isOpen }))
        }
      />

      <aside
        className={clsx(styles.container, {
          [styles.container_open]: uiSettings.isOpen,
        })}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.bottomContainer}>
            <Button
              title="Сбросить"
              htmlType="reset"
              type="clear"
              onClick={handleClear}
            />
            <Button
              title="Применить"
              htmlType="submit"
              type="apply"
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <Text size={22} weight={800} uppercase>
              Задайте параметры
            </Text>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <Select
              title="Шрифт"
              options={fontFamilyOptions}
              selected={uiSettings.fontFamilyOption}
              onChange={(value) => setUiSettings({ ...uiSettings, fontFamilyOption: value })}
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <RadioGroup
              title="Размер шрифта"
              name="fontSize"
              options={fontSizeOptions}
              selected={uiSettings.fontSizeOption}
              onChange={(value) => setUiSettings({ ...uiSettings, fontSizeOption: value })}
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <Select
              title="Цвет шрифта"
              options={fontColors}
              selected={uiSettings.fontColor}
              onChange={(value) => setUiSettings({ ...uiSettings, fontColor: value })}
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <Separator />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <Select
              title="Цвет фона"
              options={backgroundColors}
              selected={uiSettings.backgroundColor}
              onChange={(value) => setUiSettings({ ...uiSettings, backgroundColor: value })}
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <Select
              title="Ширина контента"
              options={contentWidthArr}
              selected={uiSettings.contentWidth}
              onChange={(value) => setUiSettings({ ...uiSettings, contentWidth: value })}
            />
          </div>
        </form>
      </aside>
    </div>
  );
};

