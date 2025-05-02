import { ColumnDef } from "@tanstack/react-table";
import { Category } from "@/types/category";
import { formatDate } from "@/lib/utils/date";
import { SheetContent, SheetTitle } from "@/components/ui/sheet";
import { categoriesService } from "@/services/categoriesService";
import { TableDropdown } from "@/components/table-dropdown";
import { InfoUpdateSheet } from "@/components/info-update-sheet";
import { useState } from "react";
import z from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { Loader2 } from "lucide-react";

const categoryFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string(),
});

function CategoryForm({
  form,
  onSubmit,
  onCancel,
  isLoading = false,
}: {
  form: UseFormReturn<z.infer<typeof categoryFormSchema>>;
  onSubmit: (values: z.infer<typeof categoryFormSchema>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Category name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Category description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          {!isLoading ? (
            <>
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">Save changes</Button>
            </>
          ) : (
            <Button variant="outline" disabled>
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              Saving...
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}

export const columns: ColumnDef<Category>[] = [
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
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;
      const [openSheet, setOpenSheet] = useState(false);
      const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
      const [isLoading, setIsLoading] = useState(false);

      const form = useForm<z.infer<typeof categoryFormSchema>>({
        resolver: zodResolver(categoryFormSchema),
        defaultValues: {
          name: category.name,
          description: category.description,
        },
      });

      async function onSubmit(values: z.infer<typeof categoryFormSchema>) {
        try {
          setIsLoading(true);
          await categoriesService.update(category.id, values);

          setIsLoading(false);
          setOpenSheet(false);

          // Refresh logic
        } catch (error) {
          console.error("Failed to update category:", error);
          setIsLoading(false);
        }
      }

      return (
        <>
          <TableDropdown
            record={category}
            actions={{
              onUpdate: () => setOpenSheet(true),
              onSoftDelete: () => categoriesService.softDelete(category.id),
              onHardDelete: () => categoriesService.hardDelete(category.id),
              onRestore: category.deletedAt
                ? () => categoriesService.restore(category.id)
                : undefined,
            }}
          />
          <InfoUpdateSheet open={openSheet} onOpenChange={setOpenSheet}>
            <SheetTitle>Update category</SheetTitle>
            <CategoryForm
              form={form}
              onSubmit={onSubmit}
              onCancel={() => setOpenSheet(false)}
              isLoading={isLoading}
            />
          </InfoUpdateSheet>
        </>
      );
    },
  },
];
