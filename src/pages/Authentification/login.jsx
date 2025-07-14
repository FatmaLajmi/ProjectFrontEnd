import { useState, useEffect } from "react";
import { Button, Alert, Form, Container, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading, isError, message, user, reset } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      navigate("/"); // Rediriger après login
    } catch (err) {
      // l’erreur est déjà gérée dans le hook
    }
  };

  useEffect(() => {
    reset(); // nettoie les erreurs si on revient sur la page
  }, []);

const location = useLocation();

const goToHome = () => {
  navigate("/"); // Function to navigate home
};

// useEffect(() => {
//   if (user && (location.pathname === "/login" || location.pathname === "/signup")) {
//     navigate("/");
//   }
// }, [user, location.pathname]);

  return (
    <Container className="mt-5" style={{ maxWidth: "500px" }}>
      <Button 
        variant="outline-secondary" 
        onClick={goToHome}
        className="mb-4"
      >
        ← Back to Home
      </Button>
      <h2 className="mb-4 text-center">Connexion</h2>

      {isError && <Alert variant="danger">{message}</Alert>}

      <Form onSubmit={handleSubmit}>
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

        <Form.Group className="mb-4" controlId="formPassword">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Entrez votre mot de passe"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100" disabled={isLoading}>
          {isLoading ? (
            <>
              <Spinner size="sm" animation="border" className="me-2" />
              Connexion en cours...
            </>
          ) : (
            "Se connecter"
          )}
        </Button>
      </Form>

      <div className="mt-3 text-center">
        <span>Vous n'avez pas encore de compte ? </span>
        <Button variant="link" onClick={() => navigate("/signup")} className="p-0">
          Créez un compte
        </Button>
      </div>
    </Container>
  );
};

export default Login;
