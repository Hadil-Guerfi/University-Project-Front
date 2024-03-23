export const getTitle = (path) => {
  switch (path) {
    case "/":
      return "Actualité";
    case "/emploi":
      return "Emploi de temps ";
    case "/avis":
      return "Avis";
    case "/note":
      return "Note";
    case "/groupe":
      return "Liste de groupe";
    case "/bibliotheque":
      return "Bibliothèque";
    case "/forms":
      return "Forms";
    case"/evenments":return"Evenments"
  }
};
