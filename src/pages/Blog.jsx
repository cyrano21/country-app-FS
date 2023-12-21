// Importation des hooks et des composants nécessaires
import { useState, useEffect } from "react";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import axios from "axios";
import Article from "../components/Article";

// Définition du composant fonctionnel 'Blog'
const Blog = () => {
  // Utilisation du hook 'useState' pour créer une variable d'état 'content'
  // pour stocker le contenu de la zone de texte.
  // 'setContent' est la fonction pour mettre à jour cette variable.
  // L'état initial de 'content' est une chaîne de caractères vide.
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [blogData, setBlogData] = useState([]);
  const getData = () => {
    axios
      .get("http://localhost:3004/articles")
      .then((res) => setBlogData(res.data));
  };
  useEffect(() => getData(), []);

  // Création d'une variable d'état 'error' pour suivre si une erreur
  // (ici, si le texte est trop court) a été détectée.
  // 'setError' est la fonction pour mettre à jour cette variable.
  // L'état initial de 'error' est 'false' (aucune erreur).
  const [error, setError] = useState(false);

  // Définition du gestionnaire de l'événement 'onSubmit' du formulaire.
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire (rechargement de la page).

    // Vérifie la longueur du contenu. Si moins de 140 caractères, on considère cela comme une erreur.
    if (content.length < 140) {
      setError(true); // Mettre à jour 'error' à 'true' pour signaler une erreur.
    } else {
      axios.post("http://localhost:3004/articles", {
        author,
        content,
        date: Date.now(),
      });
      setError(false); // Sinon, réinitialiser 'error' à 'false'.
      setAuthor("");
      setContent("");
      getData();
      window.location.reload();
    }
  };

  // Rendu du composant 'Blog'
  return (
    <div className="blog-container">
      <Logo /> {/* Inclusion du composant 'Logo' */}
      <Navigation /> {/* Inclusion du composant 'Navigation' */}
      <h1>Blog</h1> {/* Titre du composant */}
      {/* Définition du formulaire */}
      <form onSubmit={handleSubmit}>
        {/* Champ de saisie de texte - pas utilisé de manière fonctionnelle ici */}
        <input
          type="text"
          placeholder="none"
          onChange={(e) => setAuthor(e.target.value)}
          value={author}
        />

        {/* Zone de texte pour la saisie du message */}
        {/* Utilisation de l'attribut 'style' pour changer la bordure en fonction de 'error' */}
        <textarea
          style={{ border: error ? "1px solid red" : "1px solid #61dafb" }}
          placeholder="Message"
          onChange={(e) => setContent(e.target.value)} // Mise à jour de 'content' à chaque saisie
          value={content}
        ></textarea>

        {/* Affichage conditionnel du message d'erreur */}
        {error && <p>Veillez écrire un minimum de 140 caractères</p>}

        {/* Bouton de soumission du formulaire */}
        <input type="submit" value="Envoyer" />
      </form>
      {/* Emplacement pour afficher une liste de messages ou autres contenus */}
      <ul>
        {blogData
          .sort((a, b) => b.date - a.date)
          .map((article) => (
            <Article key={article.id} article={article} />
          ))}
      </ul>
    </div>
  );
};

export default Blog;
