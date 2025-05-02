import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { VisibilityState } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table";
import { InfoUpdateSheet } from "@/components/info-update-sheet";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SheetTitle } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Category } from "@/types/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { categoriesService } from "@/services/categoriesService";
import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { categoryFormSchema, CategoryForm } from "./CategoryForm";

import { columns } from "./tableColumns";

export default function Categories() {
  const [data, setData] = useState<Category[]>([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [includeDeleted, setIncludeDeleted] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState<"soft" | "hard" | "restore">(
    "soft"
  );
  const [openSheet, setOpenSheet] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    deletedAt: includeDeleted,
  });
  const [category, setCategory] = useState<Category>({
    id: "",
    name: "",
    slug: "",
    description: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  });
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [alertMessage, setAlertMessage] = useState({
    title: "",
    description: "",
  });

  const fetchCategories = async (includeDeleted = false) => {
    try {
      setTableLoading(true);
      const response = await categoriesService.getAll(includeDeleted);
      setData(response.data);
    } catch (err) {
      setError("Failed to fetch categories");
      console.error(err);
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories(includeDeleted);

    setColumnVisibility((prev) => ({
      ...prev,
      deletedAt: includeDeleted,
    }));
  }, [includeDeleted]);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  const form = useForm<z.infer<typeof categoryFormSchema>>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: category.name,
      description: category.description,
    },
  });

  useEffect(() => {
    if (category) {
      form.reset({
        name: category.name,
        description: category.description,
      });
    }
  }, [category, form]);

  const handleCreate = () => {
    setCategory({
      id: "",
      name: "",
      slug: "",
      description: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });
    setIsEditMode(false);
    setOpenSheet(true);
  };

  const handleUpdate = (category: Category) => {
    setCategory(category);
    setIsEditMode(true);
    setOpenSheet(true);
  };

  const handleSoftDelete = async (categoryId: string) => {
    setAlertMessage({
      title: "Are you sure?",
      description:
        "This item will be moved to trash. You can restore it later.",
    });
    setSelectedCategoryId(categoryId);
    setDeleteMode("soft");
    setOpenConfirmDialog(true);
  };

  const handleHardDelete = async (categoryId: string) => {
    setAlertMessage({
      title: "Are you sure?",
      description: "This item will be permanently deleted.",
    });
    setSelectedCategoryId(categoryId);
    setDeleteMode("hard");
    setOpenConfirmDialog(true);
  };

  const handleRestore = async (categoryId: string) => {
    setAlertMessage({
      title: "Are you sure?",
      description: "This item will be restored.",
    });
    setSelectedCategoryId(categoryId);
    setDeleteMode("restore");
    setOpenConfirmDialog(true);
  };

  const handleConfirmOperation = async () => {
    try {
      setIsDataLoading(true);
      switch (deleteMode) {
        case "soft":
          await categoriesService.softDelete(selectedCategoryId);
          break;
        case "hard":
          await categoriesService.hardDelete(selectedCategoryId);
          break;
        case "restore":
          await categoriesService.restore(selectedCategoryId);
          break;
        // default:
        //   await categoriesService.softDelete(categoryId);
        //   break;
      }
      await fetchCategories(includeDeleted);
    } catch (error) {
      // TODO: handle error on UI
      console.error("Operation failed:", error);
    } finally {
      setOpenConfirmDialog(false);
      setIsDataLoading(false);
    }
  };

  async function onSubmit(values: z.infer<typeof categoryFormSchema>) {
    try {
      setIsDataLoading(true);

      if (isEditMode) {
        await categoriesService.update(category.id, values);
      } else {
        await categoriesService.create(values);
      }

      await fetchCategories(includeDeleted);
      setOpenSheet(false);
    } catch (error) {
      console.error("Failed to update category:", error);
    } finally {
      setIsDataLoading(false);
    }
  }

  return (
    <div className="container mx-auto flex flex-col gap-4">
      <div className="flex flex-row-reverse gap-4">
        <Button id="create" onClick={handleCreate} disabled={tableLoading}>
          Create
        </Button>
        <div className="flex items-center space-x-2">
          <Switch
            id="include-deleted"
            disabled={tableLoading}
            onCheckedChange={(checked) => {
              if (checked) setIncludeDeleted(true);
              else setIncludeDeleted(false);
            }}
          />
          <Label htmlFor="include-deleted">Include deleted</Label>
        </div>
      </div>

      <DataTable
        columns={columns({
          onUpdate: handleUpdate,
          onSoftDelete: handleSoftDelete,
          onHardDelete: handleHardDelete,
          onRestore: handleRestore,
        })}
        data={data}
        loading={tableLoading}
        columnVisibility={columnVisibility}
        setColumnVisibility={setColumnVisibility}
      />

      <InfoUpdateSheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetTitle>
          {isEditMode ? "Update Category" : "Create Category"}
        </SheetTitle>
        <CategoryForm
          form={form}
          onSubmit={onSubmit}
          onCancel={() => setOpenSheet(false)}
          isLoading={isDataLoading}
        />
      </InfoUpdateSheet>

      <ConfirmationDialog
        open={openConfirmDialog}
        onOpenChange={setOpenConfirmDialog}
        title={alertMessage.title}
        description={alertMessage.description}
        onConfirm={handleConfirmOperation}
        isLoading={isDataLoading}
      ></ConfirmationDialog>
    </div>
  );
}
