import React from 'react';
import { Container } from 'react-bootstrap';
import { Bookmark } from 'lucide-react';
import TarjetasPelicula from '../../components/TarjetasPelicula/TarjetasPelicula';
import './MiLista.css';

const MiLista = () => {
    // Definimos la URL base para las imágenes de TMDB
    const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

    const peliculasFavoritas = [
        {
            id: 502356,
            title: "Super Mario Bros.",
            poster_path: `${BASE_IMAGE_URL}/k36QyeVsy851npTUQL08jO8hqip.jpg`,
            vote_average: 7.8,
            release_date: "2023"
        },
        {
            id: 76600,
            title: "Avatar: El sentido del agua",
            poster_path: `${BASE_IMAGE_URL}/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg`,
            vote_average: 7.7,
            release_date: "2022"
        },
        {
            id: 569094,
            title: "Spider-Man",
            poster_path: `${BASE_IMAGE_URL}/37WcNMgNOMxdhT87MFl7tq7FM1.jpg`,
            vote_average: 8.4,
            release_date: "2023"
        },
        {
            id: 157336,
            title: "Interstellar",
            poster_path: `${BASE_IMAGE_URL}/9cTfZWP5TfdnmAjiD6ZBXWIJ7O9.jpg`,
            vote_average: 8.6,
            release_date: "2014"
        },
        {
            id: 315162,
            title: "El Gato con Botas",
            poster_path: `${BASE_IMAGE_URL}/b5Jb7GoQaqIXy4VEdnQa0UrQZI.jpg`,
            vote_average: 8.3,
            release_date: "2022"
        }
    ];

    return (
        <div className="mi-lista-page">
            <Container className="my-4">
                <div className="mi-lista-header">
                    <Bookmark size={35} className="text-acento" />
                    <h1 className="ms-3 text-white">Mi Lista</h1>
                </div>

                <TarjetasPelicula
                    titulo="Mis Favoritas"
                    movies={peliculasFavoritas}
                    ocultarBotonLista={true}
                />
            </Container>
        </div>
    );
};

export default MiLista;