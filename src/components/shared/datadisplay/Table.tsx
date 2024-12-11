import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';

import type { TableProps } from '@/types/ui.types';
import { compareBy } from '@/utils/compare';

function Table<T extends { rowKey: React.Key }>({
  data,
  columns,
  isLoading = false,
  className,
  pagination = 'client',
  pageSize = 10,
  totalPages,
  onPageChange,
  onSort,
  selectable,
  selectedRows = [],
  onRowSelect,
  onSelectAll,
  zebra,
  'pin-rows': pinRows,
  'pin-cols': pinCols,
  size,
}: TableProps<T>) {
  const tableClasses = clsx([
    'table',
    { 'table-zebra': zebra },
    { 'table-pin-rows': pinRows },
    { 'table-pin-cols': pinCols },
    {
      'table-xs': size === 'xs',
      'table-sm': size === 'sm',
      'table-md': size === 'md',
      'table-lg': size === 'lg',
    },
    'w-full',
    className,
  ]);
  // Renders the sort Icon
  const renderSortIcon = (column: keyof T): React.ReactNode | null => {
    if (sortBy !== column) return null;
    return sortOrder === 'asc' ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M6 15l6 -6l6 6" />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M6 9l6 6l6 -6" />
      </svg>
    );
  };

  // handle hover
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  // handle pages
  const [currentPage, setCurrentPage] = useState<number>(1);
  const renderTotalPages: number = useMemo(() => {
    if (totalPages) return totalPages;
    return Math.ceil(data.length / pageSize);
  }, [totalPages, data, pageSize]);
  useEffect(() => onPageChange?.(), [currentPage, onPageChange]);

  // handle sort
  const [sortBy, setSortBy] = useState<keyof T>();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (column: keyof T): void => {
    setSortBy(column);
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const sortedData: T[] = useMemo(() => {
    if (!sortBy) return data;

    if (pagination === 'server') {
      if (!onSort)
        throw new Error('Table > Sorted Data Error: `onSort` is undefined');
      return onSort(sortBy, sortOrder);
    } else {
      const sorted = [...data].sort(compareBy<T>(sortBy));
      return sortOrder === 'asc' ? sorted : sorted.reverse();
    }
  }, [sortBy, pagination, data, onSort, sortOrder]);

  const pagedData: T[] = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [currentPage, sortedData, pageSize]);

  const renderData: T[] = useMemo(() => {
    if (pagination === 'client') return pagedData;
    return sortedData;
  }, [sortedData, pagedData, pagination]);

  if (isLoading) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="overflow-x-auto" tabIndex={0}>
        <table className={tableClasses}>
          <thead>
            <tr>
              {selectable && (
                <th
                  className="w-12"
                  scope="colgroup"
                  id="select-column"
                  aria-label="Select row"
                >
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm"
                    checked={selectedRows.length === renderData.length}
                    onChange={() => onSelectAll?.(renderData)}
                    aria-label="select all table rows"
                  />
                </th>
              )}
              {columns.map((column, index) =>
                column.pin ? (
                  <th
                    key={index}
                    className={`cursor-pointer hover:bg-base-200`}
                    onClick={() => handleSort(column.accessorKey)}
                    scope="col"
                    id={`col-${column.accessorKey as string}`}
                  >
                    <div className="flex items-center gap-2">
                      {column.header}
                      {renderSortIcon(column.accessorKey)}
                    </div>
                  </th>
                ) : (
                  <td
                    key={index}
                    className={`cursor-pointer hover:bg-base-200`}
                    onClick={() => handleSort(column.accessorKey)}
                    scope="col"
                  >
                    <div className="flex items-center gap-2">
                      {column.header}
                      {renderSortIcon(column.accessorKey)}
                    </div>
                  </td>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {renderData.map((row, rowIndex) => (
              <tr
                key={row.rowKey}
                className={`hover:bg-base-200 ${
                  hoveredRow === rowIndex ? 'bg-base-200' : ''
                }`}
                onMouseEnter={() => setHoveredRow(rowIndex)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                {selectable && (
                  <th
                    scope="row"
                    headers="select-column"
                    className={`${
                      hoveredRow === rowIndex ? 'bg-base-200' : ''
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm"
                      checked={selectedRows.some(
                        (selected) => selected.rowKey === row.rowKey,
                      )}
                      onChange={() => onRowSelect?.(row)}
                      aria-label="select a row"
                    />
                  </th>
                )}
                {columns.map((column, colIndex) =>
                  column.pin ? (
                    <th
                      key={colIndex}
                      className={`${column.className} ${
                        hoveredRow === rowIndex ? 'bg-base-200' : ''
                      }`}
                      headers={`col-${column.accessorKey as string}`}
                    >
                      {column.render
                        ? column.render(row[column.accessorKey])
                        : row[column.accessorKey]?.toString()}
                    </th>
                  ) : (
                    <td
                      key={colIndex}
                      className={`${column.className} ${
                        hoveredRow === rowIndex ? 'bg-base-200' : ''
                      }`}
                      headers={`col-${column.accessorKey as string}`}
                    >
                      {column.render
                        ? column.render(row[column.accessorKey])
                        : row[column.accessorKey]?.toString()}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination && renderTotalPages > 1 && (
        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            className="btn btn-sm"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Next Page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M15 6l-6 6l6 6" />
            </svg>
          </button>
          <span className="text-sm">
            Page {currentPage} of {renderTotalPages}
          </span>
          <button
            className="btn btn-sm"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === renderTotalPages}
            aria-label="Previous Page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 6l6 6l-6 6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default Table;
