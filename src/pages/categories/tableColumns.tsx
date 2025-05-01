import { ColumnDef } from "@tanstack/react-table";
import { Category } from "@/types/category";
import { formatDate } from "@/lib/utils/date";

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Name",
    // cell: ({ getValue }) => <span>{getValue<string>()}</span>,
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ getValue }) => <span>{formatDate(getValue<Date>())}</span>,
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ getValue }) => <span>{formatDate(getValue<Date>())}</span>,
  },
];
