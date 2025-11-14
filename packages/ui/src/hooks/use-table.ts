import {
  ColumnDef,
  ColumnPinningState,
  getCoreRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";

interface TableOptions {
  enableColumnPinning?: boolean;
  enableSorting?: boolean;
  initialColumnPinning?: ColumnPinningState;
  initialSorting?: SortingState;
}

export function useTable<TData>(
  columns: ColumnDef<TData, any>[],
  data: TData[],
  options?: TableOptions,
) {
  const enableColumnPinning = options?.enableColumnPinning ?? true;
  const enableSorting = options?.enableSorting ?? true;

  const [sorting, setSorting] = React.useState<SortingState>(
    options?.initialSorting ?? [],
  );
  const [columnPinning, setColumnPinning] = React.useState<ColumnPinningState>(
    options?.initialColumnPinning ?? { left: [], right: [] },
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
