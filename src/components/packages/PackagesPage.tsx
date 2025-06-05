import { FC, useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
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
      id: Math.random().toString(36).substr(2, 9), // Generate a random ID
    };
    setPackages(prev => [...prev, newPackage]);
  };

  const handleDeletePackage = (id: string) => {
    setPackages(prev => prev.filter(pkg => pkg.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Title>Gym Packages</Title>
          <Text>Manage and create custom packages for your members</Text>
        </div>
        <Button
          icon={PlusIcon}
          onClick={() => setIsCreateModalOpen(true)}
          size="lg"
        >
          Create Package
        </Button>
      </div>

      <Card>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Package Name</TableHeaderCell>
              <TableHeaderCell>Description</TableHeaderCell>
              <TableHeaderCell>Price</TableHeaderCell>
              <TableHeaderCell>Duration</TableHeaderCell>
              <TableHeaderCell>Features</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packages.map((pkg) => (
              <TableRow key={pkg.id}>
                <TableCell>{pkg.name}</TableCell>
                <TableCell>{pkg.description}</TableCell>
                <TableCell>${pkg.price}</TableCell>
                <TableCell>{pkg.duration}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {pkg.features.map((feature, index) => (
                      <Badge key={index} color="blue" size="sm">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    color={pkg.status === 'active' ? 'green' : 'red'}
                    size="sm"
                  >
                    {pkg.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="xs" variant="secondary">
                      Edit
                    </Button>
                    <Button 
                      size="xs" 
                      variant="secondary" 
                      color="red"
                      onClick={() => handleDeletePackage(pkg.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <CreatePackageModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePackage}
      />
    </div>
  );
};

export default PackagesPage; 