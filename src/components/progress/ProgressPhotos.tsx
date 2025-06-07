import React, { useState } from 'react';
import { CameraIcon, XMarkIcon } from '@heroicons/react/24/outline';

export interface ProgressPhoto {
  id: string;
  date: Date;
  imageUrl: string;
  notes?: string;
  measurements?: {
    weight?: number;
    bodyFat?: number;
    chest?: number;
    waist?: number;
    hips?: number;
    arms?: number;
    thighs?: number;
  };
}

interface ProgressPhotosProps {
  photos: ProgressPhoto[];
  onAddPhoto: (photo: Omit<ProgressPhoto, 'id'>) => void;
  onDeletePhoto: (id: string) => void;
}

const ProgressPhotos: React.FC<ProgressPhotosProps> = ({
  photos,
  onAddPhoto,
  onDeletePhoto,
}) => {
  const [isAddingPhoto, setIsAddingPhoto] = useState(false);
  const [newPhoto, setNewPhoto] = useState<{
    imageUrl: string;
    notes: string;
    measurements: ProgressPhoto['measurements'];
  }>({
    imageUrl: '',
    notes: '',
    measurements: {},
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPhoto(prev => ({
          ...prev,
          imageUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddPhoto({
      ...newPhoto,
      date: new Date(),
    });
    setIsAddingPhoto(false);
    setNewPhoto({
      imageUrl: '',
      notes: '',
      measurements: {},
    });
  };

  const sortedPhotos = [...photos].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="bg-[#232B3B] rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Progress Photos</h2>
        <button
          onClick={() => setIsAddingPhoto(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <CameraIcon className="h-5 w-5" />
          Add Photo
        </button>
      </div>

      {isAddingPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#232B3B] rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Add Progress Photo</h3>
              <button
                onClick={() => setIsAddingPhoto(false)}
                className="text-gray-400 hover:text-white"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Photo
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    {newPhoto.imageUrl ? (
                      <img
                        src={newPhoto.imageUrl}
                        alt="Preview"
                        className="mx-auto h-32 w-32 object-cover rounded-lg"
                      />
                    ) : (
                      <CameraIcon className="mx-auto h-12 w-12 text-gray-400" />
                    )}
                    <div className="flex text-sm text-gray-400">
                      <label className="relative cursor-pointer bg-[#181F2A] rounded-md font-medium text-indigo-400 hover:text-indigo-300">
                        <span>Upload a photo</span>
                        <input
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Notes
                </label>
                <textarea
                  value={newPhoto.notes}
                  onChange={(e) =>
                    setNewPhoto(prev => ({ ...prev, notes: e.target.value }))
                  }
                  className="w-full px-3 py-2 bg-[#181F2A] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    value={newPhoto.measurements?.weight || ''}
                    onChange={(e) =>
                      setNewPhoto(prev => ({
                        ...prev,
                        measurements: {
                          ...prev.measurements,
                          weight: Number(e.target.value),
                        },
                      }))
                    }
                    className="w-full px-3 py-2 bg-[#181F2A] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Body Fat (%)
                  </label>
                  <input
                    type="number"
                    value={newPhoto.measurements?.bodyFat || ''}
                    onChange={(e) =>
                      setNewPhoto(prev => ({
                        ...prev,
                        measurements: {
                          ...prev.measurements,
                          bodyFat: Number(e.target.value),
                        },
                      }))
                    }
                    className="w-full px-3 py-2 bg-[#181F2A] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {['chest', 'waist', 'hips', 'arms', 'thighs'].map((measurement) => (
                  <div key={measurement}>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      {measurement.charAt(0).toUpperCase() + measurement.slice(1)} (cm)
                    </label>
                    <input
                      type="number"
                      value={newPhoto.measurements?.[measurement as keyof ProgressPhoto['measurements']] || ''}
                      onChange={(e) =>
                        setNewPhoto(prev => ({
                          ...prev,
                          measurements: {
                            ...prev.measurements,
                            [measurement]: Number(e.target.value),
                          },
                        }))
                      }
                      className="w-full px-3 py-2 bg-[#181F2A] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddingPhoto(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newPhoto.imageUrl}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedPhotos.map((photo) => (
          <div
            key={photo.id}
            className="bg-[#181F2A] rounded-lg overflow-hidden shadow-lg"
          >
            <div className="relative">
              <img
                src={photo.imageUrl}
                alt={`Progress photo from ${new Date(photo.date).toLocaleDateString()}`}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => onDeletePhoto(photo.id)}
                className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>
            
            <div className="p-4">
              <p className="text-sm text-gray-400 mb-2">
                {new Date(photo.date).toLocaleDateString()}
              </p>
              
              {photo.measurements && Object.keys(photo.measurements).length > 0 && (
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {Object.entries(photo.measurements).map(([key, value]) => (
                    value !== undefined && (
                      <div key={key}>
                        <span className="text-xs text-gray-400">
                          {key.charAt(0).toUpperCase() + key.slice(1)}:
                        </span>
                        <span className="text-sm text-white ml-1">
                          {value}
                          {key === 'weight' ? ' kg' : key === 'bodyFat' ? '%' : ' cm'}
                        </span>
                      </div>
                    )
                  ))}
                </div>
              )}
              
              {photo.notes && (
                <p className="text-sm text-gray-300">{photo.notes}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressPhotos; 