import React from "react";
import { Route, Routes } from "react-router";
import Actualite from "../actualite/Actualite";
import Emploi from "../emploi/Emploi";
import Evenement from "../evenement/Evenement";
import Avis from "../avis/Avis";
import Bibliotheque from "../bibliotheque/Bibliotheque";
import Forms from "../forms/Forms";
import Note from "../note/Note";
import ListeGroup from "../listeGroup/ListeGroup";
import PrivateRoutes from "../../components/privateRoutes/PrivateRoutes";

const AppRoute = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Actualite />}></Route>
        <Route path="/emploi" element={<Emploi />}></Route>
        <Route path="/evenments" element={<Evenement />}></Route>
        <Route path="/groupe" element={<ListeGroup />}></Route>
        <Route path="/note" element={<Note />}></Route>
        <Route path="/bibliotheque" element={<Bibliotheque />}></Route>
        <Route path="/forms" element={<Forms />}></Route>
        <Route path="/avis" element={<Avis />}></Route>
      </Route>
    </Routes>
  );
};

export default AppRoute;
