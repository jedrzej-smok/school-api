-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 25 Lis 2021, 15:50
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
-- Baza danych: `test`
--

DELIMITER $$
--
-- Procedury
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `p1` (IN `idZapisu` INT(11))  BEGIN
	UPDATE zapisy SET pozostaleZajecia = pozostaleZajecia - 1 WHERE zapisy.idKursu = idZapisu;  
END$$

--
-- Funkcje
--
CREATE DEFINER=`root`@`localhost` FUNCTION `f1` (`idInstruktora` INT(11)) RETURNS INT(11) BEGIN
    DECLARE res INT(11);
	SELECT  COUNT(*) INTO res FROM przypisania WHERE przypisania.idInstruktora = idInstruktora;
	RETURN (res);
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `gatunki`
--

CREATE TABLE `gatunki` (
  `idGatunku` int(11) NOT NULL,
  `nazwa` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `gatunki`
--

INSERT INTO `gatunki` (`idGatunku`, `nazwa`) VALUES
(1, 'administrowanie'),
(2, 'g2');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `instruktorgatunek`
--

CREATE TABLE `instruktorgatunek` (
  `idInstruktora` int(11) NOT NULL,
  `idGatunku` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `instruktorgatunek`
--

INSERT INTO `instruktorgatunek` (`idInstruktora`, `idGatunku`) VALUES
(1, 1),
(2, 2);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `instruktorzy`
--

CREATE TABLE `instruktorzy` (
  `idInstruktora` int(11) NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `haslo` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imie` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nazwisko` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jestAdminem` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `instruktorzy`
--

INSERT INTO `instruktorzy` (`idInstruktora`, `email`, `haslo`, `imie`, `nazwisko`, `jestAdminem`) VALUES
(1, 'admin@mail.com', 'admin', 'imieAdminXD', 'nazwiskoAdmin', 1),
(2, 'i2@mail.com', 'i2Haslo', 'i2Imie', 'i2Nazwisko', 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `kursy`
--

CREATE TABLE `kursy` (
  `idKursu` int(11) NOT NULL,
  `nazwa` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cena` double NOT NULL,
  `iloscZajec` int(11) NOT NULL,
  `dataRozpoczecia` date NOT NULL,
  `wymagania` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `idSali` int(11) NOT NULL,
  `idGatunku` int(11) NOT NULL,
  `idUtworu` int(11) NOT NULL,
  `idPoziomu` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `kursy`
--

INSERT INTO `kursy` (`idKursu`, `nazwa`, `cena`, `iloscZajec`, `dataRozpoczecia`, `wymagania`, `idSali`, `idGatunku`, `idUtworu`, `idPoziomu`) VALUES
(1, 'k1', 100, 100, '2007-05-06', 'brak', 1, 2, 1, 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `nagraniaukladow`
--

CREATE TABLE `nagraniaukladow` (
  `idNagrania` int(11) NOT NULL,
  `nrZajec` int(11) NOT NULL,
  `zrodlo` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `idKursu` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `nagraniaukladow`
--

INSERT INTO `nagraniaukladow` (`idNagrania`, `nrZajec`, `zrodlo`, `idKursu`) VALUES
(1, 1, 'brak', 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `poziomy`
--

CREATE TABLE `poziomy` (
  `idPoziomu` int(11) NOT NULL,
  `nazwa` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `poziomy`
--

INSERT INTO `poziomy` (`idPoziomu`, `nazwa`) VALUES
(1, 'p1');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `przypisania`
--

CREATE TABLE `przypisania` (
  `idPrzypisania` int(11) NOT NULL,
  `wynagrodzenie` double NOT NULL,
  `idKursu` int(11) NOT NULL,
  `idInstruktora` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `przypisania`
--

INSERT INTO `przypisania` (`idPrzypisania`, `wynagrodzenie`, `idKursu`, `idInstruktora`) VALUES
(1, 100, 1, 2);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `sale`
--

CREATE TABLE `sale` (
  `idSali` int(11) NOT NULL,
  `nrSali` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pojemnosc` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `sale`
--

INSERT INTO `sale` (`idSali`, `nrSali`, `pojemnosc`) VALUES
(1, 'nr1', 100);


-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `uczestnicy`
--

CREATE TABLE `uczestnicy` (
  `idUczesntika` int(11) NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `haslo` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imie` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nazwisko` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `uczestnicy`
--

INSERT INTO `uczestnicy` (`idUczesntika`, `email`, `haslo`, `imie`, `nazwisko`) VALUES
(1, 'u1@mail.com', 'u1Haslo', 'u1Imie', 'u1nazwisko');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `utwory`
--

CREATE TABLE `utwory` (
  `idUtworu` int(11) NOT NULL,
  `wykonawca` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tytul` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `zrodlo` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `idWykonawcy` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `utwory`
--

INSERT INTO `utwory` (`idUtworu`, `wykonawca`, `tytul`, `zrodlo`, `idWykonawcy`) VALUES
(1, 'w1', 'u1', 'z1', 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `wykonawcy`
--

CREATE TABLE `wykonawcy` (
  `idWykonawcy` int(11) NOT NULL,
  `nazwa` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gatunekMuzyczny` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `wykonawcy`
--

INSERT INTO `wykonawcy` (`idWykonawcy`, `nazwa`, `gatunekMuzyczny`) VALUES
(1, 'w1', 'brak');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `zapisy`
--

CREATE TABLE `zapisy` (
  `idZapisu` int(11) NOT NULL,
  `pozostaleZajecia` int(11) NOT NULL,
  `idUczestnika` int(11) NOT NULL,
  `idKursu` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `zapisy`
--

INSERT INTO `zapisy` (`idZapisu`, `pozostaleZajecia`, `idUczestnika`, `idKursu`) VALUES
(1, 99, 1, 1);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `gatunki`
--
ALTER TABLE `gatunki`
  ADD PRIMARY KEY (`idGatunku`);

--
-- Indeksy dla tabeli `instruktorgatunek`
--
ALTER TABLE `instruktorgatunek`
  ADD PRIMARY KEY (`idInstruktora`,`idGatunku`),
  ADD KEY `FK_idInstruktora` (`idInstruktora`) USING BTREE,
  ADD KEY `FK_idGatunku` (`idGatunku`) USING BTREE;

--
-- Indeksy dla tabeli `instruktorzy`
--
ALTER TABLE `instruktorzy`
  ADD PRIMARY KEY (`idInstruktora`);

--
-- Indeksy dla tabeli `kursy`
--
ALTER TABLE `kursy`
  ADD PRIMARY KEY (`idKursu`),
  ADD KEY `FK_idSali` (`idSali`),
  ADD KEY `FK_idGatunku` (`idGatunku`),
  ADD KEY `FK_idUtworu` (`idUtworu`),
  ADD KEY `FK_idPoziomu` (`idPoziomu`);

--
-- Indeksy dla tabeli `nagraniaukladow`
--
ALTER TABLE `nagraniaukladow`
  ADD PRIMARY KEY (`idNagrania`),
  ADD KEY `FK_idKursu` (`idKursu`);

--
-- Indeksy dla tabeli `poziomy`
--
ALTER TABLE `poziomy`
  ADD PRIMARY KEY (`idPoziomu`);

--
-- Indeksy dla tabeli `przypisania`
--
ALTER TABLE `przypisania`
  ADD PRIMARY KEY (`idPrzypisania`),
  ADD KEY `FK_idKursu` (`idKursu`),
  ADD KEY `FK_idInstruktora` (`idInstruktora`);

--
-- Indeksy dla tabeli `sale`
--
ALTER TABLE `sale`
  ADD PRIMARY KEY (`idSali`);

--
-- Indeksy dla tabeli `uczestnicy`
--
ALTER TABLE `uczestnicy`
  ADD PRIMARY KEY (`idUczesntika`);

--
-- Indeksy dla tabeli `utwory`
--
ALTER TABLE `utwory`
  ADD PRIMARY KEY (`idUtworu`),
  ADD KEY `FK_idWykonawcy` (`idWykonawcy`) USING BTREE;

--
-- Indeksy dla tabeli `wykonawcy`
--
ALTER TABLE `wykonawcy`
  ADD PRIMARY KEY (`idWykonawcy`);

--
-- Indeksy dla tabeli `zapisy`
--
ALTER TABLE `zapisy`
  ADD PRIMARY KEY (`idZapisu`),
  ADD KEY `FK_idUczestnika` (`idUczestnika`),
  ADD KEY `FK_IdKursu` (`idKursu`);

--
-- kokok

CREATE SEQUENCE seq_id_1 START WITH 10 INCREMENT BY 1;
CREATE SEQUENCE seq_id_2 START WITH 10 INCREMENT BY 1;
CREATE SEQUENCE seq_id_3 START WITH 10 INCREMENT BY 1;
CREATE SEQUENCE seq_id_4 START WITH 10 INCREMENT BY 1;
CREATE SEQUENCE seq_id_5 START WITH 10 INCREMENT BY 1;
CREATE SEQUENCE seq_id_6 START WITH 10 INCREMENT BY 1;
CREATE SEQUENCE seq_id_7 START WITH 10 INCREMENT BY 1;
CREATE SEQUENCE seq_id_8 START WITH 10 INCREMENT BY 1;
CREATE SEQUENCE seq_id_9 START WITH 10 INCREMENT BY 1;
CREATE SEQUENCE seq_id_10 START WITH 10 INCREMENT BY 1;
CREATE SEQUENCE seq_id_11 START WITH 10 INCREMENT BY 1;
--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `gatunki`
--
ALTER TABLE `gatunki`
  MODIFY `idGatunku` int(11) NOT NULL DEFAULT NEXTVAL(seq_id_1);

--
-- AUTO_INCREMENT dla tabeli `instruktorzy`
--
ALTER TABLE `instruktorzy`
  MODIFY `idInstruktora` int(11) NOT NULL DEFAULT NEXTVAL(seq_id_2);

--
-- AUTO_INCREMENT dla tabeli `kursy`
--
ALTER TABLE `kursy`
  MODIFY `idKursu` int(11) NOT NULL DEFAULT NEXTVAL(seq_id_3);

--
-- AUTO_INCREMENT dla tabeli `nagraniaukladow`
--
ALTER TABLE `nagraniaukladow`
  MODIFY `idNagrania` int(11) NOT NULL DEFAULT NEXTVAL(seq_id_4);

--
-- AUTO_INCREMENT dla tabeli `poziomy`
--
ALTER TABLE `poziomy`
  MODIFY `idPoziomu` int(11) NOT NULL DEFAULT NEXTVAL(seq_id_5);

--
-- AUTO_INCREMENT dla tabeli `przypisania`
--
ALTER TABLE `przypisania`
  MODIFY `idPrzypisania` int(11) NOT NULL DEFAULT NEXTVAL(seq_id_6);

--
-- AUTO_INCREMENT dla tabeli `sale`
--
ALTER TABLE `sale`
  MODIFY `idSali` int(11) NOT NULL DEFAULT NEXTVAL(seq_id_7);

--
-- AUTO_INCREMENT dla tabeli `uczestnicy`
--
ALTER TABLE `uczestnicy`
  MODIFY `idUczesntika` int(11) NOT NULL DEFAULT NEXTVAL(seq_id_8);

--
-- AUTO_INCREMENT dla tabeli `utwory`
--
ALTER TABLE `utwory`
  MODIFY `idUtworu` int(11) NOT NULL DEFAULT NEXTVAL(seq_id_9);

--
-- AUTO_INCREMENT dla tabeli `wykonawcy`
--
ALTER TABLE `wykonawcy`
  MODIFY `idWykonawcy` int(11) NOT NULL DEFAULT NEXTVAL(seq_id_10);

--
-- AUTO_INCREMENT dla tabeli `zapisy`
--
ALTER TABLE `zapisy`
  MODIFY `idZapisu` int(11) NOT NULL DEFAULT NEXTVAL(seq_id_11);

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `instruktorgatunek`
--
ALTER TABLE `instruktorgatunek`
  ADD CONSTRAINT `instruktorgatunek_ibfk_1` FOREIGN KEY (`idInstruktora`) REFERENCES `instruktorzy` (`idInstruktora`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `instruktorgatunek_ibfk_2` FOREIGN KEY (`idGatunku`) REFERENCES `gatunki` (`idGatunku`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `kursy`
--
ALTER TABLE `kursy`
  ADD CONSTRAINT `kursy_ibfk_1` FOREIGN KEY (`idSali`) REFERENCES `sale` (`idSali`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `kursy_ibfk_2` FOREIGN KEY (`idUtworu`) REFERENCES `utwory` (`idUtworu`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `kursy_ibfk_3` FOREIGN KEY (`idPoziomu`) REFERENCES `poziomy` (`idPoziomu`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `kursy_ibfk_4` FOREIGN KEY (`idGatunku`) REFERENCES `gatunki` (`idGatunku`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `nagraniaukladow`
--
ALTER TABLE `nagraniaukladow`
  ADD CONSTRAINT `nagraniaukladow_ibfk_1` FOREIGN KEY (`idKursu`) REFERENCES `kursy` (`idKursu`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `przypisania`
--
ALTER TABLE `przypisania`
  ADD CONSTRAINT `przypisania_ibfk_1` FOREIGN KEY (`idKursu`) REFERENCES `kursy` (`idKursu`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `przypisania_ibfk_2` FOREIGN KEY (`idInstruktora`) REFERENCES `instruktorzy` (`idInstruktora`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `utwory`
--
ALTER TABLE `utwory`
  ADD CONSTRAINT `utwory_ibfk_1` FOREIGN KEY (`idWykonawcy`) REFERENCES `wykonawcy` (`idWykonawcy`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `zapisy`
--
ALTER TABLE `zapisy`
  ADD CONSTRAINT `zapisy_ibfk_1` FOREIGN KEY (`idUczestnika`) REFERENCES `uczestnicy` (`idUczesntika`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `zapisy_ibfk_2` FOREIGN KEY (`idKursu`) REFERENCES `kursy` (`idKursu`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
