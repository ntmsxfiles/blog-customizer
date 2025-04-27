import { useCallback, useEffect, useState } from 'react';

export const useModal = (
	initialState: boolean,
	ref: React.RefObject<HTMLElement>
) => {
	const [isOpen, setIsOpen] = useState(initialState);

	const handleKeyDown = useCallback((e: KeyboardEvent) => {
		e.key === 'Escape' && toggle();
	}, []);

	const handleMouseDown = useCallback((e: MouseEvent) => {
		!ref.current?.contains(e.target as HTMLElement) && toggle();
	}, []);

	const toggle = useCallback(() => {
		setIsOpen((prev) => !prev);
	}, []);

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('keydown', handleKeyDown);
			document.addEventListener('mousedown', handleMouseDown);
		} else {
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('mousedown', handleMouseDown);
		}
	}, [isOpen]);

	return {
		isOpen,
		toggle,
	};
};
