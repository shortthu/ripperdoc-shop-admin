import { ColumnDef } from "@tanstack/react-table";
import { Category } from "@/types/category";
import { formatDate } from "@/lib/utils/date";
import { TableDropdown } from "@/components/table-dropdown";

interface ColumnActions {
  onUpdate: (category: Category) => void;
  onSoftDelete: (categoryId: string) => void;
  onHardDelete: (categoryId: string) => void;
  onRestore: (categoryId: string) => void;
}

export const columns = ({
  onUpdate,
  onSoftDelete,
  onHardDelete,
  onRestore,
}: ColumnActions): ColumnDef<Category>[] => [
  {
    accessorKey: "name",
    header: "Name",
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
  {
    id: "deletedAt",
    accessorKey: "deletedAt",
    header: "Deleted At",
    cell: ({ getValue }) => {
      const value = getValue<Date | null>();
      return value ? <span>{formatDate(value)}</span> : null;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;
      return (
        <>
          <TableDropdown
            record={category}
            actions={{
              onUpdate: () => onUpdate(category),
              onSoftDelete: () => onSoftDelete(category.id),
              onHardDelete: () => onHardDelete(category.id),
              onRestore: category.deletedAt
                ? () => onRestore(category.id)
                : undefined,
            }}
          />
        </>
      );
    },
  },
];
