import { useState, useEffect } from "react";
import { Button, Alert, Form, Container, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Signup = () => {
  const navigate = useNavigate();
  const { signup, isLoading, isError, message, user, reset } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
    name: formData.name,
    email: formData.email,
    password: formData.password,
    image: formData.image, // ici image doit être une URL ou une chaîne base64
  };

    try {
      await signup(data);
      navigate("/");
    } catch (err) {
      // déjà géré par le hook
    }
  };

  useEffect(() => {
    reset(); // nettoyer messages si on revient à la page
  }, []);

  const goToHome = () => {
  navigate("/"); // Function to navigate home
};
  // useEffect(() => {
  //   if (user) navigate("/");
  // }, [user]);

  return (
    <Container className="mt-5" style={{ maxWidth: "500px" }}>
      <Button 
        variant="outline-secondary" 
        onClick={goToHome}
        className="mb-4"
      >
        ← Back to Home
      </Button>
      <h2 className="mb-4 text-center">Créer un compte</h2>

      {isError && <Alert variant="danger">{message}</Alert>}

      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrez votre nom"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Entrez votre email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Entrez un mot de passe"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

       <Form.Group className="mb-4" controlId="formImage">
        <Form.Label>Photo de profil (URL)</Form.Label>
        <Form.Control
          type="text"
          placeholder="Lien vers l'image"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />
      </Form.Group>

        <Button variant="success" type="submit" className="w-100" disabled={isLoading}>
          {isLoading ? (
            <>
              <Spinner size="sm" animation="border" className="me-2" />
              Création du compte...
            </>
          ) : (
            "S'inscrire"
          )}
        </Button>
      </Form>

      <div className="mt-3 text-center">
        <span>Vous avez déjà un compte ? </span>
        <Button
          variant="link"
          className="p-0"
          onClick={() => navigate("/login")}
        >
          Connectez-vous
        </Button>
      </div>
    </Container>
  );
};

export default Signup;
