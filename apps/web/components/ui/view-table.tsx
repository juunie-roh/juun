import { ReactTable, RowData } from "@tanstack/react-table";
import { ComponentProps, ReactNode } from "react";

import type { Features } from "@/hooks/use-table";
import { cn, getColumnPinningStyles } from "@/lib/utils";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

export interface ViewTableProps<TData extends RowData> extends ComponentProps<
  typeof Table
> {
  table: ReactTable<Features, TData>;
  empty?: ReactNode;
}

/**
 * A simple table for viewing data.
 */
export default function ViewTable<TData extends RowData>({
  table,
  empty,
  className,
  ...props
}: ViewTableProps<TData>) {
  return (
    <Table className={className} {...props}>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className="group">
            {headerGroup.headers.map((header) => (
              <TableHead
                key={header.id}
                className={cn(
                  "relative z-0",
                  header.column.getIsPinned() &&
                    "sticky z-1 bg-background opacity-95 group-hover:bg-muted",
                )}
                style={getColumnPinningStyles(header.column)}
              >
                {header.isPlaceholder ? null : (
                  <table.FlexRender header={header} />
                )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              className="group"
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className={cn(
                    "relative z-0",
                    cell.column.getIsPinned() &&
                      "sticky z-1 bg-background opacity-95 group-hover:bg-muted",
                  )}
                  style={getColumnPinningStyles(cell.column)}
                >
                  <table.FlexRender cell={cell} />
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          // if there is no items, render empty state
          <TableRow>
            <TableCell
              colSpan={table.getAllColumns().length}
              className={cn("h-24 text-center", empty && "h-auto")}
            >
              {empty ?? "No results."}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
