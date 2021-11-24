-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 21 Lis 2021, 00:14
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
-- Baza danych: `sd2_manuallyyy`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `instruktorzy`
--

CREATE TABLE `instruktorzy` (
  `idInstruktora` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) COLLATE utf8_polish_ci NOT NULL,
  `haslo` varchar(100) COLLATE utf8_polish_ci NOT NULL,
  `imie` varchar(50) COLLATE utf8_polish_ci NOT NULL,
  `nazwisko` varchar(50) COLLATE utf8_polish_ci NOT NULL,
  `jestAdminem` int(11) NOT NULL,
   PRIMARY KEY (`idInstruktora`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `instruktorzy`
--

INSERT INTO `instruktorzy` (`idInstruktora`, `email`, `haslo`, `imie`, `nazwisko`, `jestAdminem`) VALUES
(1, 'admin@mail.com', 'admin', 'imieAdminXD', 'nazwiskoAdmin', 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `gatunki`
--

CREATE TABLE `gatunki` (
  `idGatunku` int(11) NOT NULL AUTO_INCREMENT,
  `nazwa` varchar(50) COLLATE utf8_polish_ci NOT NULL,
   PRIMARY KEY (`idGatunku`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `gatunki`
--

INSERT INTO `gatunki` (`idGatunku`, `nazwa`) VALUES
(1, 'administrowanie');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `instruktorgatunek`
--

CREATE TABLE `instruktorgatunek` (
  `idInstruktora` int(11) NOT NULL,
  `idGatunku` int(11) NOT NULL,
PRIMARY KEY (`idInstruktora`,`idGatunku`),
CONSTRAINT `instruktorgatunek_FK_idInstruktora` FOREIGN KEY (`idInstruktora`) REFERENCES `instruktorzy` (`idInstruktora`) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT `instruktorgatunek_FK_idGatunku` FOREIGN KEY (`idGatunku`) REFERENCES `gatunki` (`idGatunku`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `instruktorgatunek`
--

INSERT INTO `instruktorgatunek` (`idInstruktora`, `idGatunku`) VALUES
(1, 1);


-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `poziomy`
--

CREATE TABLE `poziomy` (
  `idPoziomu` int(11) NOT NULL AUTO_INCREMENT,
  `nazwa` varchar(50) COLLATE utf8_polish_ci NOT NULL,
PRIMARY KEY (`idPoziomu`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `sale`
--

CREATE TABLE `sale` (
  `idSali` int(11) NOT NULL AUTO_INCREMENT,
  `nrSali` varchar(50) COLLATE utf8_polish_ci NOT NULL,
  `pojemnosc` int(11) NOT NULL,
PRIMARY KEY (`idSali`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `wykonawcy`
--

CREATE TABLE `wykonawcy` (
  `idWykonawcy` int(11) NOT NULL AUTO_INCREMENT,
  `nazwa` varchar(50) COLLATE utf8_polish_ci NOT NULL,
  `gatunekMuzyczny` varchar(50) COLLATE utf8_polish_ci DEFAULT NULL,
PRIMARY KEY (`idWykonawcy`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `utwory`
--

CREATE TABLE `utwory` (
  `idUtworu` int(11) NOT NULL AUTO_INCREMENT,
  `wykonawca` varchar(50) COLLATE utf8_polish_ci NOT NULL,
  `tytul` varchar(50) COLLATE utf8_polish_ci NOT NULL,
  `zrodlo` varchar(50) COLLATE utf8_polish_ci NOT NULL,
  `idWykonawcy` int(11) NOT NULL,
PRIMARY KEY (`idUtworu`),
CONSTRAINT `utwory_FK_idWykonawcy` FOREIGN KEY (`idWykonawcy`) REFERENCES `wykonawcy` (`idWykonawcy`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `kursy`
--

CREATE TABLE `kursy` (
  `idKursu` int(11) NOT NULL AUTO_INCREMENT,
  `nazwa` varchar(50) COLLATE utf8_polish_ci NOT NULL,
  `cena` double NOT NULL,
  `iloscZajec` int(11) NOT NULL,
  `dataRozpoczecia` date NOT NULL,
  `wymagania` varchar(50) COLLATE utf8_polish_ci NOT NULL,
  `idSali` int(11) NOT NULL,
  `idGatunku` int(11) NOT NULL,
  `idUtworu` int(11) NOT NULL,
  `idPoziomu` int(11) NOT NULL,
PRIMARY KEY (`idKursu`),
CONSTRAINT `kursy_FK_idSali` FOREIGN KEY (`idSali`) REFERENCES `sale` (`idSali`) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT `kursy_FK_idUtworu` FOREIGN KEY (`idUtworu`) REFERENCES `utwory` (`idUtworu`) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT `kursy_FK_idPoziomu`  FOREIGN KEY (`idPoziomu`) REFERENCES `poziomy` (`idPoziomu`) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT `kursy_FK_idGatunku` FOREIGN KEY (`idGatunku`) REFERENCES `gatunki` (`idGatunku`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `nagraniaukladow`
--

CREATE TABLE `nagraniaukladow` (
  `idNagrania` int(11) NOT NULL AUTO_INCREMENT,
  `nrZajec` int(11) NOT NULL,
  `zrodlo` varchar(100) COLLATE utf8_polish_ci NOT NULL,
  `idKursu` int(11) NOT NULL,
PRIMARY KEY (`idNagrania`),
CONSTRAINT `nagraniaukladow_FK_idKursu` FOREIGN KEY (`idKursu`) REFERENCES `kursy` (`idKursu`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `przypisania`
--

CREATE TABLE `przypisania` (
  `idPrzypisania` int(11) NOT NULL AUTO_INCREMENT,
  `wynagrodzenie` double NOT NULL,
  `idKursu` int(11) NOT NULL,
  `idInstruktora` int(11) NOT NULL,
PRIMARY KEY (`idPrzypisania`),
CONSTRAINT `przypisania_FK_idKursu` FOREIGN KEY (`idKursu`) REFERENCES `kursy` (`idKursu`) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT `przypisania_FK_idInstruktora` FOREIGN KEY (`idInstruktora`) REFERENCES `instruktorzy` (`idInstruktora`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `uczestnicy`
--

CREATE TABLE `uczestnicy` (
  `idUczesntika` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) COLLATE utf8_polish_ci NOT NULL,
  `haslo` varchar(100) COLLATE utf8_polish_ci NOT NULL,
  `imie` varchar(50) COLLATE utf8_polish_ci NOT NULL,
  `nazwisko` varchar(50) COLLATE utf8_polish_ci NOT NULL,
PRIMARY KEY (`idUczesntika`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `zapisy`
--

CREATE TABLE `zapisy` (
  `idZapisu` int(11) NOT NULL AUTO_INCREMENT,
  `pozostaleZajecia` int(11) NOT NULL,
  `idUczestnika` int(11) NOT NULL,
  `idKursu` int(11) NOT NULL,
PRIMARY KEY (`idZapisu`),
CONSTRAINT `zapisy_FK_idUczestnika` FOREIGN KEY (`idUczestnika`) REFERENCES `uczestnicy` (`idUczesntika`) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT `zapisy_FK_IdKursu` FOREIGN KEY (`idKursu`) REFERENCES `kursy` (`idKursu`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

COMMIT;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
