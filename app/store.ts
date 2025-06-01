import { create } from 'zustand';

type SessionUser = {
	name: string;
	email: string;
};

interface SessionState {
	user: SessionUser | null;
	setUser: (user: SessionUser) => void;
	clearUser: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
	user: null,
	setUser: (user) => set({ user }),
	clearUser: () => set({ user: null }),
}));