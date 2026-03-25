package com.pelify.backend;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {
	public static void main(String[] args) {
		// Intentamos cargar desde la raíz del proyecto (Pelify/)
		Dotenv dotenv = Dotenv.configure()
				.directory("../")
				.ignoreIfMissing()
				.load();

		// Si no lo encuentra arriba, probamos en la carpeta actual (Pelify/backend/)
		if (dotenv.get("DB_URL") == null) {
			dotenv = Dotenv.configure()
					.directory("./")
					.ignoreIfMissing()
					.load();
		}

		// Inyectamos las variables SOLO si existen
		if (dotenv.get("DB_URL") != null) {
			System.setProperty("DB_URL", dotenv.get("DB_URL"));
			System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
			System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
		}

		SpringApplication.run(Application.class, args);
	}
}