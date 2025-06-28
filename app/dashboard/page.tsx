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
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-rose-50 flex items-center justify-center">
        <div className="text-teal-600 font-medium animate-pulse">Loading...</div>
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
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-rose-50">
      <div className="container mx-auto px-4 py-8">
        <div className="card-elevated p-8 animate-fadeIn">
          <div className="flex justify-between items-center mb-8">
            <Logo />
            <div className="text-sm text-gray-500 font-medium">
              Logged in as: {user.email}
            </div>
          </div>

          {!showForm && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Children Profiles</h2>
                <button
                  onClick={() => {
                    setEditingProfile(null);
                    setShowForm(true);
                  }}
                  className="btn btn-primary flex items-center gap-2"
                >
                  <Plus size={20} />
                  Add Child
                </button>
              </div>

              {profiles.length === 0 ? (
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-12 text-center bg-gray-50/50">
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
                    <div key={profile.id} className="card p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{profile.name}</h3>
                      <p className="text-sm text-gray-600">Age: {profile.age}</p>
                      <p className="text-sm text-gray-600 mb-2">Reading: {profile.readingLevel?.replace('-', ' ')}</p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {profile.interests.slice(0, 3).map(interest => (
                          <span key={interest} className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full font-medium">
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
                          className="flex-1 flex items-center justify-center gap-1 bg-blue-50 text-blue-600 py-1.5 px-2 rounded-lg hover:bg-blue-100 transition-all duration-200 font-medium text-sm"
                        >
                          <Eye size={16} />
                          View
                        </button>
                        <button
                          onClick={() => handleEdit(profile)}
                          className="flex-1 flex items-center justify-center gap-1 bg-emerald-50 text-emerald-600 py-1.5 px-2 rounded-lg hover:bg-emerald-100 transition-all duration-200 font-medium text-sm"
                        >
                          <Edit2 size={16} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(profile.id)}
                          className="flex-1 flex items-center justify-center gap-1 bg-red-50 text-red-600 py-1.5 px-2 rounded-lg hover:bg-red-100 transition-all duration-200 font-medium text-sm"
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
                <Link href="/" className="text-teal-600 hover:text-teal-700 font-medium transition-colors">
                  ← Back to Home
                </Link>
                <button 
                  onClick={async () => {
                    await fetch('/api/auth/logout', { method: 'POST' });
                    window.location.href = '/login';
                  }}
                  className="text-gray-500 hover:text-gray-700 font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          )}

          {showForm && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
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