"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Pencil, Trash, Upload } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const Services = () => {
  const [services, setServices] = useState([])

  const getServices = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/services`)
      if (res.data.success) {
        setServices(res.data.services)
        console.log(res.data.services)
      }
    } catch (error) {
      console.error("Error fetching services:", error)
    }
  }

  useEffect(() => {
    getServices()
  }, [])

  const [newService, setNewService] = useState({
    title: "",
    price: "",
    category: "",
    providerName: "",
    type: "popular",
    locations: [],
    rating: "0",
  })

  const [editingService, setEditingService] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedProviderImage, setSelectedProviderImage] = useState(null)
  const [imagePreview, setImagePreview] = useState("")
  const [providerImagePreview, setProviderImagePreview] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [locationInput, setLocationInput] = useState("")

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleProviderImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedProviderImage(file)
      setProviderImagePreview(URL.createObjectURL(file))
    }
  }

  const handleAddLocation = () => {
    if (locationInput.trim() === "") return

    if (editingService) {
      setEditingService({
        ...editingService,
        locations: [...(editingService.locations || []), locationInput],
      })
    } else {
      setNewService({
        ...newService,
        locations: [...newService.locations, locationInput],
      })
    }

    setLocationInput("")
  }

  const handleRemoveLocation = (index, isEditing = false) => {
    if (isEditing && editingService) {
      const updatedLocations = [...editingService.locations]
      updatedLocations.splice(index, 1)
      setEditingService({
        ...editingService,
        locations: updatedLocations,
      })
    } else {
      const updatedLocations = [...newService.locations]
      updatedLocations.splice(index, 1)
      setNewService({
        ...newService,
        locations: updatedLocations,
      })
    }
  }

  const handleAddService = async () => {
    if (newService.title.trim() === "" || !newService.category || !newService.providerName.trim()) return

    try {
      const formData = new FormData()

      formData.append("title", newService.title)
      formData.append("price", newService.price)
      formData.append("category", newService.category)
      formData.append("providerName", newService.providerName)
      formData.append("type", newService.type)
      formData.append("rating", newService.rating || "0")
      formData.append("reviews", "0")
      formData.append("locations", JSON.stringify(newService.locations))

      if (selectedImage) {
        formData.append("image", selectedImage)
      }

      if (selectedProviderImage) {
        formData.append("providerImage", selectedProviderImage)
      }

      const res = await axios.post("http://localhost:3000/api/services", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      if (res.data.success) {
        getServices()

        setNewService({
          title: "",
          price: "₹249",
          category: "",
          providerName: "",
          type: "popular",
          locations: [],
          rating: "0",
        })
        setSelectedImage(null)
        setSelectedProviderImage(null)
        setImagePreview("")
        setProviderImagePreview("")
      }
    } catch (error) {
      console.error("Error adding service:", error)
    }
  }

  const handleEditService = (service) => {
    setEditingService({
      ...service,
    })
    setImagePreview(service.image || "")
    setProviderImagePreview(service.providerImage || "")
    setLocationInput("")
  }

  const handleUpdateService = async () => {
    if (!editingService || !editingService.providerName.trim()) return

    try {
      const formData = new FormData()

      formData.append("title", editingService.title)
      formData.append("price", editingService.price)
      formData.append("category", editingService.category)
      formData.append("providerName", editingService.providerName)
      formData.append("type", editingService.type)
      formData.append("rating", editingService.rating || "0")
      formData.append("locations", JSON.stringify(editingService.locations || []))

      if (selectedImage) {
        formData.append("image", selectedImage)
      }

      if (selectedProviderImage) {
        formData.append("providerImage", selectedProviderImage)
      }

      const res = await axios.patch(`http://localhost:3000/api/services/${editingService._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      if (res.data.success) {
        getServices()
        setEditingService(null)
        setSelectedImage(null)
        setSelectedProviderImage(null)
        setImagePreview("")
        setProviderImagePreview("")
      }
    } catch (error) {
      console.error("Error updating service:", error)
    }
  }

  const handleDeleteService = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/services/${id}`)
      if (res.data.success) {
        getServices()
      }
    } catch (error) {
      console.error("Error deleting service:", error)
    }
  }

  const filteredServices =
    filterCategory === "all" ? services : services.filter((service) => service.category === filterCategory)

  const uniqueCategories = Array.from(new Set(services.map((service) => service.category))).filter(Boolean)

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Services</h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">Manage repair and maintenance services</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2 w-full sm:w-auto">
              <Plus className="h-4 w-4" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
              <DialogDescription>Create a new service with details and pricing.</DialogDescription>
            </DialogHeader>

            <div className="max-h-[60vh] overflow-hidden">
              <ScrollArea className="h-full pr-4">
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="title" className="text-sm font-medium">
                      Service Title
                    </label>
                    <Input
                      id="title"
                      value={newService.title}
                      onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                      placeholder="Service title"
                    />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="category" className="text-sm font-medium">
                      Category
                    </label>
                    <Input
                      id="category"
                      value={newService.category}
                      onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                      placeholder="Category name"
                    />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="providerName" className="text-sm font-medium">
                      Provider Name
                    </label>
                    <Input
                      id="providerName"
                      value={newService.providerName}
                      onChange={(e) => setNewService({ ...newService, providerName: e.target.value })}
                      placeholder="Provider name"
                    />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="price" className="text-sm font-medium">
                      Price
                    </label>
                    <Input
                      id="price"
                      value={newService.price}
                      onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                      placeholder="₹249"
                    />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="type" className="text-sm font-medium">
                      Type
                    </label>
                    <Select
                      value={newService.type}
                      onValueChange={(value) => setNewService({ ...newService, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="popular">Popular</SelectItem>
                        <SelectItem value="featured">Featured</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="rating" className="text-sm font-medium">
                      Rating
                    </label>
                    <Input
                      id="rating"
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      value={newService.rating || 0}
                      onChange={(e) => setNewService({ ...newService, rating: e.target.value })}
                      placeholder="0.0"
                    />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="locations" className="text-sm font-medium">
                      Locations
                    </label>
                    <div className="grid gap-2">
                      <div className="flex items-center gap-2">
                        <Input
                          id="locations"
                          value={locationInput}
                          onChange={(e) => setLocationInput(e.target.value)}
                          placeholder="Add a location"
                        />
                        <Button type="button" variant="outline" onClick={handleAddLocation}>
                          Add
                        </Button>
                      </div>
                      {newService.locations.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {newService.locations.map((location, index) => (
                            <div key={index} className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md">
                              <span className="text-sm">{location}</span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-5 w-5 p-0"
                                onClick={() => handleRemoveLocation(index)}
                              >
                                <Trash className="h-3 w-3" />
                                <span className="sr-only">Remove</span>
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="image" className="text-sm font-medium">
                      Service Image
                    </label>
                    <div className="grid gap-2">
                      <div className="flex items-center gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full"
                          onClick={() => document.getElementById("add-service-image").click()}
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

                      {imagePreview && (
                        <div className="mt-2 relative">
                          <img
                            src={imagePreview || "/placeholder.svg"}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded-md"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="providerImage" className="text-sm font-medium">
                      Provider Image
                    </label>
                    <div className="grid gap-2">
                      <div className="flex items-center gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full"
                          onClick={() => document.getElementById("add-provider-image").click()}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Provider Image
                        </Button>
                        <input
                          type="file"
                          id="add-provider-image"
                          className="hidden"
                          accept="image/*"
                          onChange={handleProviderImageChange}
                        />
                      </div>

                      {providerImagePreview && (
                        <div className="mt-2 relative">
                          <img
                            src={providerImagePreview || "/placeholder.svg"}
                            alt="Provider Preview"
                            className="w-full h-48 object-cover rounded-md"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </div>

            <DialogFooter className="mt-6">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  onClick={handleAddService}
                  disabled={!newService.title.trim() || !newService.category || !newService.providerName.trim()}
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
          <span className="text-sm text-gray-500">Filter:</span>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {uniqueCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="text-sm text-gray-500">
          {filteredServices.length} of {services.length} services
        </div>
      </div>

      {/* Desktop view */}
      <div className="hidden sm:block">
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Image</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Locations</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices.map((service) => (
                  <TableRow key={service._id}>
                    <TableCell>
                      <img
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{service.title}</p>
                    </TableCell>
                    <TableCell>{service.category}</TableCell>
                    <TableCell>{service.price}</TableCell>
                    <TableCell>
                      <span className="capitalize">{service.type}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="mr-2">{service.rating || 0}</span>
                        <span className="text-yellow-500">★</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {service.locations && service.locations.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {service.locations.map((location, index) => (
                            <span key={index} className="inline-block bg-muted px-2 py-1 text-xs rounded-md">
                              {location}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">No locations</span>
                      )}
                    </TableCell>
                    <TableCell>{service.providerName}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => handleEditService(service)}>
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <DialogHeader>
                              <DialogTitle>Edit Service</DialogTitle>
                              <DialogDescription>Update service details.</DialogDescription>
                            </DialogHeader>

                            {editingService && (
                              <div className="max-h-[60vh] overflow-hidden">
                                <ScrollArea className="h-full pr-4">
                                  <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                      <label htmlFor="edit-title" className="text-sm font-medium">
                                        Service Title
                                      </label>
                                      <Input
                                        id="edit-title"
                                        value={editingService.title}
                                        onChange={(e) =>
                                          setEditingService({ ...editingService, title: e.target.value })
                                        }
                                      />
                                    </div>

                                    <div className="grid gap-2">
                                      <label htmlFor="edit-category" className="text-sm font-medium">
                                        Category
                                      </label>
                                      <Input
                                        id="edit-category"
                                        value={editingService.category}
                                        onChange={(e) =>
                                          setEditingService({ ...editingService, category: e.target.value })
                                        }
                                      />
                                    </div>

                                    <div className="grid gap-2">
                                      <label htmlFor="edit-provider-name" className="text-sm font-medium">
                                        Provider Name
                                      </label>
                                      <Input
                                        id="edit-provider-name"
                                        value={editingService.providerName}
                                        onChange={(e) =>
                                          setEditingService({ ...editingService, providerName: e.target.value })
                                        }
                                      />
                                    </div>

                                    <div className="grid gap-2">
                                      <label htmlFor="edit-price" className="text-sm font-medium">
                                        Price
                                      </label>
                                      <Input
                                        id="edit-price"
                                        value={editingService.price}
                                        onChange={(e) =>
                                          setEditingService({ ...editingService, price: e.target.value })
                                        }
                                      />
                                    </div>

                                    <div className="grid gap-2">
                                      <label htmlFor="edit-type" className="text-sm font-medium">
                                        Type
                                      </label>
                                      <Select
                                        value={editingService.type}
                                        onValueChange={(value) => setEditingService({ ...editingService, type: value })}
                                      >
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="popular">Popular</SelectItem>
                                          <SelectItem value="featured">Featured</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>

                                    <div className="grid gap-2">
                                      <label htmlFor="edit-rating" className="text-sm font-medium">
                                        Rating
                                      </label>
                                      <Input
                                        id="edit-rating"
                                        type="number"
                                        min="0"
                                        max="5"
                                        step="0.1"
                                        value={editingService.rating || 0}
                                        onChange={(e) =>
                                          setEditingService({ ...editingService, rating: e.target.value })
                                        }
                                      />
                                    </div>

                                    <div className="grid gap-2">
                                      <label htmlFor="edit-locations" className="text-sm font-medium">
                                        Locations
                                      </label>
                                      <div className="grid gap-2">
                                        <div className="flex items-center gap-2">
                                          <Input
                                            id="edit-locations"
                                            value={locationInput}
                                            onChange={(e) => setLocationInput(e.target.value)}
                                            placeholder="Add a location"
                                          />
                                          <Button type="button" variant="outline" onClick={handleAddLocation}>
                                            Add
                                          </Button>
                                        </div>
                                        {editingService.locations && editingService.locations.length > 0 && (
                                          <div className="mt-2 flex flex-wrap gap-2">
                                            {editingService.locations.map((location, index) => (
                                              <div
                                                key={index}
                                                className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md"
                                              >
                                                <span className="text-sm">{location}</span>
                                                <Button
                                                  type="button"
                                                  variant="ghost"
                                                  size="sm"
                                                  className="h-5 w-5 p-0"
                                                  onClick={() => handleRemoveLocation(index, true)}
                                                >
                                                  <Trash className="h-3 w-3" />
                                                  <span className="sr-only">Remove</span>
                                                </Button>
                                              </div>
                                            ))}
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    <div className="grid gap-2">
                                      <label htmlFor="edit-service-image" className="text-sm font-medium">
                                        Service Image
                                      </label>
                                      <div className="grid gap-2">
                                        <div className="flex items-center gap-4">
                                          <Button
                                            type="button"
                                            variant="outline"
                                            className="w-full"
                                            onClick={() => document.getElementById("edit-service-image").click()}
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

                                        {imagePreview && (
                                          <div className="mt-2 relative">
                                            <img
                                              src={imagePreview || "/placeholder.svg"}
                                              alt="Preview"
                                              className="w-full h-48 object-cover rounded-md"
                                            />
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    <div className="grid gap-2">
                                      <label htmlFor="edit-provider-image" className="text-sm font-medium">
                                        Provider Image
                                      </label>
                                      <div className="grid gap-2">
                                        <div className="flex items-center gap-4">
                                          <Button
                                            type="button"
                                            variant="outline"
                                            className="w-full"
                                            onClick={() => document.getElementById("edit-provider-image").click()}
                                          >
                                            <Upload className="h-4 w-4 mr-2" />
                                            Change Provider Image
                                          </Button>
                                          <input
                                            type="file"
                                            id="edit-provider-image"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleProviderImageChange}
                                          />
                                        </div>

                                        {providerImagePreview && (
                                          <div className="mt-2 relative">
                                            <img
                                              src={providerImagePreview || "/placeholder.svg"}
                                              alt="Provider Preview"
                                              className="w-full h-48 object-cover rounded-md"
                                            />
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </ScrollArea>
                              </div>
                            )}

                            <DialogFooter className="mt-6">
                              <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                              </DialogClose>
                              <DialogClose asChild>
                                <Button
                                  onClick={handleUpdateService}
                                  disabled={
                                    !editingService?.title.trim() ||
                                    !editingService?.category ||
                                    !editingService?.providerName.trim()
                                  }
                                >
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
                          onClick={() => handleDeleteService(service._id)}
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

      {/* Mobile view */}
      <div className="grid grid-cols-1 gap-4 sm:hidden">
        {filteredServices.map((service) => (
          <Card key={service._id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-base truncate">{service.title}</h3>
                  <div className="mt-1 space-y-1">
                    <p className="text-sm text-gray-500">
                      Category: <span className="font-medium">{service.category}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Price: <span className="font-medium">{service.price}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Type: <span className="font-medium capitalize">{service.type}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Rating:{" "}
                      <span className="font-medium flex items-center">
                        {service.rating || 0} <span className="text-yellow-500 ml-1">★</span>
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Locations:
                      {service.locations && service.locations.length > 0 ? (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {service.locations.map((location, index) => (
                            <span key={index} className="inline-block bg-muted px-2 py-1 text-xs rounded-md">
                              {location}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="font-medium"> None</span>
                      )}
                    </p>
                    <p className="text-sm text-gray-500">
                      Provider: <span className="font-medium">{service.providerName}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => handleEditService(service)}>
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Edit Service</DialogTitle>
                      <DialogDescription>Update service details.</DialogDescription>
                    </DialogHeader>
                    {editingService && (
                      <div className="max-h-[60vh] overflow-hidden">
                        <ScrollArea className="h-full pr-4">
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <label htmlFor="edit-title-mobile" className="text-sm font-medium">
                                Service Title
                              </label>
                              <Input
                                id="edit-title-mobile"
                                value={editingService.title}
                                onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                              />
                            </div>

                            <div className="grid gap-2">
                              <label htmlFor="edit-category-mobile" className="text-sm font-medium">
                                Category
                              </label>
                              <Input
                                id="edit-category-mobile"
                                value={editingService.category}
                                onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                              />
                            </div>

                            <div className="grid gap-2">
                              <label htmlFor="edit-provider-name-mobile" className="text-sm font-medium">
                                Provider Name
                              </label>
                              <Input
                                id="edit-provider-name-mobile"
                                value={editingService.providerName}
                                onChange={(e) => setEditingService({ ...editingService, providerName: e.target.value })}
                              />
                            </div>

                            <div className="grid gap-2">
                              <label htmlFor="edit-price-mobile" className="text-sm font-medium">
                                Price
                              </label>
                              <Input
                                id="edit-price-mobile"
                                value={editingService.price}
                                onChange={(e) => setEditingService({ ...editingService, price: e.target.value })}
                              />
                            </div>

                            <div className="grid gap-2">
                              <label htmlFor="edit-type-mobile" className="text-sm font-medium">
                                Type
                              </label>
                              <Select
                                value={editingService.type}
                                onValueChange={(value) => setEditingService({ ...editingService, type: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="popular">Popular</SelectItem>
                                  <SelectItem value="featured">Featured</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="grid gap-2">
                              <label htmlFor="edit-rating-mobile" className="text-sm font-medium">
                                Rating
                              </label>
                              <Input
                                id="edit-rating-mobile"
                                type="number"
                                min="0"
                                max="5"
                                step="0.1"
                                value={editingService.rating || 0}
                                onChange={(e) => setEditingService({ ...editingService, rating: e.target.value })}
                              />
                            </div>

                            <div className="grid gap-2">
                              <label htmlFor="edit-locations-mobile" className="text-sm font-medium">
                                Locations
                              </label>
                              <div className="grid gap-2">
                                <div className="flex items-center gap-2">
                                  <Input
                                    id="edit-locations-mobile"
                                    value={locationInput}
                                    onChange={(e) => setLocationInput(e.target.value)}
                                    placeholder="Add a location"
                                  />
                                  <Button type="button" variant="outline" onClick={handleAddLocation}>
                                    Add
                                  </Button>
                                </div>
                                {editingService.locations && editingService.locations.length > 0 && (
                                  <div className="mt-2 flex flex-wrap gap-2">
                                    {editingService.locations.map((location, index) => (
                                      <div
                                        key={index}
                                        className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md"
                                      >
                                        <span className="text-sm">{location}</span>
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          size="sm"
                                          className="h-5 w-5 p-0"
                                          onClick={() => handleRemoveLocation(index, true)}
                                        >
                                          <Trash className="h-3 w-3" />
                                          <span className="sr-only">Remove</span>
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="grid gap-2">
                              <label htmlFor="edit-service-image-mobile" className="text-sm font-medium">
                                Service Image
                              </label>
                              <div className="grid gap-2">
                                <div className="flex items-center gap-4">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => document.getElementById("edit-service-image-mobile").click()}
                                  >
                                    <Upload className="h-4 w-4 mr-2" />
                                    Change Image
                                  </Button>
                                  <input
                                    type="file"
                                    id="edit-service-image-mobile"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                  />
                                </div>

                                {imagePreview && (
                                  <div className="mt-2 relative">
                                    <img
                                      src={imagePreview || "/placeholder.svg"}
                                      alt="Preview"
                                      className="w-full h-48 object-cover rounded-md"
                                    />
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="grid gap-2">
                              <label htmlFor="edit-provider-image-mobile" className="text-sm font-medium">
                                Provider Image
                              </label>
                              <div className="grid gap-2">
                                <div className="flex items-center gap-4">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => document.getElementById("edit-provider-image-mobile").click()}
                                  >
                                    <Upload className="h-4 w-4 mr-2" />
                                    Change Provider Image
                                  </Button>
                                  <input
                                    type="file"
                                    id="edit-provider-image-mobile"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleProviderImageChange}
                                  />
                                </div>

                                {providerImagePreview && (
                                  <div className="mt-2 relative">
                                    <img
                                      src={providerImagePreview || "/placeholder.svg"}
                                      alt="Provider Preview"
                                      className="w-full h-48 object-cover rounded-md"
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </ScrollArea>
                      </div>
                    )}

                    <DialogFooter className="mt-6">
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button
                          onClick={handleUpdateService}
                          disabled={
                            !editingService?.title.trim() ||
                            !editingService?.category ||
                            !editingService?.providerName.trim()
                          }
                        >
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
                  onClick={() => handleDeleteService(service._id)}
                >
                  <Trash className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Services

