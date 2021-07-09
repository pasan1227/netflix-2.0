import React from 'react';
import Banner from './Banner';
import './HomeScreen.css';
import Nav from './Nav';
import request from './Requests';
import Row from './Row';

function HomeScreen() {
    return (
        <div className="homeScreen">
            <Nav />

            <Banner />

            <Row title="NETFLIX ORIGINALS" fetchUrl={request.fetchNetflixOriginals} isLargeRow />
            <Row title="Trending Now" fetchUrl={request.fetchTrending} />
            <Row title="Top Rated" fetchUrl={request.fetchTopRated} />
            <Row title="Action Movies" fetchUrl={request.fetchActionMovies} />
            <Row title="Comedy Movies" fetchUrl={request.fetchComedyMovies} />
            <Row title="Horror Movies" fetchUrl={request.fetchHorrorMovies} />
            <Row title="Romance Movies" fetchUrl={request.fetchRomanceMovies} />
            <Row title="Documenraties" fetchUrl={request.fetchDocumentaries} />

        </div>
    )
}

export default HomeScreen
