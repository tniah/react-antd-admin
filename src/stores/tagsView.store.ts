import { history } from '@/constants/history';
import type { TagsViewState, TagItem } from '@/interfaces/tagsView.interface';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState: TagsViewState = {
  activeTagId: location.pathname,
  tags: [],
}

const tagsViewSlice = createSlice({
  name: 'tagsView',
  initialState,
  reducers: {
    setActiveTag(state, action: PayloadAction<string>) {
      state.activeTagId = action.payload;
      history.push(state.activeTagId);
    },
    addTag(state, action: PayloadAction<TagItem>) {
      if (!state.tags.find(tag => tag.path === action.payload.path)) {
        state.tags.push(action.payload);
      }
      state.activeTagId = action.payload.path;
    },
    removeTag(state, action: PayloadAction<string>) {
      const tagCode = action.payload;
      if (tagCode === state.tags[0].path) {
        return;
      }

      const activeTagId = state.activeTagId;
      let lastIndex = 0;

      state.tags.forEach((tag, i) => {
        if (tag.path === tagCode) {
          state.tags.splice(i, 1);
          lastIndex = i - 1;
        }
      });

      const tagList = state.tags.filter(tag => tag.path !== tagCode);
      if (tagList.length && activeTagId === tagCode) {
        if (lastIndex >= 0) {
          state.activeTagId = tagList[lastIndex].path;
        } else {
          state.activeTagId = tagList[0].path;
        }
      }

      history.push(state.activeTagId);
    },
  },
});

export const { setActiveTag, addTag, removeTag } = tagsViewSlice.actions;
export default tagsViewSlice.reducer;