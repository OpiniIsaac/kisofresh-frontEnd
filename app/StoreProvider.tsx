'use client';
import { useRef, useEffect } from 'react';
import { Provider } from 'react-redux';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { makeStore, AppStore } from '../lib/store';
import { setUser } from '../lib/features/accountHandle/authSlice';
import { auth } from './firebase/config';
import { User } from '@/types/auth';


const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    const store = storeRef.current;
    if (store) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // Transform FirebaseUser to your User type
          const transformedUser: User = {
            uid: user.uid,
            email: user.email,
            // Add other properties if necessary
          };
          store.dispatch(setUser(transformedUser));
        } else {
          store.dispatch(setUser(null));
        }
      });

      return () => unsubscribe();
    }
  }, []);

  return <Provider store={storeRef.current!}>{children}</Provider>;
};

export default StoreProvider;
