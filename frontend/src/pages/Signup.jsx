function Signup() {
  return (
    <div>
      <h1>Créer un compte</h1>
      <form>
        <input type="text" placeholder="Nom" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Mot de passe" />
        <button type="submit">S’inscrire</button>
      </form>
    </div>
  );
}

export default Signup;
