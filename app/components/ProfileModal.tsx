'use client';

import { ChildProfile } from '../hooks/useChildProfiles';
import { X } from 'lucide-react';

interface ProfileModalProps {
  profile: ChildProfile;
  onClose: () => void;
  onEdit: () => void;
}

export default function ProfileModal({ profile, onClose, onEdit }: ProfileModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-purple-800">{profile.name}'s Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-600">Age</h3>
            <p className="text-lg">{profile.age} years old</p>
          </div>

          {profile.gender && (
            <div>
              <h3 className="text-sm font-medium text-gray-600">Gender</h3>
              <p className="text-lg capitalize">{profile.gender}</p>
            </div>
          )}

          <div>
            <h3 className="text-sm font-medium text-gray-600">Reading Level</h3>
            <p className="text-lg capitalize">{profile.readingLevel?.replace('-', ' ')}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-600">Interests</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              {profile.interests.map(interest => (
                <span
                  key={interest}
                  className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {profile.freeFormInterests && (
            <div>
              <h3 className="text-sm font-medium text-gray-600">Other Interests</h3>
              <p className="text-lg">{profile.freeFormInterests}</p>
            </div>
          )}

          <div>
            <h3 className="text-sm font-medium text-gray-600">Profile Created</h3>
            <p className="text-lg">
              {new Date(profile.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <button
          onClick={onEdit}
          className="w-full mt-6 bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}