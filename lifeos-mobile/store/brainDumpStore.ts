import { create } from 'zustand';

interface BrainDumpState {
  hasEmptiedToday: boolean;
  setHasEmptiedToday: (value: boolean) => void;
  parsedTasks: any[];
  parsedHabits: any[];
  parsedGoals: any[];
  setParsedOutput: (output: { tasks?: any[]; habits?: any[]; goals?: any[] }) => void;
  clearParsedOutput: () => void;
}

export const useBrainDumpStore = create<BrainDumpState>((set) => ({
  hasEmptiedToday: false,
  setHasEmptiedToday: (value) => set({ hasEmptiedToday: value }),
  parsedTasks: [],
  parsedHabits: [],
  parsedGoals: [],
  setParsedOutput: (output) =>
    set({
      parsedTasks: output.tasks || [],
      parsedHabits: output.habits || [],
      parsedGoals: output.goals || [],
    }),
  clearParsedOutput: () => set({ parsedTasks: [], parsedHabits: [], parsedGoals: [] }),
}));
