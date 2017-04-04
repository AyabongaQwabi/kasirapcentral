ALTER TABLE `song` ADD `genre_id` INT NOT NULL AFTER `src`, ADD INDEX `FOREIGN` (`genre_id`);

-- phpMyAdmin SQL Dump
-- version 4.4.13.1deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 04, 2017 at 11:18 PM
-- Server version: 5.6.27-0ubuntu1
-- PHP Version: 5.6.11-1ubuntu3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kriss`
--

-- --------------------------------------------------------

--
-- Table structure for table `genre`
--

CREATE TABLE IF NOT EXISTS `genre` (
  `id` int(11) NOT NULL,
  `genre` varchar(100) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `genre`
--

INSERT INTO `genre` (`id`, `genre`) VALUES
(1, 'Afro Pop'),
(2, 'Acapella'),
(4, 'Afro Soul'),
(8, 'Jazz'),
(9, 'Maskhandi'),
(10, 'Mbhaqanga'),
(11, 'House'),
(12, 'Spaza Rap'),
(13, 'Kwaito'),
(14, 'Hip Hop'),
(15, 'Soul'),
(16, 'Spoken Word'),
(17, 'Gospel'),
(18, 'Raggea'),
(19, 'Urban'),
(20, 'Rock'),
(21, 'Choral'),
(22, 'Iscathamiya'),
(23, 'Electronica'),
(24, 'Fusion'),
(25, 'Trap Hip Hop'),
(26, 'Kwela Kwela'),
(27, 'Mbhube'),
(28, 'Poetry'),
(29, 'Deep House'),
(30, 'POP'),
(31, 'Blues'),
(32, 'Comedy'),
(33, 'RnB');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `genre`
--
ALTER TABLE `genre`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `genre`
--
ALTER TABLE `genre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=34;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
