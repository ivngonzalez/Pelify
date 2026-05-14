@RestController
@RequestMapping("/api/favoritos")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true") // Para que React funcione
public class FavoritosController {

    @Autowired
    private PeliculaService peliculaService;
    @Autowired
    private UserService userService; // Necesitarás crear este servicio si no existe

    @PostMapping("/agregar/{tmdbId}")
    public ResponseEntity<?> agregarAFavoritos(@PathVariable Integer tmdbId, HttpSession session) {
        // 1. Obtener usuario de la sesión
        User usuarioSesion = (User) session.getAttribute("usuarioLogueado");
        
        if (usuarioSesion == null) {
            return ResponseEntity.status(401).body("Inicia sesión para añadir a favoritos");
        }

        // 2. Buscar la película y el usuario en la DB
        peliculaService.añadirAFavoritos(usuarioSesion.getId(), tmdbId);
        
        return ResponseEntity.ok("Añadida a favoritos");
    }
}