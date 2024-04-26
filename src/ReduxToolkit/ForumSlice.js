
import {  createSlice } from "@reduxjs/toolkit";




const forumSlice = createSlice({
  name: "forum",
  initialState: {
    contenu: "",
    id_creator: "",
    image_forum: "",
    themes: [],
    titre: "",
    updatedAt: null,
    createdAt: null,
    _id: null,
    nbrReponse: 0,
    nomCreator: "",
    prenomCreator: "",
    avatarCreator: "",
  },
  reducers: {
    setSelectedForum: (state, action) => {
      const { selectedForum } = action.payload;
      return selectedForum;
    },
  },
});

export const { setSelectedForum } = forumSlice.actions;
export default forumSlice.reducer;
