'use client';

import './wheel.css';

import type { CSSProperties } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useWheelStore } from '@/stores/slices/wheel';

import wheelContent from './WheelContent';

const Wheel = () => {
  const { active, isShowing, type, x, y, show, position, select } =
    useWheelStore();

  const [index, setIndex] = useState<number | null>(null);
  // Wheel Radius:
  const inner = 35;
  const outer = 80;
  // Thickness of the wheel is (inner - outer)px

  const ref = useRef<HTMLDivElement>(null);
  const startXY = useRef({ clientX: 0, clientY: 0 });

  const getSelectedTitle = useCallback((): string | undefined => {
    if (index === null || !type || !ref.current) return;
    const arcs = ref.current.getElementsByClassName('arc');
    const selectedArc = arcs[index];
    return selectedArc?.getAttribute('title') || undefined;
  }, [index, type]);

  const getMenuIndex = useCallback(
    (event: MouseEvent): number | null => {
      const { clientX, clientY } = event;
      // Account for scroll position
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      const adjustedX = x - scrollX;
      const adjustedY = y - scrollY;

      const dx = clientX - adjustedX;
      const dy = clientY - adjustedY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      let idx: number | null = null;

      if (distance >= inner && distance <= outer) {
        const angle = Math.atan2(dy, dx);
        let deg: number;
        switch (type) {
          case 'four':
            deg = angle + 0.5 * Math.PI;
            while (deg < 0) deg += Math.PI * 2;
            idx = Math.floor((deg / Math.PI) * 2);
            break;
          case 'five':
            deg = angle + 0.725 * Math.PI;
            while (deg < 0) deg += Math.PI * 2;
            idx = Math.floor((deg / Math.PI) * 2.5);
            break;
          case 'confirm':
            deg = angle * (180 / Math.PI);
            deg = (deg + 360) % 360;
            if (deg >= 315 || deg <= 45) idx = 0;
            if (deg >= 135 && deg <= 225) idx = 1;
            break;
          default:
            throw new Error('Invalid Wheel Type');
        }
      }

      return idx;
    },
    [type, x, y],
  );

  /**
   * Check if the mouse was dragged or clicked right button.
   * @param event {@link MouseEvent}
   * @returns true if the mouse was dragged.
   */
  const isDragged = (event: MouseEvent): boolean => {
    const { clientX, clientY } = event;
    const dx = clientX - startXY.current.clientX;
    const dy = clientY - startXY.current.clientY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return event.button === 2 || distance > 5;
  };

  /**
   * Set `startXY`
   * @param event {@link MouseEvent}
   */
  const onMouseDown = (event: MouseEvent): void => {
    const { clientX, clientY } = event;
    startXY.current = { clientX, clientY };
  };

  const onMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!isShowing) return;
      const idx = getMenuIndex(event);
      setIndex(idx);
    },
    [isShowing, getMenuIndex],
  );

  const onMouseUp = useCallback(
    (event: MouseEvent) => {
      if (!active) return;
      if (!isShowing || isDragged(event)) return;
      if (type === 'confirm' && index === null) return;

      if (index !== null) {
        select(index);
      } else {
        select(null);
      }

      show(false);
      setIndex(null);
    },
    [active, isShowing, type, index, select, show],
  );

  const onClick = useCallback(
    (event: MouseEvent) => {
      if (isDragged(event)) return onMouseUp(event);
      if (isShowing) return onMouseUp(event);

      const { clientX, clientY } = event;
      // Add scroll position to stored coordinates
      const pageX = clientX + window.scrollX;
      const pageY = clientY + window.scrollY;

      position({ x: pageX, y: pageY });
      show(true);

      return onMouseUp(event);
    },
    [isShowing, position, show, onMouseUp],
  );

  useEffect(() => {
    if (active) {
      document.body.addEventListener('mousedown', onMouseDown);
      document.body.addEventListener('click', onClick);
      document.body.addEventListener('mousemove', onMouseMove);
    }

    return () => {
      document.body.removeEventListener('mousedown', onMouseDown);
      document.body.removeEventListener('click', onClick);
      document.body.removeEventListener('mousemove', onMouseMove);
    };
  }, [active, onMouseMove, onClick]);

  return (
    <div
      ref={ref}
      className={`wheel ${type} ${isShowing ? 'on' : ''}`}
      style={
        {
          '--x': `${x}px`,
          '--y': `${y}px`,
          pointerEvents: 'none',
        } as CSSProperties
      }
      data-chosen={index}
    >
      {wheelContent[type]}
      {index !== null && (
        <div className="wheel-center-title">{getSelectedTitle()}</div>
      )}
    </div>
  );
};

export default Wheel;
