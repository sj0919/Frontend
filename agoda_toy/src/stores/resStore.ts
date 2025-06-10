import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GuestInfo {
    guest_first: string;
    guest_last: string;
    guest_email: string;
    guest_phone: string;
    guest_request: string;
}

interface ResInfo extends GuestInfo {
    st_id: number;
    room_id: number;
    install_month: number;
    checkin_at: string;
    checkout_at: string;
}

interface ResStore {
    guestInfo: GuestInfo | null;
    resInfo: ResInfo | null;
    setGuestInfo: (info: GuestInfo) => void;
    setResInfo: (info: ResInfo) => void;
    resetResInfo: () => void;
}

export const useResStore = create(
    persist<ResStore>(
        (set) => ({
        guestInfo: null,
        resInfo: null,
        setGuestInfo: (info) => set({ guestInfo: info }),
        setResInfo: (info) => set({ resInfo: info }),
        resetResInfo: () => set({ resInfo: null, guestInfo: null }),
        }),
        {
        name: 'reservation-store',
        }
    )
);