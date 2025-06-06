import { FC, useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { Card, Title, Text, Button, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge } from '@tremor/react';
import CreatePackageModal from './CreatePackageModal';

interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  features: string[];
  status: 'active' | 'inactive';
}

const PackagesPage: FC = () => {
  const [packages, setPackages] = useState<Package[]>([
    {
      id: '1',
      name: 'Basic Membership',
      description: 'Access to gym equipment and basic facilities',
      price: 49.99,
      duration: 'Monthly',
      features: ['Access to gym equipment', 'Locker room access', 'Basic fitness assessment'],
      status: 'active'
    },
    {
      id: '2',
      name: 'Premium Package',
      description: 'Full access to all facilities including pool and spa',
      price: 89.99,
      duration: 'Monthly',
      features: ['All Basic features', 'Pool access', 'Spa access', 'Personal trainer session'],
      status: 'active'
    }
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreatePackage = (packageData: Omit<Package, 'id'>) => {
    const newPackage: Package = {
      ...packageData,
      id: Math.random().toString(36).substr(2, 9),
    };
    setPackages(prev => [...prev, newPackage]);
  };

  const handleDeletePackage = (id: string) => {
    setPackages(prev => prev.filter(pkg => pkg.id !== id));
  };

  return (
    <div className="p-2 md:p-4 space-y-3 md:space-y-4">
      {/* Header Section */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 p-3 md:p-4 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <div>
            <h1 className="text-lg md:text-xl font-bold text-white">Gym Packages</h1>
            <p className="mt-1 text-xs md:text-sm text-indigo-50/90">Create and manage custom packages for your members</p>
          </div>
          <Button
            icon={PlusIcon}
            onClick={() => setIsCreateModalOpen(true)}
            size="md"
            className="w-full md:w-auto rounded-full bg-white text-indigo-600 hover:bg-indigo-50 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg px-4 py-2 text-sm"
          >
            Create Package
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
        <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-4 shadow-xl ring-1 ring-white/20 hover:ring-indigo-500/50 transition-all duration-300">
          <div className="flex items-center space-x-2 text-sm text-gray-100">
            <SparklesIcon className="h-4 w-4 md:h-5 md:w-5 text-indigo-300" />
            <span>Total Packages</span>
          </div>
          <div className="mt-1">
            <span className="text-xl md:text-2xl font-semibold text-white">{packages.length}</span>
          </div>
        </div>
        <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-4 shadow-xl ring-1 ring-white/20 hover:ring-emerald-500/50 transition-all duration-300">
          <div className="flex items-center space-x-2 text-sm text-gray-100">
            <SparklesIcon className="h-4 w-4 md:h-5 md:w-5 text-emerald-300" />
            <span>Active Packages</span>
          </div>
          <div className="mt-1">
            <span className="text-xl md:text-2xl font-semibold text-white">
              {packages.filter(pkg => pkg.status === 'active').length}
            </span>
          </div>
        </div>
        <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-4 shadow-xl ring-1 ring-white/20 hover:ring-cyan-500/50 transition-all duration-300">
          <div className="flex items-center space-x-2 text-sm text-gray-100">
            <SparklesIcon className="h-4 w-4 md:h-5 md:w-5 text-cyan-300" />
            <span>Average Price</span>
          </div>
          <div className="mt-1">
            <span className="text-xl md:text-2xl font-semibold text-white">
              ${(packages.reduce((acc, pkg) => acc + pkg.price, 0) / packages.length).toFixed(2)}
            </span>
          </div>
        </div>
        <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-4 shadow-xl ring-1 ring-white/20 hover:ring-purple-500/50 transition-all duration-300">
          <div className="flex items-center space-x-2 text-sm text-gray-100">
            <SparklesIcon className="h-4 w-4 md:h-5 md:w-5 text-purple-300" />
            <span>Total Features</span>
          </div>
          <div className="mt-1">
            <span className="text-xl md:text-2xl font-semibold text-white">
              {packages.reduce((acc, pkg) => acc + pkg.features.length, 0)}
            </span>
          </div>
        </div>
      </div>

      {/* Packages Table */}
      <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-2 md:p-4 shadow-xl ring-1 ring-white/20 overflow-x-auto">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell className="text-gray-100 text-xs md:text-sm py-2">Package Name</TableHeaderCell>
              <TableHeaderCell className="text-gray-100 text-xs md:text-sm py-2">Description</TableHeaderCell>
              <TableHeaderCell className="text-gray-100 text-xs md:text-sm py-2">Price</TableHeaderCell>
              <TableHeaderCell className="text-gray-100 text-xs md:text-sm py-2">Duration</TableHeaderCell>
              <TableHeaderCell className="text-gray-100 text-xs md:text-sm py-2">Features</TableHeaderCell>
              <TableHeaderCell className="text-gray-100 text-xs md:text-sm py-2">Status</TableHeaderCell>
              <TableHeaderCell className="text-gray-100 text-xs md:text-sm py-2">Actions</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packages.map((pkg) => (
              <TableRow key={pkg.id} className="hover:bg-white/20 transition-all duration-200 text-xs md:text-sm">
                <TableCell className="text-white font-semibold py-2 align-top whitespace-nowrap">{pkg.name}</TableCell>
                <TableCell className="text-gray-200 py-2 align-top whitespace-nowrap">{pkg.description}</TableCell>
                <TableCell className="text-white font-semibold py-2 align-top whitespace-nowrap">${pkg.price}</TableCell>
                <TableCell className="text-gray-200 py-2 align-top whitespace-nowrap">{pkg.duration}</TableCell>
                <TableCell className="py-2 align-top">
                  <div className="flex flex-wrap gap-1">
                    {pkg.features.map((feature, index) => (
                      <Badge 
                        key={index} 
                        color="indigo" 
                        size="xs"
                        className="bg-indigo-500/20 text-indigo-200 border-indigo-500/30 rounded-full px-2 py-0.5 text-[10px] md:text-xs font-normal"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="py-2 align-top">
                  <Badge
                    color={pkg.status === 'active' ? 'emerald' : 'rose'}
                    size="xs"
                    className={`${
                      pkg.status === 'active' 
                        ? 'bg-emerald-500/20 text-emerald-200 border-emerald-500/30'
                        : 'bg-rose-500/20 text-rose-200 border-rose-500/30'
                    } rounded-full px-2 py-0.5 text-[10px] md:text-xs font-normal`}
                  >
                    {pkg.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-2 align-top">
                  <div className="flex flex-row gap-2 items-center">
                    <Button 
                      size="xs" 
                      variant="secondary"
                      icon={PencilIcon}
                      className="rounded-full bg-indigo-500/20 text-indigo-200 hover:bg-indigo-500/30 border-indigo-500/30 hover:scale-105 transition-all duration-200 px-2 py-1 text-[10px] md:text-xs"
                    >
                      Edit
                    </Button>
                    <Button 
                      size="xs" 
                      variant="secondary"
                      icon={TrashIcon}
                      onClick={() => handleDeletePackage(pkg.id)}
                      className="rounded-full bg-rose-500/20 text-rose-200 hover:bg-rose-500/30 border-rose-500/30 hover:scale-105 transition-all duration-200 px-2 py-1 text-[10px] md:text-xs"
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CreatePackageModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePackage}
      />
    </div>
  );
};

export default PackagesPage; 