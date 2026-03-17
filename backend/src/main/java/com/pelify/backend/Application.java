package com.pelify.backend;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		// Esto intenta cargar el .env. Si no lo encuentra, no pasa nada (ignoreIfMissing)
		Dotenv dotenv = Dotenv.configure()
				.directory("./backend") // <--- Asegúrate de que apunte a la carpeta del backend
				.ignoreIfMissing()
				.load();

		String password = dotenv.get("DB_PASSWORD");

		if (password != null) {
			System.setProperty("DB_PASSWORD", password);
		} else {
			// Si sigue fallando, es que no lee el archivo.
			// Como medida de emergencia para probar, puedes ponerla aquí:
			// System.setProperty("DB_PASSWORD", "tu_password_real");
			System.out.println("OJO: No se ha encontrado la variable DB_PASSWORD en el .env");
		}

		SpringApplication.run(Application.class, args);
	}
}