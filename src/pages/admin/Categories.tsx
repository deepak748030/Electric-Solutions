import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { Plus, Pencil, Trash, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Type definitions
interface Category {
  _id: string;
  title: string;
  image: string | null;
  servicesCount: string;
}

interface ApiResponse {
  success: boolean;
  categories: Category[];
}

// API URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/categories';


// Create Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API functions
const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get<ApiResponse>('/categories');
    return response.data.categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

const createCategory = async (formData: FormData): Promise<Category | null> => {
  try {
    const response = await api.post<{ success: boolean; category: Category }>('/categories', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.category;
  } catch (error) {
    console.error('Error creating category:', error);
    return null;
  }
};

const updateCategory = async (id: string, formData: FormData): Promise<Category | null> => {
  try {
    const response = await api.patch<{ success: boolean; category: Category }>(`/categories/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.category;
  } catch (error) {
    console.error('Error updating category:', error);
    return null;
  }
};

const deleteCategory = async (id: string): Promise<boolean> => {
  try {
    const response = await api.delete<{ success: boolean }>(`/categories/${id}`);
    return response.data.success;
  } catch (error) {
    console.error('Error deleting category:', error);
    return false;
  }
};

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState('');
  const [newServicesCount, setNewServicesCount] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to load categories:', error);
        toast({
          title: "Error",
          description: "Failed to load categories. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, [toast]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleAddCategory = async () => {
    if (newTitle.trim() === '') return;

    const formData = new FormData();
    formData.append('title', newTitle);
    formData.append('servicesCount', newServicesCount);

    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    try {
      const newCategory = await createCategory(formData);
      if (newCategory) {
        setCategories([...categories, newCategory]);
        toast({
          title: "Success",
          description: "Category added successfully",
        });
      }
    } catch (error) {
      console.error('Error adding category:', error);
      toast({
        title: "Error",
        description: "Failed to add category. Please try again.",
        variant: "destructive",
      });
    }

    setNewTitle('');
    setNewServicesCount('');
    setSelectedImage(null);
    setPreviewURL('');
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setPreviewURL(category.image || '');
  };

  const handleUpdateCategory = async () => {
    if (!editingCategory) return;

    const formData = new FormData();
    formData.append('title', editingCategory.title);
    formData.append('servicesCount', editingCategory.servicesCount || '1+ Services');

    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    try {
      const updatedCategory = await updateCategory(editingCategory._id, formData);
      if (updatedCategory) {
        setCategories(categories.map(cat =>
          cat._id === editingCategory._id ? updatedCategory : cat
        ));
        toast({
          title: "Success",
          description: "Category updated successfully",
        });
      }
    } catch (error) {
      console.error('Error updating category:', error);
      toast({
        title: "Error",
        description: "Failed to update category. Please try again.",
        variant: "destructive",
      });
    }

    setEditingCategory(null);
    setSelectedImage(null);
    setPreviewURL('');
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      const success = await deleteCategory(id);
      if (success) {
        setCategories(categories.filter(category => category._id !== id));
        toast({
          title: "Success",
          description: "Category deleted successfully",
        });
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      toast({
        title: "Error",
        description: "Failed to delete category. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-8 lg:p-10 max-w-7xl mx-auto">
      <div className="space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <div className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-2 animate-slide-up">
              Service Management
            </div>
            <h1 className="text-3xl font-medium tracking-tight">Categories</h1>
            <p className="text-muted-foreground">Manage your service categories and offerings</p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="group relative overflow-hidden bg-primary hover:bg-primary/90 transition-all duration-300 px-5 py-2.5 rounded-lg shadow-sm">
                <div className="relative z-10 flex items-center gap-2">
                  <Plus className="h-4 w-4 transition-transform duration-300 ease-out group-hover:rotate-90" />
                  <span>Add Category</span>
                </div>
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-xl animate-scale-in backdrop-blur-sm border border-border/50 shadow-xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-medium">Add New Category</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Create a new service category for your customers.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-6 py-4">
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-sm font-medium">Title</label>
                  <Input
                    id="name"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Category title"
                    className="rounded-lg border-input/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all duration-200"
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="servicesCount" className="text-sm font-medium">Services Count</label>
                  <Input
                    id="servicesCount"
                    value={newServicesCount}
                    onChange={(e) => setNewServicesCount(e.target.value)}
                    placeholder="e.g. 1+ Services"
                    className="rounded-lg border-input/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all duration-200"
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="image" className="text-sm font-medium">Image</label>
                  <div className="grid gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full rounded-lg border-dashed border-2 hover:border-primary/50 transition-all duration-200 group"
                      onClick={() => document.getElementById('add-image')?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                      <span className="transition-colors duration-200">Upload Image</span>
                    </Button>
                    <input
                      type="file"
                      id="add-image"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>

                  {previewURL && (
                    <div className="mt-2 relative rounded-lg overflow-hidden border border-border/50">
                      <img
                        src={previewURL}
                        alt="Preview"
                        className="w-full h-48 object-cover transition-all duration-500"
                      />
                    </div>
                  )}
                </div>
              </div>

              <DialogFooter className="sm:justify-end gap-2">
                <DialogClose asChild>
                  <Button variant="outline" className="rounded-lg transition-all duration-200">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    onClick={handleAddCategory}
                    disabled={!newTitle.trim()}
                    className="rounded-lg transition-all duration-200"
                  >
                    Add Category
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden animate-pulse border border-border/50 rounded-xl">
                <div className="h-48 bg-muted"></div>
                <CardHeader>
                  <div className="h-6 w-2/3 bg-muted rounded"></div>
                  <div className="h-4 w-1/2 bg-muted rounded mt-2"></div>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <div className="h-8 w-20 bg-muted rounded"></div>
                  <div className="h-8 w-20 bg-muted rounded"></div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Card
                key={category._id}
                className="overflow-hidden card card-hover border border-border/50 rounded-xl backdrop-blur-sm shadow-sm"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover card-image"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full w-full image-placeholder">
                      <span className="text-muted-foreground">{category.title[0]}</span>
                    </div>
                  )}
                  <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                    {category.servicesCount}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-medium">{category.title}</CardTitle>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-lg group transition-all duration-200"
                        onClick={() => handleEditCategory(category)}
                      >
                        <Pencil className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200 button-icon" />
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md rounded-xl animate-scale-in border border-border/50 shadow-xl">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-medium">Edit Category</DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                          Update category details.
                        </DialogDescription>
                      </DialogHeader>

                      {editingCategory && (
                        <div className="grid gap-6 py-4">
                          <div className="grid gap-2">
                            <label htmlFor="edit-title" className="text-sm font-medium">Title</label>
                            <Input
                              id="edit-title"
                              value={editingCategory.title}
                              onChange={(e) => setEditingCategory({ ...editingCategory, title: e.target.value })}
                              className="rounded-lg border-input/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all duration-200"
                            />
                          </div>

                          <div className="grid gap-2">
                            <label htmlFor="edit-servicesCount" className="text-sm font-medium">Services Count</label>
                            <Input
                              id="edit-servicesCount"
                              value={editingCategory.servicesCount}
                              onChange={(e) => setEditingCategory({ ...editingCategory, servicesCount: e.target.value })}
                              placeholder="e.g. 1+ Services"
                              className="rounded-lg border-input/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all duration-200"
                            />
                          </div>

                          <div className="grid gap-2">
                            <label htmlFor="edit-image" className="text-sm font-medium">Image</label>
                            <div className="grid gap-4">
                              <Button
                                type="button"
                                variant="outline"
                                className="w-full rounded-lg border-dashed border-2 hover:border-primary/50 transition-all duration-200 group"
                                onClick={() => document.getElementById('edit-image')?.click()}
                              >
                                <Upload className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                                <span className="transition-colors duration-200">Change Image</span>
                              </Button>
                              <input
                                type="file"
                                id="edit-image"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageChange}
                              />
                            </div>

                            {previewURL && (
                              <div className="mt-2 relative rounded-lg overflow-hidden border border-border/50">
                                <img
                                  src={previewURL}
                                  alt="Preview"
                                  className="w-full h-48 object-cover transition-all duration-500"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <DialogFooter className="sm:justify-end gap-2">
                        <DialogClose asChild>
                          <Button variant="outline" className="rounded-lg transition-all duration-200">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button
                            onClick={handleUpdateCategory}
                            className="rounded-lg transition-all duration-200"
                          >
                            Update Category
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive border-destructive/20 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-all duration-200 rounded-lg group"
                    onClick={() => handleDeleteCategory(category._id)}
                  >
                    <Trash className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200 button-icon" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
