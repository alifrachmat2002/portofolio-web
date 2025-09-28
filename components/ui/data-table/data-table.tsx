"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DataTablePagination } from "./pagination"
import { useState } from "react"
import { Input } from "@/components/input"
import { DataTableViewOptions } from "./data-table-view-options"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFiters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<any>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFiters,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      columnVisibility
    }

  });

  return (
      <div className="space-y-2">
          <div className="flex items-center py-4">
              <Input
                  placeholder="Search..."
                  value={table.getState().globalFilter}
                  onChange={(event) =>
                      table.setGlobalFilter(event.target.value)
                  }
                  className="max-w-sm"
              />

              <DataTableViewOptions table={table}/>
          </div>
          <div className="overflow-hidden rounded-md border">
              <Table>
                  <TableHeader>
                      {table.getHeaderGroups().map((headerGroup) => (
                          <TableRow key={headerGroup.id}>
                              {headerGroup.headers.map((header) => {
                                  return (
                                      <TableHead key={header.id}>
                                          {header.isPlaceholder
                                              ? null
                                              : flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )}
                                      </TableHead>
                                  );
                              })}
                          </TableRow>
                      ))}
                  </TableHeader>
                  <TableBody>
                      {table.getRowModel().rows?.length ? (
                          table.getRowModel().rows.map((row) => (
                              <TableRow
                                  key={row.id}
                                  data-state={row.getIsSelected() && "selected"}
                              >
                                  {row.getVisibleCells().map((cell) => (
                                      <TableCell key={cell.id}>
                                          {flexRender(
                                              cell.column.columnDef.cell,
                                              cell.getContext()
                                          )}
                                      </TableCell>
                                  ))}
                              </TableRow>
                          ))
                      ) : (
                          <TableRow>
                              <TableCell
                                  colSpan={columns.length}
                                  className="h-24 text-center"
                              >
                                  No results.
                              </TableCell>
                          </TableRow>
                      )}
                  </TableBody>
              </Table>
          </div>
          <DataTablePagination table={table} />
      </div>
  );
}