import { columns } from "./tableColumns";
import { DataTable } from "@/components/data-table";
import { categoriesService } from "@/services/categoriesService";
import { useEffect, useState } from "react";
import { Category } from "@/types/category";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Categories() {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesService.getAll();
        console.log(response);
        setData(response.data);
      } catch (err) {
        setError("Failed to fetch categories");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
