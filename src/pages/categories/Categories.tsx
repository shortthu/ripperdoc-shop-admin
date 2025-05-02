import { useEffect } from "react";

import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { DataTable } from "@/components/data-table";
import { InfoUpdateSheet } from "@/components/info-update-sheet";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SheetTitle } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";

import { CategoryForm } from "./CategoryForm";
import { columns } from "./tableColumns";
import { useCategories } from "./useCategories";

export default function Categories() {
  const {
    data,
    tableLoading,
    error,
    includeDeleted,
    setIncludeDeleted,
    openSheet,
    setOpenSheet,
    openConfirmDialog,
    setOpenConfirmDialog,
    isDataLoading,
    columnVisibility,
    setColumnVisibility,
    isEditMode,
    form,
    handleCreate,
    handleUpdate,
    handleSoftDelete,
    handleHardDelete,
    handleRestore,
    handleConfirmOperation,
    onSubmit,
    fetchCategories,
    category,
    alertMessage,
  } = useCategories();

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  useEffect(() => {
    fetchCategories(includeDeleted);

    setColumnVisibility((prev) => ({
      ...prev,
      deletedAt: includeDeleted,
    }));
  }, [includeDeleted]);

  useEffect(() => {
    if (category) {
      form.reset({
        name: category.name,
        description: category.description,
      });
    }
  }, [category, form]);

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
