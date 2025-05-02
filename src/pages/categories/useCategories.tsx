import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { categoriesService } from "@/services/categoriesService";
import { Category } from "@/types/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { VisibilityState } from "@tanstack/react-table";

import { categoryFormSchema } from "./CategoryForm";

export function useCategories() {
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
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
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
      title: "Trash it?",
      description: "Wanna trash it? You can dig it back later.",
    });
    setSelectedCategoryId(categoryId);
    setDeleteMode("soft");
    setOpenConfirmDialog(true);
  };

  const handleHardDelete = async (categoryId: string) => {
    setAlertMessage({
      title: "Flatline this?",
      description: "You're reaching the point of no return.",
    });
    setSelectedCategoryId(categoryId);
    setDeleteMode("hard");
    setOpenConfirmDialog(true);
  };

  const handleRestore = async (categoryId: string) => {
    setAlertMessage({
      title: "Revive it?",
      description: "Bring it back to life?",
    });
    setSelectedCategoryId(categoryId);
    setDeleteMode("restore");
    setOpenConfirmDialog(true);
  };

  const handleConfirmOperation = async () => {
    try {
      setIsDataLoading(true);

      let promise;

      switch (deleteMode) {
        case "soft":
          promise = categoriesService.softDelete(selectedCategoryId);
          break;
        case "hard":
          promise = categoriesService.hardDelete(selectedCategoryId);
          break;
        case "restore":
          promise = categoriesService.restore(selectedCategoryId);
          break;
      }

      await promise;

      toast.promise(promise, {
        loading: `${
          deleteMode === "restore"
            ? "Restoring"
            : deleteMode === "hard"
            ? "Deleting"
            : "Trashing"
        } category...`,
        success: `Category ${
          deleteMode === "restore"
            ? "restored"
            : deleteMode === "hard"
            ? "deleted"
            : "trashed"
        } successfully`,
        error: `Failed to ${
          deleteMode === "restore"
            ? "restore"
            : deleteMode === "hard"
            ? "delete"
            : "trash"
        } category`,
      });

      await fetchCategories(includeDeleted);
    } catch (error) {
      console.error("Operation failed:", error);
      toast.error("Operation failed");
    } finally {
      setOpenConfirmDialog(false);
      setIsDataLoading(false);
    }
  };

  async function onSubmit(values: z.infer<typeof categoryFormSchema>) {
    try {
      setIsDataLoading(true);

      const promise = isEditMode
        ? categoriesService.update(category.id, values)
        : categoriesService.create(values);

      await promise;

      toast.promise(promise, {
        loading: isEditMode ? "Updating category..." : "Creating category...",
        success: isEditMode
          ? "Category updated successfully"
          : "Category created successfully",
        error: isEditMode
          ? "Failed to update category"
          : "Failed to create category",
      });

      await fetchCategories(includeDeleted);
      setOpenSheet(false);
    } catch (error) {
      console.error("Failed to update category:", error);
    } finally {
      setIsDataLoading(false);
    }
  }

  const form = useForm<z.infer<typeof categoryFormSchema>>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: category.name,
      description: category.description,
    },
  });

  return {
    data,
    tableLoading,
    error,
    includeDeleted,
    setIncludeDeleted,
    isEditMode,
    deleteMode,
    openSheet,
    setOpenSheet,
    openConfirmDialog,
    setOpenConfirmDialog,
    isDataLoading,
    columnVisibility,
    setColumnVisibility,
    category,
    form,
    handleCreate,
    handleUpdate,
    handleSoftDelete,
    handleHardDelete,
    handleRestore,
    handleConfirmOperation,
    onSubmit,
    alertMessage,
    fetchCategories,
  };
}
