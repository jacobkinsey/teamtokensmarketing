import * as React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type Transaction = {
  amount: number;
  companyname: string;
  datecreated: string;
  description: string;
  disputed: string;
  hours: number;
  money: number;
  period: string;
  rate: number;
  revoked: string;
  riskfactor: string;
  slug: string;
  transactionuid: string;
  type: string;
};

interface AppProps {
  data: Transaction[];
}

const columnHelper = createColumnHelper<Transaction>();

const columns = [
  columnHelper.accessor("period", {
    header: "Date",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("slug", {
    header: "Person",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("amount", {
    header: "Amount",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("type", {
    header: "Type",
    footer: (info) => info.column.id,
  }),
];

const CapTable: React.FC<AppProps> = ({ data }) => {
  const rerender = React.useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          border: "1px solid #ddd",
        }}
      >
        <thead style={{ background: "#f2f2f2" }}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{
                    padding: "8px",
                    border: "1px solid #ddd",
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{
                    padding: "8px",
                    border: "1px solid #ddd",
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ height: "20px" }} />
    </div>
  );
};

export default CapTable;
