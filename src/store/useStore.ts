import { create } from 'zustand';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'caregiver' | 'elderly';
  avatar?: string;
}

export interface ElderlyProfile {
  id: string;
  name: string;
  age: number;
  avatar?: string;
  status: 'active' | 'inactive';
  lastActivity: string;
}

export interface ActivityLog {
  id: string;
  elderlyId: string;
  type: 'movement' | 'device' | 'medication' | 'meal';
  description: string;
  timestamp: string;
  isNormal: boolean;
}

export interface Medication {
  id: string;
  elderlyId: string;
  name: string;
  dosage: string;
  time: string;
  status: 'pending' | 'taken' | 'missed';
}

export interface Alert {
  id: string;
  elderlyId: string;
  type: 'no_movement' | 'missed_medication' | 'unusual_activity' | 'fall_detected';
  message: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  acknowledged: boolean;
}

interface AppState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  selectedElderlyId: string;
  elderlyProfiles: ElderlyProfile[];
  activityLogs: ActivityLog[];
  medications: Medication[];
  alerts: Alert[];
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string, role: 'caregiver' | 'elderly') => boolean;
  logout: () => void;
  setSelectedElderly: (id: string) => void;
  markMedicationTaken: (id: string) => void;
  acknowledgeAlert: (id: string) => void;
}

const mockElderly: ElderlyProfile[] = [
  { id: 'e1', name: 'Margaret Johnson', age: 78, status: 'active', lastActivity: '10 min ago' },
  { id: 'e2', name: 'Robert Smith', age: 82, status: 'inactive', lastActivity: '2 hrs ago' },
];

const mockActivities: ActivityLog[] = [
  { id: 'a1', elderlyId: 'e1', type: 'movement', description: 'Walked to kitchen', timestamp: '2026-04-12T08:30:00', isNormal: true },
  { id: 'a2', elderlyId: 'e1', type: 'device', description: 'Turned on TV in living room', timestamp: '2026-04-12T09:00:00', isNormal: true },
  { id: 'a3', elderlyId: 'e1', type: 'meal', description: 'Breakfast prepared', timestamp: '2026-04-12T08:45:00', isNormal: true },
  { id: 'a4', elderlyId: 'e1', type: 'movement', description: 'No movement detected for 90 min', timestamp: '2026-04-12T11:30:00', isNormal: false },
  { id: 'a5', elderlyId: 'e2', type: 'movement', description: 'Morning walk in garden', timestamp: '2026-04-12T07:00:00', isNormal: true },
  { id: 'a6', elderlyId: 'e2', type: 'device', description: 'Called daughter via Alexa', timestamp: '2026-04-12T10:15:00', isNormal: true },
];

const mockMedications: Medication[] = [
  { id: 'm1', elderlyId: 'e1', name: 'Lisinopril', dosage: '10mg', time: '08:00 AM', status: 'taken' },
  { id: 'm2', elderlyId: 'e1', name: 'Metformin', dosage: '500mg', time: '12:00 PM', status: 'pending' },
  { id: 'm3', elderlyId: 'e1', name: 'Aspirin', dosage: '81mg', time: '08:00 PM', status: 'pending' },
  { id: 'm4', elderlyId: 'e2', name: 'Amlodipine', dosage: '5mg', time: '09:00 AM', status: 'missed' },
  { id: 'm5', elderlyId: 'e2', name: 'Omeprazole', dosage: '20mg', time: '07:00 AM', status: 'taken' },
];

const mockAlerts: Alert[] = [
  { id: 'al1', elderlyId: 'e1', type: 'no_movement', message: 'No movement detected for 90 minutes in bedroom', severity: 'high', timestamp: '2026-04-12T11:30:00', acknowledged: false },
  { id: 'al2', elderlyId: 'e2', type: 'missed_medication', message: 'Amlodipine was not taken at 9:00 AM', severity: 'medium', timestamp: '2026-04-12T09:30:00', acknowledged: false },
  { id: 'al3', elderlyId: 'e1', type: 'unusual_activity', message: 'Front door opened at unusual hour (3:00 AM)', severity: 'high', timestamp: '2026-04-11T03:00:00', acknowledged: true },
  { id: 'al4', elderlyId: 'e2', type: 'no_movement', message: 'No movement for 2 hours in living room', severity: 'medium', timestamp: '2026-04-11T14:00:00', acknowledged: true },
];

export const useStore = create<AppState>((set) => ({
  user: null,
  isAuthenticated: false,
  selectedElderlyId: 'e1',
  elderlyProfiles: mockElderly,
  activityLogs: mockActivities,
  medications: mockMedications,
  alerts: mockAlerts,

  login: (email: string, _password: string) => {
    set({
      user: { id: 'u1', name: 'Sarah Thompson', email, role: 'caregiver' },
      isAuthenticated: true,
    });
    return true;
  },

  signup: (name: string, email: string, _password: string, role: 'caregiver' | 'elderly') => {
    set({
      user: { id: 'u1', name, email, role },
      isAuthenticated: true,
    });
    return true;
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },

  setSelectedElderly: (id: string) => {
    set({ selectedElderlyId: id });
  },

  markMedicationTaken: (id: string) => {
    set((state) => ({
      medications: state.medications.map((m) =>
        m.id === id ? { ...m, status: 'taken' as const } : m
      ),
    }));
  },

  acknowledgeAlert: (id: string) => {
    set((state) => ({
      alerts: state.alerts.map((a) =>
        a.id === id ? { ...a, acknowledged: true } : a
      ),
    }));
  },
}));
