import clsx from 'clsx';
import Link from 'next/link';

import type { MenuItem, MenuProps } from '@/types/ui.types';

const Menu = (props: MenuProps) => {
  const {
    'menu-items': menuItems,
    size = 'md',
    direction = 'vertical',
    className,
  } = props;

  const renderItems = (items: MenuItem[]) => {
    return items.map((item) => {
      // If it's a menu title
      if (item.title) {
        return (
          <li key={item.key}>
            <h2 className="menu-title">{item.value}</h2>
            {item.children && <ul>{renderItems(item.children)}</ul>}
          </li>
        );
      }

      // If it's a dropdown item
      if (item.dropdown && item.children) {
        return (
          <li key={item.key} className={clsx({ disabled: item.disabled })}>
            <details open>
              <summary>{item.value}</summary>
              <ul>{renderItems(item.children)}</ul>
            </details>
          </li>
        );
      }

      // If it's a parent item with children (but not dropdown)
      if (item.children) {
        return (
          <li key={item.key} className={clsx({ disabled: item.disabled })}>
            <span>{item.value}</span>
            <ul>{renderItems(item.children)}</ul>
          </li>
        );
      }

      // If it's a regular menu item
      return (
        <li key={item.key} className={clsx({ disabled: item.disabled })}>
          <Link href={item.href} className={clsx({ active: item.active })}>
            {item.value}
          </Link>
        </li>
      );
    });
  };

  return (
    <ul
      className={clsx(
        'menu',
        {
          'menu-xs': size === 'xs',
          'menu-sm': size === 'sm',
          'menu-md': size === 'md',
          'menu-lg': size === 'lg',
        },
        {
          'menu-vertical': direction === 'vertical',
          'menu-horizontal': direction === 'horizontal',
        },
        className,
      )}
    >
      {menuItems && renderItems(menuItems)}
    </ul>
  );
};

export default Menu;
