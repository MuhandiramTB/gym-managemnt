import { FC, useState } from 'react';
import { X, ChevronDown, Check, Star, Clock, Users, Dumbbell, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';

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
  initialData?: PackageData & { id: string } | null;
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

const CreatePackageModal: FC<CreatePackageModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const initialFormData: PackageData & { customFeature: string } = {
    name: '',
    description: '',
    price: 0,
    duration: 'Monthly' as const,
    features: [],
    customFeature: '',
    status: 'active'
  };
  
  const [formData, setFormData] = useState<PackageData & { customFeature: string }>(() => {
    if (initialData) {
      return {
        ...initialData,
        customFeature: ''
      };
    }
    return initialFormData;
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const resetForm = () => {
    if (window.confirm('Are you sure you want to reset all fields?')) {
      setFormData(initialData ? { ...initialData, customFeature: '' } : initialFormData);
      setCurrentStep(1);
      setErrors({});
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      if (!formData.name.trim()) {
        newErrors.name = 'Package name is required';
      }
      if (!formData.description.trim()) {
        newErrors.description = 'Description is required';
      }
    } else if (step === 2) {
      if (formData.price <= 0) {
        newErrors.price = 'Price must be greater than 0';
      }
    } else if (step === 3) {
      if (formData.features.length === 0) {
        newErrors.features = 'At least one feature must be selected';
      }
      if (formData.features.includes('Other') && !formData.customFeature.trim()) {
        newErrors.customFeature = 'Custom feature is required when "Other" is selected';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (!validateStep(3)) {
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
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 shadow-lg">
        <div className="relative">
          <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="flex items-center justify-between h-14">
              <div className="flex items-center">
                <button
                  onClick={onClose}
                  className="mr-4 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
                <h1 className="text-xl font-semibold text-white">
                  {initialData ? 'Edit Package' : 'Create New Package'}
                </h1>
              </div>
              <button
                onClick={resetForm}
                className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors flex items-center gap-2"
                title="Reset form"
              >
                <RotateCcw className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t-2 border-gray-200/50" />
          </div>
          <div className="relative flex justify-between">
            {[1, 2, 3].map((step) => (
              <button
                key={step}
                onClick={() => step < currentStep && setCurrentStep(step)}
                className={`flex items-center ${
                  step <= currentStep ? 'text-blue-600 cursor-pointer' : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                <div
                  className={`rounded-full transition-colors flex items-center justify-center w-7 h-7 ${
                    step <= currentStep 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white border-2 border-gray-300'
                  }`}
                >
                  {step}
                </div>
                <span className="ml-2 text-xs font-medium">
                  {step === 1 ? 'Basic Info' : step === 2 ? 'Pricing' : 'Features'}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-xl p-4">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Package Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter package name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className={`w-full px-3 py-2 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.name ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-400'
                  }`}
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="Enter package description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className={`w-full px-3 py-2 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                    errors.description ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-400'
                  }`}
                />
                {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
              </div>
            </div>
          )}

          {/* Step 2: Pricing */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
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
                    className={`w-full px-3 py-2 pr-16 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.price ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-400'
                    }`}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">
                    LKR
                  </div>
                </div>
                {formData.price > 0 && (
                  <p className="mt-1 text-xs text-green-600 font-medium">
                    {formatPriceLKR(formData.price)}
                  </p>
                )}
                {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Duration <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {DURATION_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, duration: option.value as PackageData['duration'] }))}
                      className={`flex items-center gap-2 p-2 rounded-lg border-2 transition-all ${
                        formData.duration === option.value
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <option.icon className={`h-4 w-4 ${
                        formData.duration === option.value ? 'text-blue-500' : 'text-gray-400'
                      }`} />
                      <span className="text-sm font-medium">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Features */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Features <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {FEATURE_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleFeatureToggle(option.value)}
                      className={`flex items-center gap-2 p-2 rounded-lg border-2 transition-all ${
                        formData.features.includes(option.value)
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                        formData.features.includes(option.value)
                          ? 'bg-blue-500 border-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {formData.features.includes(option.value) && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </div>
                      <option.icon className={`h-4 w-4 ${
                        formData.features.includes(option.value) ? 'text-blue-500' : 'text-gray-400'
                      }`} />
                      <span className="text-sm font-medium">{option.value}</span>
                    </button>
                  ))}
                </div>
                {errors.features && <p className="mt-1 text-xs text-red-500">{errors.features}</p>}
              </div>

              {formData.features.includes('Other') && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Custom Feature <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter custom feature"
                    value={formData.customFeature}
                    onChange={(e) => setFormData(prev => ({ ...prev, customFeature: e.target.value }))}
                    className={`w-full px-3 py-2 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.customFeature ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-400'
                    }`}
                  />
                  {errors.customFeature && <p className="mt-1 text-xs text-red-500">{errors.customFeature}</p>}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 inset-x-0 bg-white/80 backdrop-blur-sm border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <button
              type="button"
              onClick={currentStep === 1 ? onClose : handleBack}
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all font-medium text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              {currentStep === 1 ? 'Cancel' : 'Back'}
            </button>
            <button
              type="button"
              onClick={currentStep === 3 ? handleSubmit : handleNext}
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-lg hover:shadow-xl text-sm"
            >
              {currentStep === 3 ? (initialData ? 'Update Package' : 'Create Package') : 'Next'}
              {currentStep !== 3 && <ArrowRight className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePackageModal;