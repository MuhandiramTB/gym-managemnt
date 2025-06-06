import { FC, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { TextInput, Textarea, NumberInput, Select, SelectItem, Button, MultiSelect, MultiSelectItem } from '@tremor/react';

interface PackageData {
  name: string;
  description: string;
  price: number;
  duration: 'Daily' | 'Weekly' | 'Monthly' | 'Quarterly' | 'Annually';
  features: string[];
  status: 'active' | 'inactive';
}

interface CreatePackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (packageData: PackageData) => void;
}

const FEATURE_OPTIONS = [
  'Access to gym equipment',
  'Locker room access',
  'Basic fitness assessment',
  'Pool access',
  'Spa access',
  'Personal trainer session',
  'Group classes',
  'Nutrition consultation',
  'Other',
];

const CreatePackageModal: FC<CreatePackageModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<PackageData & { customFeature: string }>({
    name: '',
    description: '',
    price: 0,
    duration: 'Monthly',
    features: [],
    customFeature: '',
    status: 'active'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Package name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }
    
    if (formData.features.length === 0) {
      newErrors.features = 'At least one feature must be selected';
    }
    
    if (formData.features.includes('Other') && !formData.customFeature.trim()) {
      newErrors.customFeature = 'Custom feature is required when "Other" is selected';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    let features = formData.features;
    if (features.includes('Other') && formData.customFeature.trim()) {
      features = features.filter(f => f !== 'Other').concat(formData.customFeature.trim());
    }
    
    const { customFeature, ...packageData } = formData;
    onSubmit({ ...packageData, features });
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl w-full rounded-3xl bg-white/80 backdrop-blur-lg shadow-2xl border border-white/30">
          <div className="flex justify-between items-center mb-6 px-2 pt-2 pb-4 rounded-t-3xl bg-gradient-to-r from-indigo-500/80 to-purple-500/80">
            <Dialog.Title className="text-xl font-bold text-white tracking-tight">Create New Package</Dialog.Title>
            <button onClick={onClose} className="rounded-full p-1.5 bg-white/20 hover:bg-white/40 transition-colors text-white focus:outline-none focus:ring-2 focus:ring-indigo-400">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 px-2 pb-2">
            <div>
              <label className="block text-xs font-bold text-indigo-700 mb-1">Package Name <span className="text-rose-500">*</span></label>
              <TextInput
                placeholder="Enter package name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className={`rounded-xl focus:ring-2 focus:ring-indigo-400 border ${errors.name ? 'border-rose-500' : 'border-indigo-200'} focus:border-indigo-400 transition-all`}
              />
              {errors.name && <p className="mt-1 text-xs text-rose-500">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-indigo-700 mb-1">Description <span className="text-rose-500">*</span></label>
              <Textarea
                placeholder="Enter package description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className={`rounded-xl focus:ring-2 focus:ring-indigo-400 border ${errors.description ? 'border-rose-500' : 'border-indigo-200'} focus:border-indigo-400 transition-all`}
              />
              {errors.description && <p className="mt-1 text-xs text-rose-500">{errors.description}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-indigo-700 mb-1">Price <span className="text-rose-500">*</span></label>
                <NumberInput
                  placeholder="Enter price"
                  value={formData.price}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, price: value }))}
                  min={0}
                  className={`rounded-xl focus:ring-2 focus:ring-indigo-400 border ${errors.price ? 'border-rose-500' : 'border-indigo-200'} focus:border-indigo-400 transition-all`}
                />
                {errors.price && <p className="mt-1 text-xs text-rose-500">{errors.price}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-indigo-700 mb-1">Duration <span className="text-rose-500">*</span></label>
                <Select
                  value={formData.duration}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, duration: value as PackageData['duration'] }))}
                  className="rounded-xl focus:ring-2 focus:ring-indigo-400 border border-indigo-200 focus:border-indigo-400 transition-all"
                  placeholder="Select duration"
                  enableClear={false}
                  icon={ChevronDownIcon}
                >
                  <SelectItem value="Daily" className="hover:bg-indigo-50 cursor-pointer">Daily</SelectItem>
                  <SelectItem value="Weekly" className="hover:bg-indigo-50 cursor-pointer">Weekly</SelectItem>
                  <SelectItem value="Monthly" className="hover:bg-indigo-50 cursor-pointer">Monthly</SelectItem>
                  <SelectItem value="Quarterly" className="hover:bg-indigo-50 cursor-pointer">Quarterly</SelectItem>
                  <SelectItem value="Annually" className="hover:bg-indigo-50 cursor-pointer">Annually</SelectItem>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-indigo-700 mb-2">Features <span className="text-rose-500">*</span></label>
              <div className="relative">
                <MultiSelect
                  value={formData.features}
                  onValueChange={(values) => setFormData(prev => ({ ...prev, features: values }))}
                  className={`rounded-xl focus:ring-2 focus:ring-indigo-400 border ${errors.features ? 'border-rose-500' : 'border-indigo-200'} focus:border-indigo-400 transition-all`}
                  placeholder="Select features"
                  icon={ChevronDownIcon}
                >
                  {FEATURE_OPTIONS.map((option) => (
                    <MultiSelectItem 
                      key={option} 
                      value={option}
                      className="hover:bg-indigo-50 cursor-pointer flex items-center gap-2 py-2 px-3"
                    >
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {option}
                      </div>
                    </MultiSelectItem>
                  ))}
                </MultiSelect>
                {formData.features.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, features: [] }))}
                    className="absolute right-10 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 focus:outline-none"
                    title="Clear all features"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                )}
              </div>
              {errors.features && <p className="mt-1 text-xs text-rose-500">{errors.features}</p>}
              {formData.features.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.features.map((feature) => (
                    <span
                      key={feature}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-700"
                    >
                      {feature}
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          features: prev.features.filter(f => f !== feature)
                        }))}
                        className="hover:text-indigo-900 focus:outline-none"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              {formData.features.includes('Other') && (
                <div className="mt-2">
                  <TextInput
                    placeholder="Enter custom feature"
                    value={formData.customFeature}
                    onChange={(e) => setFormData(prev => ({ ...prev, customFeature: e.target.value }))}
                    className={`rounded-xl focus:ring-2 focus:ring-indigo-400 border ${errors.customFeature ? 'border-rose-500' : 'border-indigo-200'} focus:border-indigo-400 transition-all`}
                  />
                  {errors.customFeature && <p className="mt-1 text-xs text-rose-500">{errors.customFeature}</p>}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="secondary" onClick={onClose} className="rounded-full px-4 py-2 text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all">
                Cancel
              </Button>
              <Button type="submit" className="rounded-full px-4 py-2 text-sm bg-indigo-600 text-white hover:bg-indigo-700 transition-all">
                Create Package
              </Button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default CreatePackageModal; 