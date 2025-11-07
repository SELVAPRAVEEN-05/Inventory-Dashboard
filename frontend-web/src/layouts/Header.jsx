import { Search } from 'lucide-react';

const Header = ({ searchQuery, onSearchChange, selectedCategory, onCategoryChange, categories }) => {
    return (
        <div className="bg-white border-b border-gray-100 shadow-sm">
            <div className="px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative flex-1 w-full">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg 
                text-gray-900 placeholder-gray-400
                transition-all duration-200
                focus:outline-none focus:ring-1 focus:ring-blue-500
                hover:border-gray-300"
                        />
                    </div>
                    <div className="w-full sm:w-56">
                        <select
                            value={selectedCategory}
                            onChange={(e) => onCategoryChange(e.target.value)}
                            className="block cursor-pointer w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg 
                text-gray-900 appearance-none
                transition-all duration-200
                focus:outline-none focus:ring-1 focus:ring-blue-500
                hover:border-gray-300"
                        >
                            <option value="">All Categories</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;