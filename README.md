# proiectSpring

Structura Aplicației
AuthController

Acest controller gestionează înregistrarea și autentificarea utilizatorilor.
Permite utilizatorilor să creeze un cont nou și să se autentifice pentru a accesa funcțiile protejate ale aplicației.
Metodele principale includ:
/register: Endpoint pentru crearea unui cont nou. Primește datele de înregistrare ale utilizatorului, criptează parola și salvează datele în baza de date.
/login: Endpoint pentru afișarea paginii de autentificare. După autentificare, utilizatorul poate accesa quiz-ul și istoricul său.

QuestionController

Controller responsabil pentru gestionarea întrebărilor și răspunsurilor din quiz.
La fiecare accesare a quiz-ului, acest controller extrage o întrebare din baza de date și o afișează utilizatorului împreună cu opțiunile de răspuns.
De asemenea, validează răspunsul utilizatorului și returnează un feedback dacă răspunsul este corect sau incorect.
Include funcționalitatea de a avansa la următoarea întrebare din quiz.

AnswerResult

Această clasă modelează răspunsul primit de la utilizator la o întrebare specifică.
Conține informații despre răspunsul selectat de utilizator și un indicator dacă răspunsul este corect.
Este utilizată în QuestionController pentru a oferi feedback utilizatorului după fiecare răspuns.

Question

Modelul Question reprezintă întrebările din chestionar.
Această clasă conține informații precum textul întrebării, opțiunile de răspuns asociate și răspunsul corect.
Fiecare întrebare este mapată la o înregistrare din baza de date (tabela questions).

User

Modelul User reprezintă utilizatorii aplicației.
Conține date de bază ale utilizatorului, cum ar fi numele, adresa de e-mail și parola (criptată).
Este mapat la tabela user din baza de date, fiind responsabil pentru stocarea utilizatorilor înregistrați.

QuestionRepository

Interfața QuestionRepository extinde JpaRepository, permițând gestionarea entității Question în baza de date.
Asigură metode de extragere și manipulare a întrebărilor din baza de date, utilizate pentru a genera întrebările din quiz.

UserRepository

Similar cu QuestionRepository, UserRepository extinde JpaRepository și oferă metode pentru gestionarea utilizatorilor.
Este folosit de UserService pentru a salva utilizatorii noi și a verifica autentificarea utilizatorilor existenți.

SecurityConfig

Clasa SecurityConfig configurează securitatea aplicației utilizând Spring Security.
Permite acces public la endpoint-urile /register și /login, dar solicită autentificare pentru restul paginilor.
Configurează o pagină de autentificare personalizată (/login) și folosește BCryptPasswordEncoder pentru a cripta parolele utilizatorilor, asigurând astfel securitatea datelor.

QuestionService

Clasa QuestionService gestionează logica de afișare și verificare a întrebărilor.
Extrage întrebările din baza de date și le trimite către QuestionController pentru a fi afișate utilizatorului.
De asemenea, verifică răspunsurile date de utilizator și actualizează progresul acestuia în quiz.

UserService

UserService conține logica necesară pentru gestionarea utilizatorilor.
Este responsabil pentru înregistrarea utilizatorilor noi, criptarea parolelor înainte de salvare și validarea datelor de autentificare.
Interacționează cu UserRepository pentru a efectua operațiuni de creare și căutare a utilizatorilor în baza de date.

QuizApplication

Aceasta este clasa principală a aplicației, care inițiază rularea aplicației Spring Boot.
Conține metoda main, care pornește contextul aplicației și inițiază toate componentele definite în proiect.

Baza de Date MySQL

Baza de date MySQL este structurată cu următoarele tabele:

questions: Conține întrebările din chestionar, inclusiv textul întrebării și răspunsul corect.
question_options: Conține opțiunile de răspuns pentru fiecare întrebare, mapate la întrebările din tabela questions.
user: Stochează informațiile utilizatorilor, inclusiv numele, adresa de e-mail și parola criptată.

Fluxul Aplicației
Înregistrare Utilizator:

Utilizatorii își creează un cont prin completarea formularului de înregistrare.
Parola introdusă este criptată folosind BCryptPasswordEncoder și apoi salvată în baza de date.
Autentificare:

După ce contul este creat, utilizatorii se pot autentifica prin pagina personalizată de login.
Utilizatorii autentificați pot accesa funcționalitățile protejate ale aplicației, inclusiv quiz-ul auto.
Quiz:

Utilizatorii accesează întrebările din chestionar și pot răspunde la acestea.
Fiecare răspuns este verificat, iar utilizatorul primește feedback imediat cu privire la corectitudinea răspunsului.
Utilizatorul poate trece la următoarea întrebare pentru a continua quiz-ul.

