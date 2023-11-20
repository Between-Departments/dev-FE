import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PostSearchStateInterface {
  keyword: string;
  keywordHistory: string[] | [];
  showKeywordHistory: boolean;
}
interface PostSearchActionsInterface {
  setKeyword: (newKeyword: string) => void;
  setKeywordHistory: (newKeyword: string) => void;
  deleteKeywordHistoryAll: () => void;
  deleteKeywordHistory: (deleteKeyword: string) => void;
  setShowKeywordHistory: (showKeywordHistory: boolean) => void;
}

const usePostSearchStore = create(
  persist<PostSearchStateInterface & PostSearchActionsInterface>(
    (set) => ({
      keyword: '',
      keywordHistory: [],
      setKeyword: (newKeyword) => set(() => ({ keyword: newKeyword })),
      setKeywordHistory: (newKeyword) =>
        set((state) => ({
          keywordHistory: [
            newKeyword,
            ...state.keywordHistory.filter((keyword) => keyword !== newKeyword),
          ],
        })),
      deleteKeywordHistoryAll: () =>
        set(() => ({
          keywordHistory: [],
        })),
      deleteKeywordHistory: (deleteKeyword) =>
        set((state) => ({
          keywordHistory: [...state.keywordHistory.filter((keyword) => keyword !== deleteKeyword)],
        })),
      showKeywordHistory: true,
      setShowKeywordHistory: (showKeywordHistory) => set(() => ({ showKeywordHistory })),
    }),
    {
      name: 'post-search',
    },
  ),
);

export default usePostSearchStore;
