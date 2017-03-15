-- phpMyAdmin SQL Dump
-- version 4.4.13.1deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 15, 2017 at 03:14 AM
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
CREATE DATABASE IF NOT EXISTS `kriss` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `kriss`;

-- --------------------------------------------------------

--
-- Table structure for table `bio`
--

DROP TABLE IF EXISTS `bio`;
CREATE TABLE IF NOT EXISTS `bio` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `story` varchar(255) NOT NULL,
  `facebook_link` varchar(100) NOT NULL,
  `twitter_link` varchar(100) NOT NULL,
  `whatsapp_number` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `cover_image`
--

DROP TABLE IF EXISTS `cover_image`;
CREATE TABLE IF NOT EXISTS `cover_image` (
  `id` int(11) NOT NULL,
  `src` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
CREATE TABLE IF NOT EXISTS `event` (
  `id` int(11) NOT NULL,
  `user-id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `descrption` longtext NOT NULL,
  `venue` text NOT NULL,
  `price` varchar(200) NOT NULL,
  `image` varchar(200) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`id`, `user-id`, `name`, `date`, `descrption`, `venue`, `price`, `image`) VALUES
(2, 6, 'Back 2 Kasi', '17 March 2017', 'The 5th annual Back2Kasi (B2K) brings you another year of great entertainment and social gathering. This event celebrates local entrepreneurs by giving them a platform to show case their products and services and also a platform for performing artists filled with activities such as skateboarding, Rap, Poetry, Dance crews and fashion.', 'Boiketlong Sports Ground, Sasolburg - Sasolburg, Free State', '80', '/img/events/b2k.jpg'),
(5, 6, 'Mlazi Milano Launch ', '17 March 2017', 'Okmalumkoolkat`s hit album finally being launched at one of the biggest venues in Gauteng. From alternative futuristic beats and moves by the future mfana, this promises to be one for the books!', 'Zone 6 Venue, Diepkloof - Blackchain Centre, Diepkloof', '80', '/img/events/mlazi.jpg'),
(7, 6, 'Stars of Limpopo', '23 March 2017', 'Okmalumkoolkat`s hit album finally being launched at one of the biggest venues in Gauteng. From alternative futuristic beats and moves by the future mfana, this promises to be one for the books!', 'Zone 6 Venue, Diepkloof - Blackchain Centre, Diepkloof', '80', '/img/events/lmpo.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `featured`
--

DROP TABLE IF EXISTS `featured`;
CREATE TABLE IF NOT EXISTS `featured` (
  `id` int(11) NOT NULL,
  `song_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `featured`
--

INSERT INTO `featured` (`id`, `song_id`) VALUES
(2, 1),
(1, 3),
(4, 4),
(8, 6),
(5, 7);

-- --------------------------------------------------------

--
-- Table structure for table `featured_video`
--

DROP TABLE IF EXISTS `featured_video`;
CREATE TABLE IF NOT EXISTS `featured_video` (
  `id` int(11) NOT NULL,
  `video_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `featured_video`
--

INSERT INTO `featured_video` (`id`, `video_id`) VALUES
(6, 1),
(1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `image_art`
--

DROP TABLE IF EXISTS `image_art`;
CREATE TABLE IF NOT EXISTS `image_art` (
  `id` int(11) NOT NULL,
  `src` varchar(255) NOT NULL,
  `song_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `image_art`
--

INSERT INTO `image_art` (`id`, `src`, `song_id`) VALUES
(1, '/img/liso.jpg', 1),
(2, '/img/ndlu.jpg', 2),
(3, '/img/awta.jpg', 3),
(4, '/img/manax.jpg', 4),
(5, '/img/pantsula.png', 5),
(6, '/img/manax.jpg', 6),
(7, '/img/v2v.jpg', 7);

-- --------------------------------------------------------

--
-- Table structure for table `song`
--

DROP TABLE IF EXISTS `song`;
CREATE TABLE IF NOT EXISTS `song` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  `src` varchar(255) NOT NULL,
  `download_count` int(11) NOT NULL,
  `play_count` int(11) NOT NULL,
  `flame_count` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `song`
--

INSERT INTO `song` (`id`, `name`, `user_id`, `src`, `download_count`, `play_count`, `flame_count`) VALUES
(1, 'Shona Phantsi', 1, '/sound/liso.mp3', 4, 6, 8),
(2, 'Now or Never', 2, '/sound/ndlu.mp3', 0, 0, 0),
(3, 'Awta', 4, '/sound/awta.mp3', 7, 7, 5),
(4, 'Pronto', 5, '/sound/pronto.mp3', 3, 4, 3),
(5, 'Pantsula', 3, '/sound/pantsula.mp3', 0, 0, 0),
(6, 'F.O.M.O', 5, '/sound/fomo.mp3', 0, 3, 1),
(7, 'Bayabheka', 3, '/sound/bayabheka.mp3', 2, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `thumbnail`
--

DROP TABLE IF EXISTS `thumbnail`;
CREATE TABLE IF NOT EXISTS `thumbnail` (
  `id` int(11) NOT NULL,
  `src` varchar(110) NOT NULL,
  `video_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `thumbnail`
--

INSERT INTO `thumbnail` (`id`, `src`, `video_id`) VALUES
(1, '/img/mf1.jpg', 1),
(2, '/img/mf2.jpg', 2);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `location`) VALUES
(1, 'LISO', 'Capetown'),
(2, 'Ndlulamthi', 'Mtata'),
(3, 'V2V Pham', 'Cape Town'),
(4, 'NankOo', 'Cape Town'),
(5, 'Stunna Manax', 'Cape Town'),
(6, 'KRISS', 'Queenstown');

-- --------------------------------------------------------

--
-- Table structure for table `video`
--

DROP TABLE IF EXISTS `video`;
CREATE TABLE IF NOT EXISTS `video` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `url` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `video`
--

INSERT INTO `video` (`id`, `name`, `url`, `user_id`) VALUES
(1, 'The Muffinz - Sound Check', 'https://www.youtube.com/watch?v=DSkp3m4iB3Q', 1),
(2, 'The Muffinz - Umsebenzi', 'https://www.youtube.com/watch?v=DSkp3m4iB3Q', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bio`
--
ALTER TABLE `bio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FOREIGN` (`user_id`);

--
-- Indexes for table `cover_image`
--
ALTER TABLE `cover_image`
  ADD KEY `FOREIGN` (`user_id`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FOREIGN` (`user-id`);

--
-- Indexes for table `featured`
--
ALTER TABLE `featured`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FOREIGN` (`song_id`);

--
-- Indexes for table `featured_video`
--
ALTER TABLE `featured_video`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FOREIGN` (`video_id`);

--
-- Indexes for table `image_art`
--
ALTER TABLE `image_art`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FOREIGN` (`song_id`);

--
-- Indexes for table `song`
--
ALTER TABLE `song`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user` (`user_id`);

--
-- Indexes for table `thumbnail`
--
ALTER TABLE `thumbnail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FOREIGN` (`video_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `video`
--
ALTER TABLE `video`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FOREIGN` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bio`
--
ALTER TABLE `bio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `featured`
--
ALTER TABLE `featured`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `featured_video`
--
ALTER TABLE `featured_video`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `image_art`
--
ALTER TABLE `image_art`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `song`
--
ALTER TABLE `song`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `thumbnail`
--
ALTER TABLE `thumbnail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `video`
--
ALTER TABLE `video`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `event_ibfk_1` FOREIGN KEY (`user-id`) REFERENCES `user` (`id`);

--
-- Constraints for table `featured`
--
ALTER TABLE `featured`
  ADD CONSTRAINT `featured_ibfk_1` FOREIGN KEY (`song_id`) REFERENCES `song` (`id`);

--
-- Constraints for table `featured_video`
--
ALTER TABLE `featured_video`
  ADD CONSTRAINT `featured_video_ibfk_1` FOREIGN KEY (`video_id`) REFERENCES `video` (`id`);

--
-- Constraints for table `image_art`
--
ALTER TABLE `image_art`
  ADD CONSTRAINT `image_art_ibfk_1` FOREIGN KEY (`song_id`) REFERENCES `song` (`id`);

--
-- Constraints for table `song`
--
ALTER TABLE `song`
  ADD CONSTRAINT `song_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `thumbnail`
--
ALTER TABLE `thumbnail`
  ADD CONSTRAINT `thumbnail_ibfk_1` FOREIGN KEY (`video_id`) REFERENCES `video` (`id`);

--
-- Constraints for table `video`
--
ALTER TABLE `video`
  ADD CONSTRAINT `video_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
