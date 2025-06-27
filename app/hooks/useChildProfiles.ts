'use client';

import { useState, useEffect } from 'react';

export interface ChildProfile {
  id: string;
  name: string;
  age: number;
  gender: 'boy' | 'girl' | 'other';
  interests: string[];
  createdAt: string;
  parentEmail: string;
}

export function useChildProfiles(parentEmail: string) {
  const [profiles, setProfiles] = useState<ChildProfile[]>([]);
  const storageKey = `child-profiles-${parentEmail}`;

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setProfiles(JSON.parse(stored));
    }
  }, [storageKey]);

  const saveProfiles = (newProfiles: ChildProfile[]) => {
    localStorage.setItem(storageKey, JSON.stringify(newProfiles));
    setProfiles(newProfiles);
  };

  const addProfile = (profile: Omit<ChildProfile, 'id' | 'createdAt' | 'parentEmail'>) => {
    const newProfile: ChildProfile = {
      ...profile,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      parentEmail
    };
    saveProfiles([...profiles, newProfile]);
    return newProfile;
  };

  const updateProfile = (id: string, updates: Partial<ChildProfile>) => {
    const updated = profiles.map(p => 
      p.id === id ? { ...p, ...updates } : p
    );
    saveProfiles(updated);
  };

  const deleteProfile = (id: string) => {
    saveProfiles(profiles.filter(p => p.id !== id));
  };

  return {
    profiles,
    addProfile,
    updateProfile,
    deleteProfile
  };
}