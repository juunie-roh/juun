import {
  ColumnDef,
  columnOrderingFeature,
  columnPinningFeature,
  ColumnPinningState,
  columnSizingFeature,
  columnVisibilityFeature,
  RowData,
  rowSelectionFeature,
  rowSortingFeature,
  SortingState,
  tableFeatures,
  useTable as useReactTable,
} from "@tanstack/react-table";
import React from "react";

/**
 * Feature set registered on every table created by {@link useTable}.
 *
 * TanStack Table v9 no longer bundles features automatically, so each one used
 * anywhere in the render path has to be opted into here:
 * - `columnPinningFeature` - `column.pin()` / `getIsPinned()`
 * - `columnOrderingFeature` - `getIsFirstColumn()` / `getIsLastColumn()`
 * - `columnSizingFeature` - `getSize()` / `getStart()` / `getAfter()`
 * - `columnVisibilityFeature` - `row.getVisibleCells()`
 * - `rowSelectionFeature` - `row.getIsSelected()`.
 *
 * Ordering and sizing exist for `getColumnPinningStyles`, which reads column
 * offsets and edge positions to build its sticky styles; visibility and
 * selection are used directly by `ViewTable`'s row rendering.
 */
export const features = tableFeatures({
  columnOrderingFeature,
  columnPinningFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  rowSelectionFeature,
  rowSortingFeature,
});

export type Features = typeof features;

interface TableOptions {
  enableColumnPinning?: boolean;
  enableSorting?: boolean;
  initialColumnPinning?: ColumnPinningState;
  initialSorting?: SortingState;
}

export function useTable<TData extends RowData>(
  columns: ColumnDef<Features, TData, any>[],
  data: TData[],
  options?: TableOptions,
) {
  const enableColumnPinning = options?.enableColumnPinning ?? true;
  const enableSorting = options?.enableSorting ?? true;

  const [sorting, setSorting] = React.useState<SortingState>(
    options?.initialSorting ?? [],
  );
  const [columnPinning, setColumnPinning] = React.useState<ColumnPinningState>(
    options?.initialColumnPinning ?? { start: [], end: [] },
  );

  const table = useReactTable({
    features,
    data,
    columns,
    enableSorting,
    enableColumnPinning,
    // only set handlers if features are enabled
    onColumnPinningChange: enableColumnPinning ? setColumnPinning : undefined,
    onSortingChange: enableSorting ? setSorting : undefined,
    state: {
      ...(enableColumnPinning && { columnPinning }),
      ...(enableSorting && { sorting }),
    },
  });

  return { table };
}
