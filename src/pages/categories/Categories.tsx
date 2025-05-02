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
  const { state, actions } = useCategories();
  const { table, form, delete: deleteState, error } = state;

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  useEffect(() => {
    actions.fetchCategories(state.includeDeleted);

    table.setColumnVisibility((prev) => ({
      ...prev,
      deletedAt: state.includeDeleted,
    }));
  }, [state.includeDeleted]);

  useEffect(() => {
    if (state.category) {
      form.form.reset({
        name: state.category.name,
        description: state.category.description,
      });
    }
  }, [state.category, form.form]);

  return (
    <div className="container mx-auto flex flex-col gap-4">
      <div className="flex flex-row-reverse gap-4">
        <Button
          id="create"
          onClick={actions.handleCreate}
          disabled={table.tableLoading}
        >
          Create
        </Button>
        <div className="flex items-center space-x-2">
          <Switch
            id="include-deleted"
            disabled={table.tableLoading}
            onCheckedChange={(checked) => {
              if (checked) actions.setIncludeDeleted(true);
              else actions.setIncludeDeleted(false);
            }}
          />
          <Label htmlFor="include-deleted">Include deleted</Label>
        </div>
      </div>

      <DataTable
        columns={columns({
          onUpdate: actions.handleUpdate,
          onSoftDelete: actions.handleSoftDelete,
          onHardDelete: actions.handleHardDelete,
          onRestore: actions.handleRestore,
        })}
        data={table.data}
        loading={table.tableLoading}
        columnVisibility={table.columnVisibility}
        setColumnVisibility={table.setColumnVisibility}
      />

      <InfoUpdateSheet open={form.openSheet} onOpenChange={form.setOpenSheet}>
        <SheetTitle>
          {form.isEditMode ? "Update Category" : "Create Category"}
        </SheetTitle>
        <CategoryForm
          form={form.form}
          onSubmit={actions.onSubmit}
          onCancel={() => form.setOpenSheet(false)}
          isLoading={form.isDataLoading}
        />
      </InfoUpdateSheet>

      <ConfirmationDialog
        open={deleteState.openConfirmDialog}
        onOpenChange={deleteState.setOpenConfirmDialog}
        title={deleteState.alertMessage.title}
        description={deleteState.alertMessage.description}
        onConfirm={actions.handleConfirmDelOperation}
        isLoading={form.isDataLoading}
      ></ConfirmationDialog>
    </div>
  );
}
