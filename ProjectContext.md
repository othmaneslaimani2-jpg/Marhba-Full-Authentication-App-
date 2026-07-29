Project context
Jusqu'ici, vous avez construit des API d'un côté et des applications mobiles de l'autre. Il est temps de connecter les deux mondes.

Marhba ( "bienvenue") est une application mobile minimaliste : un utilisateur crée un compte, se connecte, et accède à un écran d'accueil personnalisé qui lui souhaite la bienvenue. Rien de plus. Toute la valeur pédagogique du projet est dans le circuit d'authentification complet, du formulaire mobile jusqu'à la base de données PostgreSQL — et surtout dans la double protection des routes : côté backend avec des middlewares, côté frontend avec <Stack.Protected>.

💡 Règle d'or du projet : un écran protégé côté frontend ne suffit JAMAIS. Si votre API n'est pas protégée par un middleware, n'importe qui peut lire vos données avec Postman. La sécurité se fait toujours des deux côtés.
Objectifs pédagogiques
À la fin de ce projet, vous serez capable de :

Construire une API d'authentification avec Express \+ PostgreSQL (inscription, connexion, profil)
Hasher les mots de passe avec bcrypt (jamais de mot de passe en clair en base)
Générer et vérifier des JWT (jsonwebtoken)
Écrire et chaîner des middlewares Express : logger, validation, vérification du token, gestion d'erreurs
Consommer l'API depuis Expo avec Axios (instance configurée \+ intercepteur)
Stocker le token de façon sécurisée avec AsyncStorage
Protéger les écrans avec `<Stack.Protected>` d'Expo Router (guard basé sur l'état d'authentification)
Gérer un état global d'authentification avec Zustand
Stack technique
| Backend | Node.js, Express, PostgreSQL, Sequelize, bcrypt, jsonwebtoken, dotenv |

| Frontend | Expo, Expo Router, Axios, Zustand, expo-secure-store |

| Outils | Postman (tests API), Git/GitHub, Jira |

Partie 1 — Backend (Jours 1–2)
Modèle de données
Une seule table users :

| id | INTEGER | PK, auto-increment |

| fullName | STRING | NOT NULL |

| email | STRING | NOT NULL, UNIQUE |

| password | STRING | NOT NULL (hashé avec bcrypt) |

| createdAt / updatedAt | DATE | gérés par Sequelize |

Endpoints à implémenter
| POST | /api/auth/register | Publique | Inscription (hash du mot de passe, retourne un JWT) |

| POST | /api/auth/login | Publique | Connexion (vérifie le hash, retourne un JWT) |

| GET | /api/auth/me | 🔒 Middleware authenticate | Retourne les infos de l'utilisateur connecté (sans le mot de passe) |

Middlewares obligatoires (le cœur du projet)
`logger` — global, affiche méthode \+ URL \+ timestamp de chaque requête
`validateRegister` / `validateLogin` — vérifient les champs avant le controller (email valide, mot de passe ≥ 6 caractères, champs requis présents). En cas d'erreur → 400 avec un message clair
`authenticate` — lit le header Authorization: Bearer <token>, vérifie le JWT, attache req.user, sinon → 401
`errorHandler` — middleware d'erreur global (4 paramètres), placé en dernier, retourne un JSON propre { error: "..." }
⚠️ Interdit : vérifier le token directement dans le controller. La vérification vit dans le middleware, le controller ne fait que la logique métier.
Règles de sécurité
Le mot de passe est hashé avec bcrypt.hash() (salt rounds : 10\)
Le mot de passe hashé n'apparaît jamais dans les réponses JSON
Le secret JWT vit dans .env (et .env est dans .gitignore)
Le JWT expire (ex. expiresIn: "7d")
Message d'erreur identique pour "email inexistant" et "mauvais mot de passe" : "Email ou mot de passe incorrect" (ne pas révéler lequel est faux)
Partie 2 — Frontend (Jours 3–4)
Écrans
| Connexion | /(auth)/login | Public (uniquement si NON connecté) |

| Inscription | /(auth)/register | Public (uniquement si NON connecté) |

| Accueil | /(app)/home | 🔒 Connecté uniquement |

L'écran Accueil affiche : "Marhba, {fullName} 👋" (données récupérées via GET /api/auth/me) \+ un bouton Déconnexion.

Protection des routes avec `<Stack.Protected>`
Dans le layout racine, les groupes de routes sont gardés par l'état d'authentification :

Comportement attendu :

Utilisateur non connecté qui tente d'accéder à /home → redirigé vers /login
Utilisateur connecté qui tente d'accéder à /login → redirigé vers /home
Après login/register réussi → redirection automatique vers Accueil (le guard change, Expo Router redirige)
Après déconnexion → retour automatique à l'écran de connexion
Axios : instance \+ intercepteur
Créer une instance Axios (services/api.js) avec baseURL
Ajouter un intercepteur de requête qui attache automatiquement le token : Authorization: Bearer <token> — aucun appel API ne doit ajouter le header manuellement
État d'authentification (Zustand)
Un store useAuthStore avec : user, token, isAuthenticated, isLoading, et les actions register(), login(), logout(), restoreSession().

Persistance de session
Le token est stocké dans expo-secure-store (jamais AsyncStorage pour un token)
Au lancement de l'app, restoreSession() lit le token, appelle /api/auth/me pour le valider, puis met à jour le store
Pendant cette vérification → écran de chargement (splash/spinner), pas de "flash" de l'écran de login
Contraintes techniques
Architecture backend en MVC : routes/, controllers/, middlewares/, models/, config/
sequelize.sync() acceptable pour ce projet (niveau facile) — les migrations viendront plus tard
Gestion des erreurs côté frontend : afficher le message d'erreur de l'API sous le formulaire (pas de alert())
États de chargement sur les boutons (désactivés \+ spinner pendant la requête)
Git : commits réguliers et clairs, un repo avec deux dossiers backend/ et mobile/