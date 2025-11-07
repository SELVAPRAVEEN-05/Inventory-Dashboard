import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Package, Plus, X } from 'lucide-react';
import Button from '../components/Button';

const Sidebar = ({ onAddProduct }) => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const navigation = [
    { name: 'Products', href: '/', icon: Package },
  ];

  return (
    <>
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2.5 rounded-lg bg-white shadow-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Menu size={20} />
        </button>
      </div>

      <div className={`fixed inset-y-0 left-0 z-40 w-72 transform 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full bg-white border-r border-gray-100 shadow-sm">
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors
                    ${location.pathname === item.href
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-100">
            <Button
              onClick={onAddProduct}
              className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white 
                bg-blue-600 rounded-lg hover:bg-primary-700 transition-colors shadow-sm hover:shadow-md"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Product
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;