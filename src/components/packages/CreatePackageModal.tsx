import { FC, useState } from 'react';
import { X, ChevronDown, Check, Star, Clock, Users, Dumbbell } from 'lucide-react';

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
  { value: 'Access to gym equipment', icon: Dumbbell },
  { value: 'Locker room access', icon: Users },
  { value: 'Basic fitness assessment', icon: Star },
  { value: 'Pool access', icon: Users },
  { value: 'Spa access', icon: Star },
  { value: 'Personal trainer session', icon: Users },
  { value: 'Group classes', icon: Users },
  { value: 'Nutrition consultation', icon: Star },
  { value: 'Other', icon: Star },
];

const DURATION_OPTIONS = [
  { value: 'Daily', label: 'Daily', icon: Clock },
  { value: 'Weekly', label: 'Weekly', icon: Clock },
  { value: 'Monthly', label: 'Monthly', icon: Clock },
  { value: 'Quarterly', label: 'Quarterly (3 months)', icon: Clock },
  { value: 'Annually', label: 'Annually (12 months)', icon: Clock },
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
  const [isDurationOpen, setIsDurationOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);

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

  const handleSubmit = () => {
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

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature],
      ...(feature === 'Other' && !prev.features.includes(feature) ? {} : 
          feature === 'Other' ? { customFeature: '' } : {})
    }));
  };

  const formatPriceLKR = (price: number): string => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
        
        <div className="relative w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 px-6 py-6">
            <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />
            <div className="relative flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Create New Package</h2>
              <button
                onClick={onClose}
                className="rounded-full bg-white/20 p-2 text-white hover:bg-white/30 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="space-y-6 p-6">
            {/* Package Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Package Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter package name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-400'
                }`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Enter package description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                  errors.description ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-400'
                }`}
              />
              {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
            </div>

            {/* Price and Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="0"
                    value={formData.price || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                    min="0"
                    step="0.01"
                    className={`w-full px-4 py-3 pr-16 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.price ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-400'
                    }`}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">
                    LKR
                  </div>
                </div>
                {formData.price > 0 && (
                  <p className="mt-1 text-sm text-green-600 font-medium">
                    {formatPriceLKR(formData.price)}
                  </p>
                )}
                {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
              </div>

              {/* Duration Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Duration <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDurationOpen(!isDurationOpen)}
                    className="w-full px-4 py-3 text-left rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white hover:bg-gray-50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-900">
                          {DURATION_OPTIONS.find(opt => opt.value === formData.duration)?.label || 'Select duration'}
                        </span>
                      </div>
                      <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isDurationOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </button>
                  
                  {isDurationOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-auto">
                      {DURATION_OPTIONS.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({ ...prev, duration: option.value as PackageData['duration'] }));
                            setIsDurationOpen(false);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center gap-2 first:rounded-t-xl last:rounded-b-xl"
                        >
                          <option.icon className="h-4 w-4 text-blue-500" />
                          <span className="text-gray-900">{option.label}</span>
                          {formData.duration === option.value && (
                            <Check className="h-4 w-4 text-blue-500 ml-auto" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Features Multi-Select */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Features <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
                  className={`w-full px-4 py-3 text-left rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white hover:bg-gray-50 ${
                    errors.features ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900">
                      {formData.features.length > 0 
                        ? `${formData.features.length} feature${formData.features.length > 1 ? 's' : ''} selected`
                        : 'Select features'
                      }
                    </span>
                    <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isFeaturesOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                
                {isFeaturesOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-auto">
                    {FEATURE_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleFeatureToggle(option.value)}
                        className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center gap-3 first:rounded-t-xl last:rounded-b-xl"
                      >
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          formData.features.includes(option.value)
                            ? 'bg-blue-500 border-blue-500'
                            : 'border-gray-300'
                        }`}>
                          {formData.features.includes(option.value) && (
                            <Check className="h-3 w-3 text-white" />
                          )}
                        </div>
                        <option.icon className="h-4 w-4 text-blue-500" />
                        <span className="text-gray-900">{option.value}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {errors.features && <p className="mt-1 text-sm text-red-500">{errors.features}</p>}
              
              {/* Selected Features */}
              {formData.features.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {formData.features.map((feature) => (
                    <span
                      key={feature}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 border border-blue-200"
                    >
                      {feature}
                      <button
                        type="button"
                        onClick={() => handleFeatureToggle(feature)}
                        className="hover:text-blue-900 focus:outline-none"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              
              {/* Custom Feature Input */}
              {formData.features.includes('Other') && (
                <div className="mt-3">
                  <input
                    type="text"
                    placeholder="Enter custom feature"
                    value={formData.customFeature}
                    onChange={(e) => setFormData(prev => ({ ...prev, customFeature: e.target.value }))}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.customFeature ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-400'
                    }`}
                  />
                  {errors.customFeature && <p className="mt-1 text-sm text-red-500">{errors.customFeature}</p>}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 rounded-xl border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-lg hover:shadow-xl"
              >
                Create Package
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePackageModal;