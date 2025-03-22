
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash, Upload, IndianRupee, MapPin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

const Services = () => {
  // Mock categories
  const categories = [
    { id: 1, name: 'Electrical Services' },
    { id: 2, name: 'Plumbing' },
    { id: 3, name: 'Cleaning Services' },
    { id: 4, name: 'Painting' },
  ];

  // Mock services data
  const [services, setServices] = useState([
    { 
      id: 1, 
      name: 'AC Repair', 
      description: 'Professional AC repair service', 
      price: 120, 
      duration: '2 hours', 
      categoryId: 1,
      location: 'Mumbai, Delhi, Bangalore',
      image: '/lovable-uploads/d2bdb4e4-28b6-4d6d-97ae-1f356bc7cd37.png' 
    },
    { 
      id: 2, 
      name: 'Pipe Fixing', 
      description: 'Fix leaky pipes', 
      price: 85, 
      duration: '1 hour', 
      categoryId: 2,
      location: 'Delhi, Pune, Chennai',
      image: '/lovable-uploads/37548b2d-dde2-438f-91fd-70758060f852.png' 
    },
    { 
      id: 3, 
      name: 'Deep Cleaning', 
      description: 'Complete house deep cleaning', 
      price: 200, 
      duration: '4 hours', 
      categoryId: 3,
      location: 'Hyderabad, Kolkata, Chennai',
      image: '/lovable-uploads/f4ff55b6-3170-4526-9347-e8eb769d7e87.png' 
    },
  ]);

  const [newService, setNewService] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    categoryId: '',
    location: '',
    image: ''
  });
  
  const [editingService, setEditingService] = useState(null);
  const [previewURL, setPreviewURL] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleAddService = () => {
    if (newService.name.trim() === '' || !newService.categoryId || !newService.price) return;
    
    const newId = services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1;
    setServices([...services, { 
      id: newId, 
      name: newService.name, 
      description: newService.description,
      price: parseFloat(newService.price),
      duration: newService.duration,
      categoryId: parseInt(newService.categoryId),
      location: newService.location,
      image: previewURL || '/placeholder.svg' 
    }]);
    
    // Reset form
    setNewService({
      name: '',
      description: '',
      price: '',
      duration: '',
      categoryId: '',
      location: '',
      image: ''
    });
    setSelectedImage(null);
    setPreviewURL('');
  };

  const handleEditService = (service) => {
    setEditingService({
      ...service,
      categoryId: service.categoryId.toString(),
      price: service.price.toString()
    });
    setPreviewURL(service.image);
  };

  const handleUpdateService = () => {
    if (!editingService) return;
    
    setServices(services.map(svc => 
      svc.id === editingService.id ? 
      { 
        ...editingService, 
        categoryId: parseInt(editingService.categoryId),
        price: parseFloat(editingService.price),
        image: previewURL || editingService.image 
      } : 
      svc
    ));
    
    setEditingService(null);
    setSelectedImage(null);
    setPreviewURL('');
  };

  const handleDeleteService = (id) => {
    setServices(services.filter(service => service.id !== id));
  };

  // Filter services by category
  const filteredServices = filterCategory === 'all' 
    ? services 
    : services.filter(service => service.categoryId === parseInt(filterCategory));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Services</h1>
          <p className="text-gray-500 mt-1">Manage repair and maintenance services</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
              <DialogDescription>
                Create a new service with details and pricing.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">Service Name</label>
                <Input
                  id="name"
                  value={newService.name}
                  onChange={(e) => setNewService({...newService, name: e.target.value})}
                  placeholder="Service name"
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="category" className="text-sm font-medium">Category</label>
                <Select
                  value={newService.categoryId}
                  onValueChange={(value) => setNewService({...newService, categoryId: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="price" className="text-sm font-medium">Price (₹)</label>
                  <Input
                    id="price"
                    type="number"
                    value={newService.price}
                    onChange={(e) => setNewService({...newService, price: e.target.value})}
                    placeholder="0.00"
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="duration" className="text-sm font-medium">Duration</label>
                  <Input
                    id="duration"
                    value={newService.duration}
                    onChange={(e) => setNewService({...newService, duration: e.target.value})}
                    placeholder="e.g. 2 hours"
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="location" className="text-sm font-medium">Service Locations</label>
                <Input
                  id="location"
                  value={newService.location}
                  onChange={(e) => setNewService({...newService, location: e.target.value})}
                  placeholder="e.g. Mumbai, Delhi, Bangalore"
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="description" className="text-sm font-medium">Description</label>
                <Textarea
                  id="description"
                  value={newService.description}
                  onChange={(e) => setNewService({...newService, description: e.target.value})}
                  placeholder="Service description"
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
                      onClick={() => document.getElementById('add-service-image').click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Image
                    </Button>
                    <input
                      type="file"
                      id="add-service-image"
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
                <Button 
                  onClick={handleAddService} 
                  disabled={!newService.name.trim() || !newService.categoryId || !newService.price}
                >
                  Add Service
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Filter by category:</span>
          <Select
            value={filterCategory}
            onValueChange={setFilterCategory}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="text-sm text-gray-500">
          Showing {filteredServices.length} of {services.length} services
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Image</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Locations</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices.map(service => (
                  <TableRow key={service.id}>
                    <TableCell>
                      <img 
                        src={service.image} 
                        alt={service.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{service.name}</p>
                        <p className="text-sm text-gray-500 truncate max-w-[250px]">
                          {service.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {categories.find(c => c.id === service.categoryId)?.name}
                    </TableCell>
                    <TableCell className="flex items-center">
                      <IndianRupee className="h-4 w-4 mr-1" />
                      {service.price.toFixed(2)}
                    </TableCell>
                    <TableCell>{service.duration}</TableCell>
                    <TableCell>
                      <div className="flex items-start gap-1">
                        <MapPin className="h-4 w-4 mt-0.5 text-gray-500 flex-shrink-0" />
                        <span className="text-sm">{service.location}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => handleEditService(service)}>
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Service</DialogTitle>
                              <DialogDescription>
                                Update service details.
                              </DialogDescription>
                            </DialogHeader>
                            
                            {editingService && (
                              <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                  <label htmlFor="edit-name" className="text-sm font-medium">Service Name</label>
                                  <Input
                                    id="edit-name"
                                    value={editingService.name}
                                    onChange={(e) => setEditingService({...editingService, name: e.target.value})}
                                  />
                                </div>
                                
                                <div className="grid gap-2">
                                  <label htmlFor="edit-category" className="text-sm font-medium">Category</label>
                                  <Select
                                    value={editingService.categoryId}
                                    onValueChange={(value) => setEditingService({...editingService, categoryId: value})}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {categories.map(category => (
                                        <SelectItem key={category.id} value={category.id.toString()}>
                                          {category.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="grid gap-2">
                                    <label htmlFor="edit-price" className="text-sm font-medium">Price (₹)</label>
                                    <Input
                                      id="edit-price"
                                      type="number"
                                      value={editingService.price}
                                      onChange={(e) => setEditingService({...editingService, price: e.target.value})}
                                    />
                                  </div>
                                  
                                  <div className="grid gap-2">
                                    <label htmlFor="edit-duration" className="text-sm font-medium">Duration</label>
                                    <Input
                                      id="edit-duration"
                                      value={editingService.duration}
                                      onChange={(e) => setEditingService({...editingService, duration: e.target.value})}
                                    />
                                  </div>
                                </div>
                                
                                <div className="grid gap-2">
                                  <label htmlFor="edit-location" className="text-sm font-medium">Service Locations</label>
                                  <Input
                                    id="edit-location"
                                    value={editingService.location}
                                    onChange={(e) => setEditingService({...editingService, location: e.target.value})}
                                    placeholder="e.g. Mumbai, Delhi, Bangalore"
                                  />
                                </div>
                                
                                <div className="grid gap-2">
                                  <label htmlFor="edit-description" className="text-sm font-medium">Description</label>
                                  <Textarea
                                    id="edit-description"
                                    value={editingService.description}
                                    onChange={(e) => setEditingService({...editingService, description: e.target.value})}
                                    rows={3}
                                  />
                                </div>
                                
                                <div className="grid gap-2">
                                  <label htmlFor="edit-service-image" className="text-sm font-medium">Image</label>
                                  <div className="grid gap-2">
                                    <div className="flex items-center gap-4">
                                      <Button 
                                        type="button" 
                                        variant="outline" 
                                        className="w-full"
                                        onClick={() => document.getElementById('edit-service-image').click()}
                                      >
                                        <Upload className="h-4 w-4 mr-2" />
                                        Change Image
                                      </Button>
                                      <input
                                        type="file"
                                        id="edit-service-image"
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
                                <Button onClick={handleUpdateService}>
                                  Update Service
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                          onClick={() => handleDeleteService(service.id)}
                        >
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Services;
