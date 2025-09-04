'use client';

import { WaiverFormData } from '@/app/(home)/waiver/[id]/waiver-validation';
import { WaiverData } from '@/lib/actions/waiver/waiver-types';
import { create } from 'zustand';

interface WaiverState {
  // user: { id: string; name: string } | null;
  // isAuthenticated: boolean;
  // login: (user: { id: string; name: string }) => void;
  // logout: () => void;
  currentStoreWaiver: WaiverData | null;
  allWaivers: Array<WaiverData> | [];
  proponents: WaiverFormData | null;
  setCurrentStoreWaiver: (waiver: WaiverData | null) => void;
  setProponents: (proponents: WaiverFormData | null) => void; // TODO: maybe move proponents to inside WaiverData
  setAllWaivers: (waivers: Array<WaiverData> ) => void;
}

export const useWaiverStore = create<WaiverState>((set) => ({
  currentStoreWaiver: null,
  proponents: null,
  allWaivers: [],
  setCurrentStoreWaiver: (currentStoreWaiver: WaiverData| null) => set({ currentStoreWaiver }),
  setProponents: (proponents: WaiverFormData | null) => set({ proponents }),
  setAllWaivers: (allWaivers: Array<WaiverData>) => set({ allWaivers }),
  // user: null,
  // isAuthenticated: false,
  // login: (user) => set({ user, isAuthenticated: true }),
  // logout: () => set({ user: null, isAuthenticated: false }),
}));