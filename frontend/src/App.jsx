import Navegacion from './components/Navegacion/Nav';
import Footer from './components/Footer/Footer';
import { Container } from 'react-bootstrap'; // Importa Container

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navegacion />
      
      <main className="flex-grow-1 py-5"> 
        {/* py-5 añade padding vertical, Container maneja el padding lateral horizontal */}
        <Container fluid className="px-4 px-lg-5">
          <h1>Bienvenido a Pelify</h1>
          <p>Descubre y comparte tus películas favoritas con la comunidad de Pelify.</p>
        </Container>
      </main>

      <Footer />
    </div>
  );
}

export default App;