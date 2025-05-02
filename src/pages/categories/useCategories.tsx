import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { categoriesService } from "@/services/categoriesService";
import { Category } from "@/types/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { VisibilityState } from "@tanstack/react-table";

import { categoryFormSchema } from "./CategoryForm";

export function useTableState(includeDeleted = false) {
  const [data, setData] = useState<Category[]>([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    deletedAt: includeDeleted,
  });

  return {
    data,
    setData,
    tableLoading,
    setTableLoading,
    columnVisibility,
    setColumnVisibility,
  };
}

export function useFormState(category: Category) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [openSheet, setOpenSheet] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);

  const form = useForm<z.infer<typeof categoryFormSchema>>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: category.name,
      description: category.description,
    },
  });

  return {
    isEditMode,
    setIsEditMode,
    openSheet,
    setOpenSheet,
    isDataLoading,
    setIsDataLoading,
    form,
  };
}

export function useDeleteState() {
  const [deleteMode, setDeleteMode] = useState<"soft" | "hard" | "restore">(
    "soft"
  );
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState({
    title: "",
    description: "",
  });

  return {
    deleteMode,
    setDeleteMode,
    openConfirmDialog,
    setOpenConfirmDialog,
    selectedCategoryId,
    setSelectedCategoryId,
    alertMessage,
    setAlertMessage,
  };
}

export function useCategories() {
  const [error, setError] = useState<string | null>(null);
  const [includeDeleted, setIncludeDeleted] = useState(false);
  const [category, setCategory] = useState<Category>({
    id: "",
    name: "",
    slug: "",
    description: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  });

  const tableState = useTableState(includeDeleted);
  const formState = useFormState(category);
  const deleteState = useDeleteState();

  const fetchCategories = async (includeDeleted = false) => {
    try {
      tableState.setTableLoading(true);
      const response = await categoriesService.getAll(includeDeleted);
      tableState.setData(response.data);
    } catch (err) {
      setError("Failed to fetch categories");
      console.error(err);
    } finally {
      tableState.setTableLoading(false);
    }
  };

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
    formState.setIsEditMode(false);
    formState.setOpenSheet(true);
  };

  const handleUpdate = (category: Category) => {
    setCategory(category);
    formState.setIsEditMode(true);
    formState.setOpenSheet(true);
  };

  const handleSoftDelete = async (categoryId: string) => {
    deleteState.setAlertMessage({
      title: "Trash it?",
      description: "Wanna trash it? You can dig it back later.",
    });
    deleteState.setSelectedCategoryId(categoryId);
    deleteState.setDeleteMode("soft");
    deleteState.setOpenConfirmDialog(true);
  };

  const handleHardDelete = async (categoryId: string) => {
    deleteState.setAlertMessage({
      title: "Flatline this?",
      description: "You're reaching the point of no return.",
    });
    deleteState.setSelectedCategoryId(categoryId);
    deleteState.setDeleteMode("hard");
    deleteState.setOpenConfirmDialog(true);
  };

  const handleRestore = async (categoryId: string) => {
    deleteState.setAlertMessage({
      title: "Revive it?",
      description: "Bring it back to life?",
    });
    deleteState.setSelectedCategoryId(categoryId);
    deleteState.setDeleteMode("restore");
    deleteState.setOpenConfirmDialog(true);
  };

  const handleConfirmDelOperation = async () => {
    try {
      formState.setIsDataLoading(true);

      let promise;

      switch (deleteState.deleteMode) {
        case "soft":
          promise = categoriesService.softDelete(
            deleteState.selectedCategoryId
          );
          break;
        case "hard":
          promise = categoriesService.hardDelete(
            deleteState.selectedCategoryId
          );
          break;
        case "restore":
          promise = categoriesService.restore(deleteState.selectedCategoryId);
          break;
      }

      await promise;

      toast.promise(promise, {
        loading: `${
          deleteState.deleteMode === "restore"
            ? "Restoring"
            : deleteState.deleteMode === "hard"
            ? "Deleting"
            : "Trashing"
        } category...`,
        success: `Category ${
          deleteState.deleteMode === "restore"
            ? "restored"
            : deleteState.deleteMode === "hard"
            ? "deleted"
            : "trashed"
        } successfully`,
        error: `Failed to ${
          deleteState.deleteMode === "restore"
            ? "restore"
            : deleteState.deleteMode === "hard"
            ? "delete"
            : "trash"
        } category`,
      });

      await fetchCategories(includeDeleted);
    } catch (error) {
      console.error("Operation failed:", error);
      toast.error("Operation failed");
    } finally {
      deleteState.setOpenConfirmDialog(false);
      formState.setIsDataLoading(false);
    }
  };

  async function onSubmit(values: z.infer<typeof categoryFormSchema>) {
    try {
      formState.setIsDataLoading(true);

      const promise = formState.isEditMode
        ? categoriesService.update(category.id, values)
        : categoriesService.create(values);

      await promise;

      toast.promise(promise, {
        loading: formState.isEditMode
          ? "Updating category..."
          : "Creating category...",
        success: formState.isEditMode
          ? "Category updated successfully"
          : "Category created successfully",
        error: formState.isEditMode
          ? "Failed to update category"
          : "Failed to create category",
      });

      await fetchCategories(includeDeleted);
      formState.setOpenSheet(false);
    } catch (error) {
      console.error("Failed to update category:", error);
    } finally {
      formState.setIsDataLoading(false);
    }
  }

  return {
    ...tableState,
    ...formState,
    ...deleteState,
    error,
    includeDeleted,
    setIncludeDeleted,
    category,
    setCategory,
    handleCreate,
    handleUpdate,
    handleSoftDelete,
    handleHardDelete,
    handleRestore,
    handleConfirmOperation: handleConfirmDelOperation,
    onSubmit,
    fetchCategories,
  };
}
