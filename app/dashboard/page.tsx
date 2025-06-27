'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useChildProfiles, ChildProfile } from '../hooks/useChildProfiles';
import ChildProfileForm from '../components/ChildProfileForm';
import ProfileModal from '../components/ProfileModal';
import { Eye, Edit2, Trash2, Plus } from 'lucide-react';
import Logo from '../components/Logo';

interface User {
  email: string;
  loginAt: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProfile, setEditingProfile] = useState<ChildProfile | null>(null);
  const [viewingProfile, setViewingProfile] = useState<ChildProfile | null>(null);
  const router = useRouter();

  const { profiles, addProfile, updateProfile, deleteProfile } = useChildProfiles(
    user?.email || ''
  );

  useEffect(() => {
    fetch('/api/auth/session')
      .then(res => res.json())
      .then(data => {
        if (!data.user) {
          router.push('/login');
        } else {
          setUser(data.user);
          setLoading(false);
        }
      });
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
        <div className="text-purple-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleSubmitProfile = (profile: Omit<ChildProfile, 'id' | 'createdAt' | 'parentEmail'>) => {
    if (editingProfile) {
      updateProfile(editingProfile.id, profile);
      setEditingProfile(null);
    } else {
      addProfile(profile);
    }
    setShowForm(false);
  };

  const handleEdit = (profile: ChildProfile) => {
    setEditingProfile(profile);
    setShowForm(true);
    setViewingProfile(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this profile?')) {
      deleteProfile(id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <Logo />
            <div className="text-sm text-gray-600">
              Logged in as: {user.email}
            </div>
          </div>

          {!showForm && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Children Profiles</h2>
                <button
                  onClick={() => {
                    setEditingProfile(null);
                    setShowForm(true);
                  }}
                  className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  <Plus size={20} />
                  Add Child
                </button>
              </div>

              {profiles.length === 0 ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    No Children Profiles Yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Create profiles for your children to start generating personalized stories
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {profiles.map(profile => (
                    <div key={profile.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{profile.name}</h3>
                      <p className="text-sm text-gray-600">Age: {profile.age}</p>
                      <p className="text-sm text-gray-600 mb-2">Reading: {profile.readingLevel?.replace('-', ' ')}</p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {profile.interests.slice(0, 3).map(interest => (
                          <span key={interest} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                            {interest}
                          </span>
                        ))}
                        {profile.interests.length > 3 && (
                          <span className="text-xs text-gray-500">+{profile.interests.length - 3} more</span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setViewingProfile(profile)}
                          className="flex-1 flex items-center justify-center gap-1 bg-blue-100 text-blue-700 py-1 px-2 rounded hover:bg-blue-200 transition-colors"
                        >
                          <Eye size={16} />
                          View
                        </button>
                        <button
                          onClick={() => handleEdit(profile)}
                          className="flex-1 flex items-center justify-center gap-1 bg-green-100 text-green-700 py-1 px-2 rounded hover:bg-green-200 transition-colors"
                        >
                          <Edit2 size={16} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(profile.id)}
                          className="flex-1 flex items-center justify-center gap-1 bg-red-100 text-red-700 py-1 px-2 rounded hover:bg-red-200 transition-colors"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-between items-center pt-6 border-t">
                <Link href="/" className="text-purple-600 hover:text-purple-800 font-medium">
                  ← Back to Home
                </Link>
                <button 
                  onClick={async () => {
                    await fetch('/api/auth/logout', { method: 'POST' });
                    window.location.href = '/login';
                  }}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Logout
                </button>
              </div>
            </div>
          )}

          {showForm && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                {editingProfile ? 'Edit Child Profile' : 'Create Child Profile'}
              </h2>
              <ChildProfileForm
                onSubmit={handleSubmitProfile}
                onCancel={() => {
                  setShowForm(false);
                  setEditingProfile(null);
                }}
                editingProfile={editingProfile || undefined}
              />
            </div>
          )}
        </div>
      </div>

      {viewingProfile && (
        <ProfileModal
          profile={viewingProfile}
          onClose={() => setViewingProfile(null)}
          onEdit={() => handleEdit(viewingProfile)}
        />
      )}
    </div>
  );
}