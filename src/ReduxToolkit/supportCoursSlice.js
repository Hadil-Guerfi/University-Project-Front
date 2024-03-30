import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async action to fetch module data
export const fetchModules = createAsyncThunk(
  "modules/fetchModules",
  async ({ userId, semestre }) => {
    const response = await axios.get(
      "http://localhost:3001/api/support_cours/",
      { params: { userId, semestre } }
    );
    return response.data;
  }
);

// Slice to manage module data
const modulesSlice = createSlice({
  name: "modules",
  initialState: {
    listeMatieres: [],
    matieres: [], // Changed to an array
    selectedMatiere: "",
    status: "idle",
    error: null,
  },
  reducers: {
    setSelectedMatiere: (state, action) => {
      const { nomMatiere } = action.payload;
      return { ...state, selectedMatiere: nomMatiere };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchModules.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchModules.fulfilled, (state, action) => {
        state.status = "succeeded";

          // Clear previous matieres
          (state.matieres = []);
        action.payload?.data?.result.forEach((module) => {
          module.matieres.forEach((matiere) => {
            state.listeMatieres.push({
              nomMatiere: matiere.nomMatiere,
              nomModule: module.nomModule,
              types: matiere.types.map((type) => type.nomType),
            });
            state.matieres.push({
              // Pushing to the array instead of assigning by key
              nomMatiere: matiere.nomMatiere,
              fichiers: [],
            });
            matiere.types.forEach((type) => {
              type.supports.forEach((support) => {
                // Find the index of the current matiere in the array
                const matiereIndex = state.matieres.findIndex(
                  (m) => m.nomMatiere === matiere.nomMatiere
                );
                // Push fichier to the appropriate matiere
                state.matieres[matiereIndex].fichiers.push({
                  nomFichier: support.titre_fichier,
                  fichier: support.fichier,
                  type: type.nomType,
                  nomEnseignant: support.nomEnseignant,
                  avatarEnseignant: support.avatarEnseignant,
                });
              });
            });
          });
        });


        (state.selectedMatiere = state.listeMatieres[0]?.nomMatiere)



      })
      .addCase(fetchModules.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSelectedMatiere } = modulesSlice.actions;
export default modulesSlice.reducer;
