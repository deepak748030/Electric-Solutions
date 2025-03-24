
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  MenuIcon,
  PackageOpen,
  Settings,
  ShoppingCart,
  Tag,
  X,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const AdminSidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const menuItems = [
    {
      name: 'Services',
      path: '/admin',
      icon: <PackageOpen className="h-5 w-5" />
    },
    {
      name: 'Categories',
      path: '/admin/categories',
      icon: <Tag className="h-5 w-5" />
    },
    {
      name: 'Orders',
      path: '/admin/orders',
      icon: <ShoppingCart className="h-5 w-5" />
    },
    // { 
    //   name: 'Settings', 
    //   path: '/admin/settings', 
    //   icon: <Settings className="h-5 w-5" /> 
    // },
    // { 
    //   name: 'Profile', 
    //   path: '/admin/profile', 
    //   icon: <User className="h-5 w-5" /> 
    // }
  ];

  return (
    <aside
      className={cn(
        "bg-white border-r border-gray-200 flex flex-col transition-all duration-300 shadow-sm",
        expanded ? "w-64" : "w-20"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {expanded && (
          <Link to="/admin" className="font-bold text-xl text-brand-blue">
            RepairGuru
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="rounded-full"
        >
          {expanded ? (
            <X className="h-5 w-5" />
          ) : (
            <MenuIcon className="h-5 w-5" />
          )}
        </Button>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center py-2 px-3 rounded-lg transition-all",
                  location.pathname === item.path
                    ? "bg-brand-blue text-white"
                    : "text-gray-700 hover:bg-gray-100",
                  !expanded && "justify-center"
                )}
              >
                {item.icon}
                {expanded && <span className="ml-3">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t">
        <Separator className="my-2" />
        <Link to="/" className={cn(
          "flex items-center text-gray-700 hover:bg-gray-100 py-2 px-3 rounded-lg",
          !expanded && "justify-center"
        )}>
          {expanded ? "Back to Website" : <X className="h-5 w-5" />}
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;
