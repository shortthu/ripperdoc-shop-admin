import { Loader2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import z from "zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UI_LABELS } from "@/lib/routes";
import pluralize from "pluralize";
import { imageService } from "@/services/imageService";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const productFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string(),
  imageUrl: z.string().url("Invalid URL"),
  price: z.number().min(0, "Price must be a positive number"),
  isFeatured: z.boolean(),
  categoryId: z.string().uuid("Invalid category ID"),
  brandId: z.string().uuid("Invalid brand ID").nullable(),
});

export function ProductForm({
  form,
  onSubmit,
  onCancel,
  isLoading = false,
}: {
  form: UseFormReturn<z.infer<typeof productFormSchema>>;
  onSubmit: (values: z.infer<typeof productFormSchema>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}) {
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const response = await imageService.upload(formData);
      form.setValue("imageUrl", response.data.imageUrl, {
        shouldValidate: true,
      });
    } catch (err) {
      // Optionally handle error
    } finally {
      setUploading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder={`${pluralize.singular(UI_LABELS.products)} name`}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={`${pluralize.singular(
                    UI_LABELS.products
                  )} description`}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Image Upload */}
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <Input
                    type="text"
                    placeholder="Image URL"
                    {...field}
                    readOnly
                  />
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading || isLoading}
                  />
                </div>
              </FormControl>
              {field.value && (
                <img src={field.value} alt="Product" className="mt-2 h-24" />
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Price */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  step="0.01"
                  placeholder="Price"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Is Featured */}
        <FormField
          control={form.control}
          name="isFeatured"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormLabel>Featured</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Category ID */}
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="Category ID" {...field} />
                {/* Replace with Select if you have categories list */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Brand ID */}
        <FormField
          control={form.control}
          name="brandId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand</FormLabel>
              <FormControl>
                <Input placeholder="Brand ID (optional)" {...field} />
                {/* Replace with Select if you have brands list */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          {!isLoading && !uploading ? (
            <>
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">Save changes</Button>
            </>
          ) : (
            <Button variant="outline" disabled>
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              {uploading ? "Uploading image..." : "Saving..."}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
