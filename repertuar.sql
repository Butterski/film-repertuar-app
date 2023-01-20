-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 20 Sty 2023, 23:57
-- Wersja serwera: 10.4.21-MariaDB
-- Wersja PHP: 7.3.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `repertuar`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `movies`
--

CREATE TABLE `movies` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `release_date` date NOT NULL,
  `genre` varchar(255) NOT NULL,
  `runtime` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `movies`
--

INSERT INTO `movies` (`id`, `title`, `release_date`, `genre`, `runtime`) VALUES
(1, 'The Shawshank Redemption', '1994-09-10', 'Drama', 142),
(2, 'The Godfather', '1972-03-24', 'Crime, Drama', 175),
(3, 'The Godfather: Part II', '1974-12-20', 'Crime, Drama', 202),
(4, 'The Dark Knight', '2008-07-16', 'Action, Crime, Drama', 152),
(5, '12 Angry Men', '1957-04-10', 'Drama', 96),
(6, 'The Lord of the Rings: The Return of the King', '2003-12-17', 'Adventure, Fantasy, Drama', 201),
(7, 'Pulp Fiction', '1994-10-14', 'Crime, Thriller', 154),
(8, 'The Good, the Bad and the Ugly', '1966-12-29', 'Western', 161),
(9, 'Fight Club', '1999-10-15', 'Drama', 139),
(10, 'Forrest Gump', '1994-07-06', 'Drama, Romance', 142),
(11, 'Joker', '2019-10-04', 'Thriller, Crime, Drama', 122),
(12, 'Parasite', '2019-05-30', 'Thriller, Comedy, Drama', 132),
(13, '1917', '2019-12-10', 'War, Drama, Thriller', 119),
(14, 'Avengers: Endgame', '2019-04-26', 'Action, Adventure, Fantasy', 181),
(15, 'The Irishman', '2019-11-01', 'Crime, Drama', 209);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `showtimes`
--

CREATE TABLE `showtimes` (
  `id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `start_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `showtimes`
--

INSERT INTO `showtimes` (`id`, `movie_id`, `start_time`) VALUES
(3, 2, '2023-01-02 14:00:00'),
(4, 3, '2023-01-03 19:00:00'),
(5, 4, '2023-01-04 20:00:00'),
(6, 6, '2023-01-01 10:00:00'),
(7, 7, '2023-01-01 14:00:00'),
(9, 9, '2023-01-01 22:00:00'),
(10, 10, '2023-01-02 12:00:00'),
(11, 11, '2023-01-02 16:00:00'),
(12, 12, '2023-01-02 20:00:00'),
(13, 13, '2023-01-03 14:00:00'),
(14, 14, '2023-01-03 18:00:00'),
(15, 15, '2023-01-03 22:00:00'),
(16, 6, '2023-01-04 14:30:00'),
(17, 7, '2023-01-04 14:00:00'),
(18, 5, '2023-01-02 19:51:00'),
(19, 5, '2023-01-02 20:51:00'),
(21, 11, '2023-01-01 22:37:00'),
(26, 9, '2023-01-03 20:40:00'),
(30, 9, '2023-01-20 21:45:00'),
(31, 11, '2023-01-20 21:45:00');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(16) NOT NULL,
  `password` varchar(256) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `isAdmin`) VALUES
(1, 'admin', 'd033e22ae348aeb5660fc2140aec35850c4da997', 1);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `showtimes`
--
ALTER TABLE `showtimes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `movie_id` (`movie_id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT dla tabeli `showtimes`
--
ALTER TABLE `showtimes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `showtimes`
--
ALTER TABLE `showtimes`
  ADD CONSTRAINT `showtimes_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
