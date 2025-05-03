import pluralize from "pluralize";
import { useEffect } from "react";

import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { DataTable } from "@/components/data-table";
import { InfoUpdateSheet } from "@/components/info-update-sheet";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SheetTitle } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { UI_LABELS } from "@/lib/routes";

import { BrandForm } from "./BrandForm";
import { columns } from "./brandsTableColumns";
import { useBrands } from "./useBrands";

import { DataTablePagination } from "@/components/data-table-pagination";

export default function Brands() {
  const { state, actions } = useBrands();
  const { table, form, delete: deleteState, error } = state;

  useEffect(() => {
    actions.fetchBrands(state.includeDeleted);

    table.setColumnVisibility((prev) => ({
      ...prev,
      deletedAt: state.includeDeleted,
    }));
  }, [state.includeDeleted]);

  useEffect(() => {
    if (state.brand) {
      form.form.reset({
        name: state.brand.name,
        description: state.brand.description,
      });
    }
  }, [state.brand, form.form]);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

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
          {form.isEditMode
            ? `Update ${pluralize.singular(UI_LABELS.brands)}`
            : `Create ${pluralize.singular(UI_LABELS.brands)}`}
        </SheetTitle>
        <BrandForm
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
