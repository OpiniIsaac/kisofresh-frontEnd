// types/auth.ts
export interface User {
    uid: string;
    email: string | null;  // Allow email to be null
    // Add other properties if necessary
  }
  
  
  export interface AuthState {
    user: User | null;
  }
  
  export interface RootState {
    auth: AuthState;
    // Add other slices of state if needed
  }
  