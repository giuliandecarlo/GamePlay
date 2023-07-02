-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 20, 2020 at 09:26 PM
-- Server version: 8.0.17
-- PHP Version: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

-- Tabella indirizzi:
CREATE TABLE `indirizzi` (
  `id` int(11) NOT NULL,
  `indirizzo1` varchar(255) DEFAULT NULL,
  `indirizzo2` varchar(255) DEFAULT NULL,
  `città` varchar(45) DEFAULT NULL,
  `regione` varchar(45) DEFAULT NULL,
  `nazione` varchar(45) DEFAULT NULL,
  `telefono` varchar(10) DEFAULT NULL,
  `codice` int(6) DEFAULT NULL,
  `id_utente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Tabella categorie
CREATE TABLE `categorie` (
  `id` int(11) NOT NULL,
  `titolo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Tabella ordini
CREATE TABLE `ordini` (
  `id` int(10) NOT NULL,
  `id_utente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Tabella dettagli ordine
CREATE TABLE `dettagli_ordine` (
  `id` int(10) NOT NULL,
  `id_ordine` int(11) NOT NULL,
  `id_prodotto` int(10) NOT NULL,
  `quantità` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Tabella prodotti
CREATE TABLE `prodotti` (
  `id` int(10) NOT NULL,
  `titolo` varchar(255) NOT NULL,
  `immagine_principale` varchar(255) NOT NULL,
  `imagini_secondarie` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `descrizione` text NOT NULL,
  `prezzo` float NOT NULL,
  `quantità` int(10) NOT NULL,
  `descrizione_breve` varchar(255) NOT NULL,
  `id_categoria` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Tabella utente
CREATE TABLE `utente` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `nome` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'not set',
  `cognome` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'not set',
  `età` int(10) DEFAULT '18',
  `ruolo` int(10) DEFAULT '555',
  `foto` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `tipo` varchar(255) NOT NULL DEFAULT 'local'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Indici tabelle
ALTER TABLE `indirizzi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_addresses_users1_idx` (`id_utente`);

ALTER TABLE `categorie`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `ordini`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_orders_users1_idx` (`id_utente`);

ALTER TABLE `dettagli_ordine`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_orders_has_products_products1_idx` (`id_prodotto`),
  ADD KEY `fk_orders_has_products_orders1_idx` (`id_ordine`);

ALTER TABLE `prodotti`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_ibfk_1` (`id_categoria`);
ALTER TABLE `prodotti` ADD FULLTEXT KEY `descrizione` (`descrizione`);

ALTER TABLE `utente`
  ADD PRIMARY KEY (`id`);

-- Incremento automatico
ALTER TABLE `indirizzi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

ALTER TABLE `categorie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

ALTER TABLE `ordini`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=120;

ALTER TABLE `dettagli_ordine`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=197;

ALTER TABLE `prodotti`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

ALTER TABLE `utente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;


ALTER TABLE `indirizzi`
  ADD CONSTRAINT `fk_addresses_users1` FOREIGN KEY (`id_utente`) REFERENCES `utente` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `ordini`
  ADD CONSTRAINT `utente` FOREIGN KEY (`id_utente`) REFERENCES `utente` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `dettagli_ordine`
  ADD CONSTRAINT `fk_orders_has_products_orders1` FOREIGN KEY (`id_ordine`) REFERENCES `ordini` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_orders_has_products_products1` FOREIGN KEY (`id_ordine`) REFERENCES `prodotti` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `prodotti`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categorie` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;