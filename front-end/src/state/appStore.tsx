import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import type { Park } from "../types/park";

// ── AgeGroup ──────────────────────────────────────────────────────────────────
// Every page reads this to decide what content to show.
// child  = under 13   → grooming awareness, stranger danger
// teen   = 13–17      → sextortion, social media, scams
// adult  = 18–35      → phishing, malware, account security
// senior = 36+        → fraud, identity theft, password hygiene
export type AgeGroup = "child" | "teen" | "adult" | "senior";

export function deriveAgeGroup(age: number): AgeGroup {
  if (age < 13) return "child";
  if (age < 18) return "teen";
  if (age < 36) return "adult";
  return "senior";
}

// ── Types ─────────────────────────────────────────────────────────────────────
export type UserPreferences = {
  days?: number;
  pace?: "relaxed" | "balanced" | "packed";
};

type AppState = {
  savedPlaces: Park[];
  preferences: UserPreferences;
  age: number | null;
  ageGroup: AgeGroup | null;
};

type AppAction =
  | { type: "ADD_PLACE"; place: Park }
  | { type: "REMOVE_PLACE"; placeId: string }
  | { type: "CLEAR_SAVED_PLACES" }
  | { type: "MOVE_PLACE_UP"; placeId: string }
  | { type: "MOVE_PLACE_DOWN"; placeId: string }
  | { type: "SET_PREFERENCES"; preferences: Partial<UserPreferences> }
  | { type: "SET_AGE"; age: number };

// ── Load saved age from localStorage on startup ───────────────────────────────
function loadSavedAge(): { age: number | null; ageGroup: AgeGroup | null } {
  try {
    const raw = localStorage.getItem("safenet_age");
    if (raw) {
      const n = parseInt(raw, 10);
      if (!isNaN(n) && n >= 5 && n <= 110) {
        return { age: n, ageGroup: deriveAgeGroup(n) };
      }
    }
  } catch {
    // localStorage unavailable in some browsers — ignore
  }
  return { age: null, ageGroup: null };
}

const { age: savedAge, ageGroup: savedAgeGroup } = loadSavedAge();

const initialState: AppState = {
  savedPlaces: [],
  preferences: { pace: "balanced" },
  age: savedAge,
  ageGroup: savedAgeGroup,
};

// ── Reducer ───────────────────────────────────────────────────────────────────
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "ADD_PLACE": {
      const exists = state.savedPlaces.some((p) => p.id === action.place.id);
      if (exists) return state;
      return { ...state, savedPlaces: [...state.savedPlaces, action.place] };
    }
    case "REMOVE_PLACE":
      return { ...state, savedPlaces: state.savedPlaces.filter((p) => p.id !== action.placeId) };
    case "CLEAR_SAVED_PLACES":
      return { ...state, savedPlaces: [] };
    case "MOVE_PLACE_UP": {
      const i = state.savedPlaces.findIndex((p) => p.id === action.placeId);
      if (i <= 0) return state;
      const arr = [...state.savedPlaces];
      [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
      return { ...state, savedPlaces: arr };
    }
    case "MOVE_PLACE_DOWN": {
      const i = state.savedPlaces.findIndex((p) => p.id === action.placeId);
      if (i < 0 || i >= state.savedPlaces.length - 1) return state;
      const arr = [...state.savedPlaces];
      [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
      return { ...state, savedPlaces: arr };
    }
    case "SET_PREFERENCES":
      return { ...state, preferences: { ...state.preferences, ...action.preferences } };
    case "SET_AGE":
      return { ...state, age: action.age, ageGroup: deriveAgeGroup(action.age) };
    default:
      return state;
  }
}

// ── Context ───────────────────────────────────────────────────────────────────
type AppContextValue = {
  state: AppState;
  age: number | null;
  ageGroup: AgeGroup | null;
  setAge: (age: number) => void;
  addPlace: (place: Park) => void;
  removePlace: (placeId: string) => void;
  clearSavedPlaces: () => void;
  movePlaceUp: (placeId: string) => void;
  movePlaceDown: (placeId: string) => void;
  setPreferences: (preferences: Partial<UserPreferences>) => void;
  isSaved: (placeId: string) => boolean;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Persist age to localStorage whenever it changes
  useEffect(() => {
    if (state.age !== null) {
      localStorage.setItem("safenet_age", String(state.age));
    }
  }, [state.age]);

  const value = useMemo<AppContextValue>(() => ({
    state,
    age: state.age,
    ageGroup: state.ageGroup,
    setAge: (age) => dispatch({ type: "SET_AGE", age }),
    addPlace: (place) => dispatch({ type: "ADD_PLACE", place }),
    removePlace: (placeId) => dispatch({ type: "REMOVE_PLACE", placeId }),
    clearSavedPlaces: () => dispatch({ type: "CLEAR_SAVED_PLACES" }),
    movePlaceUp: (placeId) => dispatch({ type: "MOVE_PLACE_UP", placeId }),
    movePlaceDown: (placeId) => dispatch({ type: "MOVE_PLACE_DOWN", placeId }),
    setPreferences: (preferences) => dispatch({ type: "SET_PREFERENCES", preferences }),
    isSaved: (placeId) => state.savedPlaces.some((p) => p.id === placeId),
  }), [state]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppStore() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppStore must be used within AppProvider");
  return ctx;
}