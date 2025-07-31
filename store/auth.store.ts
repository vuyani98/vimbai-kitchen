import { DbUser } from '@/type';
import { getCurrentUser } from '@/lib/appwrite';
import { create } from 'zustand';

type AuthState = {
    isAuthenticated: boolean;
    user: DbUser | null;
    isLoading: boolean;
    setUser: (user: DbUser | null) => void;
    setIsAuthenticated: (value: boolean) => void;
    setIsLoading: (loading : boolean) => void

    fetchAuthenticatedUser: () => Promise<void>;

}

const useAuthStore = create<AuthState>((set) => ({

    isAuthenticated: false,
    user: null,
    isLoading: true,
    setUser: (user) => set({user}),
    setIsAuthenticated: (value) => set({ isAuthenticated: value}),
    setIsLoading: (value) => set({ isLoading : value}),

    fetchAuthenticatedUser: async() => {

        set({ isLoading: true });
        try {
            console.log('Trying to fetch authed user')

            const user = await getCurrentUser();


            if (user) {
                console.log('User is: ', user)
                set({ isAuthenticated: true, user: user as DbUser});
            }

            else {
                console.log('No user found')
                set({ isAuthenticated: false, user: null})
            }
        }

        catch(error) {
            console.error('Error fetching authenticated user:', error);
            set({ isAuthenticated: false, user: null})
        }

        finally {
            set({ isLoading: false})
        }
    }



}))

export default useAuthStore;