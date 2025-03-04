# Choix de modelisation

Les models "Movie" et "Actor" ont une relation Many to Many, un filme peut contenir plusieurs acteur et un acteur peut joué dans plusieurs filmes. 
Un "Movie" peut avoir plusieurs "Rating" ici c'est une relation One to Many. 
"Rating" et "Actor" sont directement inclus dans "Movie" pour limité le nombre de requete


