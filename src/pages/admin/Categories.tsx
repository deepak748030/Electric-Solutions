
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
import { Separator } from '@/components/ui/separator';

const Categories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Electrical Services', description: 'All electrical repair and installation services', image: '/lovable-uploads/f92c461d-115f-4526-9347-e8eb769d7e87.png' },
    { id: 2, name: 'Plumbing', description: 'Full suite of plumbing services for your home or office', image: '/lovable-uploads/4a6ac531-74d9-48b7-bddd-7657fe15a950.png' },
    { id: 3, name: 'Cleaning Services', description: 'Professional cleaning for any space', image: '/lovable-uploads/c2ffb8dc-61c7-4491-9206-a6eb5197f59a.png' },
    { id: 4, name: 'Painting', description: 'Interior and exterior painting services', image: '/lovable-uploads/c9d45a97-0cba-407c-b4d6-3a021e5ef36a.png' },
  ]);

  const [newCategory, setNewCategory] = useState({ name: '', description: '', image: '' });
  const [editingCategory, setEditingCategory] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewURL, setPreviewURL] = useState('');

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleAddCategory = () => {
    if (newCategory.name.trim() === '') return;
    
    const newId = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;
    setCategories([...categories, { 
      id: newId, 
      name: newCategory.name, 
      description: newCategory.description,
      image: previewURL || '/placeholder.svg' 
    }]);
    
    // Reset form
    setNewCategory({ name: '', description: '', image: '' });
    setSelectedImage(null);
    setPreviewURL('');
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setPreviewURL(category.image);
  };

  const handleUpdateCategory = () => {
    if (!editingCategory) return;
    
    setCategories(categories.map(cat => 
      cat.id === editingCategory.id ? 
      { ...editingCategory, image: previewURL || editingCategory.image } : 
      cat
    ));
    
    setEditingCategory(null);
    setSelectedImage(null);
    setPreviewURL('');
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter(category => category.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Categories</h1>
          <p className="text-gray-500 mt-1">Manage service categories</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogDescription>
                Create a new service category with name, description, and image.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <Input
                  id="name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  placeholder="Category name"
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="description" className="text-sm font-medium">Description</label>
                <Textarea
                  id="description"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                  placeholder="Brief description"
                  rows={3}
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="image" className="text-sm font-medium">Image</label>
                <div className="grid gap-2">
                  <div className="flex items-center gap-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full"
                      onClick={() => document.getElementById('add-image').click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Image
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
                    <div className="mt-2 relative">
                      <img 
                        src={previewURL} 
                        alt="Preview" 
                        className="w-full h-48 object-cover rounded-md" 
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={handleAddCategory} disabled={!newCategory.name.trim()}>
                  Add Category
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(category => (
          <Card key={category.id} className="overflow-hidden">
            <div className="relative h-48">
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-full h-full object-cover" 
              />
            </div>
            <CardHeader>
              <CardTitle>{category.name}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" onClick={() => handleEditCategory(category)}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Category</DialogTitle>
                    <DialogDescription>
                      Update category details.
                    </DialogDescription>
                  </DialogHeader>
                  
                  {editingCategory && (
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <label htmlFor="edit-name" className="text-sm font-medium">Name</label>
                        <Input
                          id="edit-name"
                          value={editingCategory.name}
                          onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <label htmlFor="edit-description" className="text-sm font-medium">Description</label>
                        <Textarea
                          id="edit-description"
                          value={editingCategory.description}
                          onChange={(e) => setEditingCategory({...editingCategory, description: e.target.value})}
                          rows={3}
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <label htmlFor="edit-image" className="text-sm font-medium">Image</label>
                        <div className="grid gap-2">
                          <div className="flex items-center gap-4">
                            <Button 
                              type="button" 
                              variant="outline" 
                              className="w-full"
                              onClick={() => document.getElementById('edit-image').click()}
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              Change Image
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
                            <div className="mt-2 relative">
                              <img 
                                src={previewURL} 
                                alt="Preview" 
                                className="w-full h-48 object-cover rounded-md" 
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button onClick={handleUpdateCategory}>
                        Update Category
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                onClick={() => handleDeleteCategory(category.id)}
              >
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Categories;
