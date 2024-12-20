-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 20, 2024 at 11:22 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `movieprojectdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `casts`
--

CREATE TABLE `casts` (
  `id` int(11) NOT NULL,
  `movieId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `name` varchar(120) NOT NULL,
  `url` varchar(255) NOT NULL,
  `characterName` varchar(120) NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `dateUpdated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `casts`
--

INSERT INTO `casts` (`id`, `movieId`, `userId`, `name`, `url`, `characterName`, `dateCreated`, `dateUpdated`) VALUES
(23, 201, 2, 'Robert Downey Jr.', '/5qHNjhtjMD4YWH3UP0rm4tKwxCL.jpg', 'Tony Stark / Iron Man', '2024-12-20 20:42:43', '0000-00-00 00:00:00'),
(24, 201, 2, 'Chris Evans', '/3bOGNsHlrswhyW79uvIHH1V43JI.jpg', 'Steve Rogers / Captain America', '2024-12-20 20:42:43', '0000-00-00 00:00:00'),
(25, 201, 2, 'Chris Hemsworth', '/u9Ovh0g3b9kqYjcydqW11PCv5DZ.jpg', 'Thor', '2024-12-20 20:42:43', '0000-00-00 00:00:00'),
(26, 201, 2, 'Josh Brolin', '/sX2etBbIkxRaCsATyw5ZpOVMPTD.jpg', 'Thanos', '2024-12-20 20:42:43', '0000-00-00 00:00:00'),
(27, 201, 2, 'Scarlett Johansson', '/6NsMbJXRlDZuDzatN2akFdGuTvx.jpg', 'Natasha Romanoff / Black Widow', '2024-12-20 20:42:43', '0000-00-00 00:00:00'),
(28, 201, 2, 'Mark Ruffalo', '/5GilHMOt5PAQh6rlUKZzGmaKEI7.jpg', 'Bruce Banner / Hulk', '2024-12-20 20:42:43', '0000-00-00 00:00:00'),
(29, 201, 2, 'Don Cheadle', '/oZ1u1GmudvUGpbMfi9Hxonzp3lF.jpg', 'James Rhodes / War Machine', '2024-12-20 20:42:43', '0000-00-00 00:00:00'),
(30, 201, 2, 'Tom Holland', '/1d67to0U8bx5jhWTanVx37k6Nd0.jpg', 'Peter Parker / Spider-Man', '2024-12-20 20:42:43', '0000-00-00 00:00:00'),
(31, 201, 2, 'Benedict Cumberbatch', '/fBEucxECxGLKVHBznO0qHtCGiMO.jpg', 'Doctor Strange', '2024-12-20 20:42:43', '0000-00-00 00:00:00'),
(32, 201, 2, 'Chadwick Boseman', '/nL16SKfyP1b7Hk6LsuWiqMfbdb8.jpg', 'T\'Challa / Black Panther', '2024-12-20 20:42:43', '0000-00-00 00:00:00'),
(33, 202, 2, 'Margaret Qualley', '/jStNyMj3acpLuH48awLVLqqlyaV.jpg', 'Sue', '2024-12-20 20:43:58', '0000-00-00 00:00:00'),
(34, 202, 2, 'Dennis Quaid', '/lMaDAJHzsKH7U3dln2B3kY3rOhE.jpg', 'Harvey', '2024-12-20 20:43:58', '0000-00-00 00:00:00'),
(35, 202, 2, 'Edward Hamilton-Clark', '/q1EWL2z2xMcbf84TpOTqGs6Csxs.jpg', 'Fred', '2024-12-20 20:43:58', '0000-00-00 00:00:00'),
(36, 202, 2, 'Demi Moore', '/gPgZSodybMFBodw7nKRTALONIr2.jpg', 'Elisabeth', '2024-12-20 20:43:58', '0000-00-00 00:00:00'),
(37, 202, 2, 'Gore Abrams', '/bKMTqbl0FYlzIC6aTMKQZNAhhXK.jpg', 'Oliver', '2024-12-20 20:43:58', '0000-00-00 00:00:00'),
(38, 202, 2, 'Oscar Lesage', '/6yd3eODeuk0nuiFYbmLzpDTL5k2.jpg', 'Troy', '2024-12-20 20:43:58', '0000-00-00 00:00:00'),
(39, 202, 2, 'Robin Greer', '/ndu0tbz16mtOchMROcnJf2pPchg.jpg', 'Male Nurse', '2024-12-20 20:43:59', '0000-00-00 00:00:00'),
(40, 202, 2, 'Tom Morton', '/aOdP4niQX4ckaFwPQmbf0mlYTC5.jpg', 'Doctor', '2024-12-20 20:43:59', '0000-00-00 00:00:00'),
(41, 202, 2, 'Hugo Diego Garcia', '/mC0Aly8hHgNIYvZSa1SZmYU47pn.jpg', 'Diego - Boyfriend', '2024-12-20 20:43:59', '0000-00-00 00:00:00'),
(42, 202, 2, 'Christian Erickson', '/cpEzQNW1EsRmK8SMj4y5xwevXwM.jpg', 'Man at Diner', '2024-12-20 20:43:59', '0000-00-00 00:00:00'),
(63, 205, 2, 'Dwayne Johnson', '/5QApZVV8FUFlVxQpIK3Ew6cqotq.jpg', 'Callum Drift', '2024-12-20 21:31:29', '0000-00-00 00:00:00'),
(64, 205, 2, 'Chris Evans', '/3bOGNsHlrswhyW79uvIHH1V43JI.jpg', 'Jack O\'Malley', '2024-12-20 21:31:29', '0000-00-00 00:00:00'),
(65, 205, 2, 'J.K. Simmons', '/ScmKoJ9eiSUOthAt1PDNLi8Fkw.jpg', 'Nick', '2024-12-20 21:31:29', '0000-00-00 00:00:00'),
(66, 205, 2, 'Kiernan Shipka', '/t2FWVLTIhVRIa398mQAfN4thO5R.jpg', 'Gryla', '2024-12-20 21:31:29', '0000-00-00 00:00:00'),
(67, 205, 2, 'Lucy Liu', '/9nbtjqsx3De7hO2XDtrBQ7M9VCH.jpg', 'Zoe', '2024-12-20 21:31:29', '0000-00-00 00:00:00'),
(68, 205, 2, 'Bonnie Hunt', '/tT9C6uLztgN8OxJULq6F9iEzqlA.jpg', 'Mrs. Claus', '2024-12-20 21:31:29', '0000-00-00 00:00:00'),
(69, 205, 2, 'Kristofer Hivju', '/bACL39GihNmBnFRay78rS3PUHsH.jpg', 'Krampus', '2024-12-20 21:31:29', '0000-00-00 00:00:00'),
(70, 205, 2, 'Nick Kroll', '/vdgpGtSXqTBnIKrKNMZocdFu7pX.jpg', 'Ted', '2024-12-20 21:31:29', '0000-00-00 00:00:00'),
(71, 205, 2, 'Mary Elizabeth Ellis', '/8tf8w69Bl6MO5P8r8Vk6dFnHKxx.jpg', 'Olivia', '2024-12-20 21:31:29', '0000-00-00 00:00:00'),
(72, 205, 2, 'Wesley Kimmel', '/lN3VfrQiYmU9ldZRHie8PQtnOe2.jpg', 'Dylan', '2024-12-20 21:31:29', '0000-00-00 00:00:00'),
(73, 206, 2, 'Yolonda Ross', '/ifu8J2Je89W2O2MwOO8P5GW7fYb.jpg', 'Woman', '2024-12-20 21:37:46', '0000-00-00 00:00:00'),
(74, 206, 2, 'Daniel Diemer', '/sBMsEkBqQhAQtiCmpBgyZRUns3m.jpg', 'Kyle Conner', '2024-12-20 21:37:46', '0000-00-00 00:00:00'),
(75, 206, 2, 'Frankie Shaw', '/yY8wTV6PCnkuW333D15yqsdBfYg.jpg', 'Daisy', '2024-12-20 21:37:46', '0000-00-00 00:00:00'),
(76, 206, 2, 'Liam Neeson', '/sRLev3wJioBgun3ZoeAUFpkLy0D.jpg', 'Thug', '2024-12-20 21:37:46', '0000-00-00 00:00:00'),
(77, 206, 2, 'Ron Perlman', '/9riPBfsWpzEzh2y9ucxTW22iakI.jpg', 'Charlie Conner', '2024-12-20 21:37:46', '0000-00-00 00:00:00'),
(78, 206, 2, 'Javier Molina', '/40cs8RRYgg9z1CcQApsVLKqoPSE.jpg', 'Gamberro', '2024-12-20 21:37:46', '0000-00-00 00:00:00'),
(79, 206, 2, 'Jimmy Gonzales', '/jEJ5TdOeqOJyopKMEc8w9qDtsuN.jpg', 'Diego Machado', '2024-12-20 21:37:46', '0000-00-00 00:00:00'),
(80, 206, 2, 'Deanna Tarraza', '/loZuTtsJmFsMxuaOoa2gY4pV8bA.jpg', 'Araceli', '2024-12-20 21:37:46', '0000-00-00 00:00:00'),
(81, 206, 2, 'Josh Drennen', '/fQ6zkA9AbEoA0KFqlyPNQ6eQxjp.jpg', 'Thug\'s Dad', '2024-12-20 21:37:46', '0000-00-00 00:00:00'),
(82, 206, 2, 'Terrence Pulliam', '/fV5rlcCScCcRxkkEd36fLKJLQDR.jpg', 'Dre', '2024-12-20 21:37:46', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `tmdbId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `overview` text NOT NULL,
  `popularity` float NOT NULL,
  `releaseDate` date NOT NULL,
  `voteAverage` float NOT NULL,
  `backdropPath` varchar(255) NOT NULL,
  `posterPath` varchar(255) NOT NULL,
  `isFeatured` tinyint(1) NOT NULL DEFAULT 0,
  `dateCreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `dateUpdated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`id`, `userId`, `tmdbId`, `title`, `overview`, `popularity`, `releaseDate`, `voteAverage`, `backdropPath`, `posterPath`, `isFeatured`, `dateCreated`, `dateUpdated`) VALUES
(195, 2, 912649, 'Venom: The Last Dance', 'Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down on Venom and Eddie\'s last dance.', 4767.2, '2024-10-22', 6.8, '/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg', '/aosm8NMQ3UyoBVpSxyimorCQykC.jpg', 0, '2024-12-20 20:10:51', '0000-00-00 00:00:00'),
(196, 2, 1241982, 'Moana 3', 'After receiving an unexpected call from her wayfinding ancestors, Moana journeys alongside Maui and a new crew to the far seas of Oceania and into dangerous, long-lost waters for an adventure unlike anything she\'s ever faced.', 2865.48, '2024-11-21', 7, '/tElnmtQ6yz1PjN1kePNl8yMSb59.jpg', '/khwDcPYD5xo6B8404mGGe6pYWtI.jpg', 0, '2024-12-20 20:10:53', '0000-00-00 00:00:00'),
(197, 2, 1138194, 'Heretic', 'Two young missionaries are forced to prove their faith when they knock on the wrong door and are greeted by a diabolical Mr. Reed, becoming ensnared in his deadly game of cat-and-mouse.', 1042.38, '2024-10-31', 7.2, '/ag66gJCiZ06q1GSJuQlhGLi3Udx.jpg', '/5HJqjCTcaE1TFwnNh3Dn21be2es.jpg', 0, '2024-12-20 20:24:18', '0000-00-00 00:00:00'),
(198, 2, 1035048, 'Elevation', 'A single father and two women venture from the safety of their homes to face monstrous creatures to save the life of a young boy.', 1626.09, '2024-11-07', 6.4, '/au3o84ub27qTZiMiEc9UYzN74V3.jpg', '/uQhYBxOVFU6s9agD49FnGHwJqG5.jpg', 0, '2024-12-20 20:24:50', '0000-00-00 00:00:00'),
(201, 2, 299536, 'Avengers: Infinity War', 'As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.', 213.561, '2018-04-25', 8.243, '/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg', '/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg', 0, '2024-12-20 20:42:42', '0000-00-00 00:00:00'),
(202, 2, 933260, 'The Substance', 'A fading celebrity decides to use a black market drug, a cell-replicating substance that temporarily creates a younger, better version of herself.', 765.307, '2024-09-07', 7.231, '/t98L9uphqBSNn2Mkvdm3xSFCQyi.jpg', '/lqoMzCcZYEFK729d6qzt349fB4o.jpg', 0, '2024-12-20 20:43:58', '0000-00-00 00:00:00'),
(203, 2, 762509, 'Mufasa: The Lion King', 'Told in flashbacks, Mufasa is an orphaned cub, lost and alone until he meets a sympathetic lion named Taka—the heir to a royal bloodline. The chance meeting sets in motion a journey of misfits searching for their destiny and working together to evade a threatening and deadly foe.', 1653.94, '2024-12-18', 6.5, '/hT2yA8oaKVjXHjPWlmy08fdPz9p.jpg', '/lurEK87kukWNaHd0zYnsi3yzJrs.jpg', 0, '2024-12-20 20:47:45', '0000-00-00 00:00:00'),
(205, 2, 845781, 'Red One', 'After Santa Claus (codename: Red One) is kidnapped, the North Pole\'s Head of Security must team up with the world\'s most infamous tracker in a globe-trotting, action-packed mission to save Christmas.', 6741.4, '2024-10-31', 7, '/cjEcqdRdPQJhYre3HUAc5538Gk8.jpg', '/cdqLnri3NEGcmfnqwk2TSIYtddg.jpg', 0, '2024-12-20 21:31:28', '0000-00-00 00:00:00'),
(206, 2, 974453, 'Absolution', 'An aging ex-boxer gangster working as muscle for a Boston crime boss receives an upsetting diagnosis.  Despite a faltering memory, he attempts to rectify the sins of his past and reconnect with his estranged children. He is determined to leave a positive legacy for his grandson, but the criminal underworld isn’t done with him and won’t loosen their grip willingly.', 1211.19, '2024-10-31', 6.1, '/6lE2e6j8qbtQR8aHxQNJlwxdmKV.jpg', '/cNtAslrDhk1i3IOZ16vF7df6lMy.jpg', 0, '2024-12-20 21:37:45', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `photos`
--

CREATE TABLE `photos` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `movieId` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `dateUpdated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `photos`
--

INSERT INTO `photos` (`id`, `userId`, `movieId`, `url`, `description`, `dateCreated`, `dateUpdated`) VALUES
(3, 2, 198, '/au3o84ub27qTZiMiEc9UYzN74V3.jpg', 'Backdrop image for Elevation', '2024-12-20 20:24:50', '0000-00-00 00:00:00'),
(4, 2, 198, '/kFuRs6RW2wxCg4ilYUIyEpPQA1Y.jpg', 'Backdrop image for Elevation', '2024-12-20 20:24:50', '0000-00-00 00:00:00'),
(5, 2, 198, '/hNZEYoMhAIKd2UzGJb8r9KAnJtl.jpg', 'Backdrop image for Elevation', '2024-12-20 20:24:50', '0000-00-00 00:00:00'),
(6, 2, 198, '/yH2SBOH54ogloUMkeyzMaxCANU.jpg', 'Backdrop image for Elevation', '2024-12-20 20:24:50', '0000-00-00 00:00:00'),
(7, 2, 198, '/pXrgDsqzgYvU7hFBEkmYyTOOxzF.jpg', 'Backdrop image for Elevation', '2024-12-20 20:24:50', '0000-00-00 00:00:00'),
(18, 2, 201, '/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg', 'Backdrop image for Avengers: Infinity War', '2024-12-20 20:42:43', '0000-00-00 00:00:00'),
(19, 2, 201, '/k3xGG77CAiB0Wr2Y1H3ApihKTkk.jpg', 'Backdrop image for Avengers: Infinity War', '2024-12-20 20:42:43', '0000-00-00 00:00:00'),
(20, 2, 201, '/lmZFxXgJE3vgrciwuDib0N8CfQo.jpg', 'Backdrop image for Avengers: Infinity War', '2024-12-20 20:42:43', '0000-00-00 00:00:00'),
(21, 2, 201, '/sbpTzyKkBedre1CjExJMNawEbHB.jpg', 'Backdrop image for Avengers: Infinity War', '2024-12-20 20:42:43', '0000-00-00 00:00:00'),
(22, 2, 201, '/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg', 'Backdrop image for Avengers: Infinity War', '2024-12-20 20:42:43', '0000-00-00 00:00:00'),
(23, 2, 202, '/pQesMch1KeIfpCwoZfMPTZDR5Gd.jpg', 'Backdrop image for The Substance', '2024-12-20 20:43:59', '0000-00-00 00:00:00'),
(24, 2, 202, '/t98L9uphqBSNn2Mkvdm3xSFCQyi.jpg', 'Backdrop image for The Substance', '2024-12-20 20:43:59', '0000-00-00 00:00:00'),
(25, 2, 202, '/7h6TqPB3ESmjuVbxCxAeB1c9OB1.jpg', 'Backdrop image for The Substance', '2024-12-20 20:43:59', '0000-00-00 00:00:00'),
(26, 2, 202, '/8dqZsevb5E8x29OFyr1neSp7bc9.jpg', 'Backdrop image for The Substance', '2024-12-20 20:43:59', '0000-00-00 00:00:00'),
(27, 2, 202, '/seg7WCWcprQ4vABydxsA8W36TNp.jpg', 'Backdrop image for The Substance', '2024-12-20 20:43:59', '0000-00-00 00:00:00'),
(38, 2, 205, '/bHkn3yuOFdu5LJcq67Odofhx6cb.jpg', 'Backdrop image for Red One', '2024-12-20 21:31:29', '0000-00-00 00:00:00'),
(39, 2, 205, '/r71Zi3jdqyebvtGQVjSeGJyN8sw.jpg', 'Backdrop image for Red One', '2024-12-20 21:31:29', '0000-00-00 00:00:00'),
(40, 2, 205, '/GYSGFLHutvDxBRDsmnai9Ws76O.jpg', 'Backdrop image for Red One', '2024-12-20 21:31:29', '0000-00-00 00:00:00'),
(41, 2, 205, '/iXa4jEaMRTEoSwfd0qf8VTVeJD1.jpg', 'Backdrop image for Red One', '2024-12-20 21:31:29', '0000-00-00 00:00:00'),
(42, 2, 205, '/cjEcqdRdPQJhYre3HUAc5538Gk8.jpg', 'Backdrop image for Red One', '2024-12-20 21:31:29', '0000-00-00 00:00:00'),
(43, 2, 206, '/6lE2e6j8qbtQR8aHxQNJlwxdmKV.jpg', 'Backdrop image for Absolution', '2024-12-20 21:37:46', '0000-00-00 00:00:00'),
(44, 2, 206, '/iwWMvEMshk8Etv9AHJ6cSV0xMaR.jpg', 'Backdrop image for Absolution', '2024-12-20 21:37:46', '0000-00-00 00:00:00'),
(45, 2, 206, '/nOoGIymGBNtA7AEN0B6nshSEQ1p.jpg', 'Backdrop image for Absolution', '2024-12-20 21:37:46', '0000-00-00 00:00:00'),
(46, 2, 206, '/b7bTWZhpXg9cf4XkApUxvBv7pP0.jpg', 'Backdrop image for Absolution', '2024-12-20 21:37:46', '0000-00-00 00:00:00'),
(47, 2, 206, '/gRwen2Gg8NfQ9XYSvK0OqBCgDTz.jpg', 'Backdrop image for Absolution', '2024-12-20 21:37:46', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(128) NOT NULL,
  `middleName` varchar(128) NOT NULL,
  `lastName` varchar(128) NOT NULL,
  `contactNo` varchar(15) NOT NULL,
  `role` enum('admin','user') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `firstName`, `middleName`, `lastName`, `contactNo`, `role`) VALUES
(2, 'marvin@mail.com', 'dba0079f1cb3a3b56e102dd5e04fa2af', 'marvin', 'marvin', 'marvin', '123', 'user'),
(3, 'admin@mail.com', '21232f297a57a5a743894a0e4a801fc3', 'admin', 'admin', 'admin', '123', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `movieId` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `site` varchar(255) NOT NULL,
  `videoKey` varchar(255) NOT NULL,
  `videoType` varchar(255) NOT NULL,
  `official` tinyint(1) NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `dateUpdated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `videos`
--

INSERT INTO `videos` (`id`, `userId`, `movieId`, `url`, `name`, `site`, `videoKey`, `videoType`, `official`, `dateCreated`, `dateUpdated`) VALUES
(17, 2, 201, 'https://www.youtube.com/watch?v=PARfU2Vi694', 'Avengers vs Ebony Maw & Cull Obsidian | Avengers Infinity War (2018) IMAX Movie Clip HD 4K', 'YouTube', 'PARfU2Vi694', 'Clip', 0, '2024-12-20 20:42:44', '0000-00-00 00:00:00'),
(18, 2, 201, 'https://www.youtube.com/watch?v=jQoNILVFFvs', 'Avengers: Infinity War (2018) - \"Dangers Of Strangers\" | Movie Clip', 'YouTube', 'jQoNILVFFvs', 'Clip', 0, '2024-12-20 20:42:44', '0000-00-00 00:00:00'),
(19, 2, 201, 'https://www.youtube.com/watch?v=49xWJJvpjzI', 'Thor Arrives In Wakanda Scene - Avengers Infinity War (2018) Movie CLIP 4K ULTRA HD', 'YouTube', '49xWJJvpjzI', 'Clip', 0, '2024-12-20 20:42:44', '0000-00-00 00:00:00'),
(20, 2, 201, 'https://www.youtube.com/watch?v=PbRmbhdHDDM', '\"Family\" Featurette', 'YouTube', 'PbRmbhdHDDM', 'Featurette', 1, '2024-12-20 20:42:44', '0000-00-00 00:00:00'),
(21, 2, 201, 'https://www.youtube.com/watch?v=LXPaDL_oILs', '\"Legacy\" TV Spot', 'YouTube', 'LXPaDL_oILs', 'Teaser', 1, '2024-12-20 20:42:44', '0000-00-00 00:00:00'),
(22, 2, 201, 'https://www.youtube.com/watch?v=_XkUdr0EDwk', 'AVENGERS 3: Infinity War All Bonus Features & Bloopers (2018)', 'YouTube', '_XkUdr0EDwk', 'Featurette', 0, '2024-12-20 20:42:44', '0000-00-00 00:00:00'),
(23, 2, 201, 'https://www.youtube.com/watch?v=5iOhzJdDawE', 'Chant TV Spot', 'YouTube', '5iOhzJdDawE', 'Teaser', 1, '2024-12-20 20:42:44', '0000-00-00 00:00:00'),
(24, 2, 201, 'https://www.youtube.com/watch?v=QwievZ1Tx-8', 'Official Trailer #2', 'YouTube', 'QwievZ1Tx-8', 'Trailer', 1, '2024-12-20 20:42:44', '0000-00-00 00:00:00'),
(25, 2, 201, 'https://www.youtube.com/watch?v=pVxOVlm_lE8', 'Big Game Spot', 'YouTube', 'pVxOVlm_lE8', 'Teaser', 1, '2024-12-20 20:42:44', '0000-00-00 00:00:00'),
(26, 2, 201, 'https://www.youtube.com/watch?v=3VbHg5fqBYw', 'Fans reaction Trailer Tease', 'YouTube', '3VbHg5fqBYw', 'Teaser', 1, '2024-12-20 20:42:44', '0000-00-00 00:00:00'),
(27, 2, 201, 'https://www.youtube.com/watch?v=6ZfuNTqbHE8', 'Official Trailer', 'YouTube', '6ZfuNTqbHE8', 'Trailer', 1, '2024-12-20 20:42:44', '0000-00-00 00:00:00'),
(28, 2, 201, 'https://www.youtube.com/watch?v=sAOzrChqmd0', 'Action...Avengers: Infinity War', 'YouTube', 'sAOzrChqmd0', 'Behind the Scenes', 1, '2024-12-20 20:42:44', '0000-00-00 00:00:00'),
(29, 2, 202, 'https://www.youtube.com/watch?v=BKcMm5RG2M4', 'Q&A with Coralie Fargeat & Guillermo del Toro', 'YouTube', 'BKcMm5RG2M4', 'Featurette', 1, '2024-12-20 20:43:59', '0000-00-00 00:00:00'),
(30, 2, 202, 'https://www.youtube.com/watch?v=Rk3u4_IH0cY', 'Official Clip - Pretty Girls Should Always Smile', 'YouTube', 'Rk3u4_IH0cY', 'Clip', 1, '2024-12-20 20:43:59', '0000-00-00 00:00:00'),
(31, 2, 202, 'https://www.youtube.com/watch?v=jNQtxvA2zPY', 'Official Interview - Margaret Qualley', 'YouTube', 'jNQtxvA2zPY', 'Featurette', 1, '2024-12-20 20:43:59', '0000-00-00 00:00:00'),
(32, 2, 202, 'https://www.youtube.com/watch?v=DBiPdgIZt1g', 'In Conversation with THE SUBSTANCE Filmmaker Coralie Fargeat', 'YouTube', 'DBiPdgIZt1g', 'Featurette', 1, '2024-12-20 20:43:59', '0000-00-00 00:00:00'),
(33, 2, 202, 'https://www.youtube.com/watch?v=O9nfzMT05ck', 'Official Clip - Get Ready With Me', 'YouTube', 'O9nfzMT05ck', 'Clip', 1, '2024-12-20 20:43:59', '0000-00-00 00:00:00'),
(34, 2, 202, 'https://www.youtube.com/watch?v=HGmRKUYWN48', 'Official Interview - Demi Moore at Cannes Film Festival', 'YouTube', 'HGmRKUYWN48', 'Featurette', 1, '2024-12-20 20:43:59', '0000-00-00 00:00:00'),
(35, 2, 202, 'https://www.youtube.com/watch?v=lR5nlovVgvQ', 'Official Trailer #2', 'YouTube', 'lR5nlovVgvQ', 'Trailer', 1, '2024-12-20 20:44:00', '0000-00-00 00:00:00'),
(36, 2, 202, 'https://www.youtube.com/watch?v=0uUEiKr9FmA', 'The Substance (2024) - \"I\'m Sue\"', 'YouTube', '0uUEiKr9FmA', 'Clip', 0, '2024-12-20 20:44:00', '0000-00-00 00:00:00'),
(37, 2, 202, 'https://www.youtube.com/watch?v=kEWzeBLhLD4', 'THE SUBSTANCE - Coralie Fargeat rips beauty standards to gory shreds | MUBI Podcast', 'YouTube', 'kEWzeBLhLD4', 'Featurette', 1, '2024-12-20 20:44:00', '0000-00-00 00:00:00'),
(38, 2, 202, 'https://www.youtube.com/watch?v=QzbgCI-FFu0', 'Official Clip - Lucky Day', 'YouTube', 'QzbgCI-FFu0', 'Clip', 1, '2024-12-20 20:44:00', '0000-00-00 00:00:00'),
(39, 2, 202, 'https://www.youtube.com/watch?v=1_SSwbYYIQc', 'Breaking Down THE SUBSTANCE\'s Shrimp Scene', 'YouTube', '1_SSwbYYIQc', 'Featurette', 1, '2024-12-20 20:44:00', '0000-00-00 00:00:00'),
(40, 2, 202, 'https://www.youtube.com/watch?v=4dzYB2JiMAA', 'Official Clip - I\'d Like To Order', 'YouTube', '4dzYB2JiMAA', 'Clip', 1, '2024-12-20 20:44:00', '0000-00-00 00:00:00'),
(41, 2, 202, 'https://www.youtube.com/watch?v=aA-vyoIPcL4', 'The hype is real', 'YouTube', 'aA-vyoIPcL4', 'Featurette', 1, '2024-12-20 20:44:00', '0000-00-00 00:00:00'),
(42, 2, 202, 'https://www.youtube.com/watch?v=LNlrGhBpYjc', 'Official Trailer', 'YouTube', 'LNlrGhBpYjc', 'Trailer', 1, '2024-12-20 20:44:00', '0000-00-00 00:00:00'),
(43, 2, 202, 'https://www.youtube.com/watch?v=B1B3HZRHpEw', 'Official Teaser', 'YouTube', 'B1B3HZRHpEw', 'Teaser', 1, '2024-12-20 20:44:00', '0000-00-00 00:00:00'),
(44, 2, 202, 'https://www.youtube.com/watch?v=seyGZLvAauk', 'TIFF 2024 Q&A', 'YouTube', 'seyGZLvAauk', 'Featurette', 1, '2024-12-20 20:44:00', '0000-00-00 00:00:00'),
(45, 2, 202, 'https://www.youtube.com/watch?v=86wkRfWQWiY', 'Mark it in your calendar', 'YouTube', '86wkRfWQWiY', 'Teaser', 1, '2024-12-20 20:44:00', '0000-00-00 00:00:00'),
(46, 2, 202, 'https://www.youtube.com/watch?v=U-RxVJrLKrk', 'Official Clip', 'YouTube', 'U-RxVJrLKrk', 'Clip', 1, '2024-12-20 20:44:00', '0000-00-00 00:00:00'),
(111, 2, 205, 'https://www.youtube.com/watch?v=XlUu7QU_7I8', 'Quick Draw with the Cast', 'YouTube', 'XlUu7QU_7I8', 'Featurette', 1, '2024-12-20 21:31:30', '0000-00-00 00:00:00'),
(112, 2, 205, 'https://www.youtube.com/watch?v=syASIeI7I0E', 'Red One Comes Home', 'YouTube', 'syASIeI7I0E', 'Featurette', 1, '2024-12-20 21:31:30', '0000-00-00 00:00:00'),
(113, 2, 205, 'https://www.youtube.com/watch?v=tJ-i_dFBsDc', 'Suit up', 'YouTube', 'tJ-i_dFBsDc', 'Teaser', 1, '2024-12-20 21:31:30', '0000-00-00 00:00:00'),
(114, 2, 205, 'https://www.youtube.com/watch?v=TMDR2_4223Y', 'The Most Wonderful Time Of The Year Featurette', 'YouTube', 'TMDR2_4223Y', 'Featurette', 1, '2024-12-20 21:31:30', '0000-00-00 00:00:00'),
(115, 2, 205, 'https://www.youtube.com/watch?v=9YumnnfaED8', 'Wish', 'YouTube', '9YumnnfaED8', 'Teaser', 1, '2024-12-20 21:31:30', '0000-00-00 00:00:00'),
(116, 2, 205, 'https://www.youtube.com/watch?v=c1nIlvynTC4', 'Streaming December 12', 'YouTube', 'c1nIlvynTC4', 'Teaser', 1, '2024-12-20 21:31:30', '0000-00-00 00:00:00'),
(117, 2, 205, 'https://www.youtube.com/watch?v=BbShpkOEs6A', 'Let\'s Save Christmas', 'YouTube', 'BbShpkOEs6A', 'Teaser', 1, '2024-12-20 21:31:30', '0000-00-00 00:00:00'),
(118, 2, 205, 'https://www.youtube.com/watch?v=hwfgp7HvsU4', 'London Launch', 'YouTube', 'hwfgp7HvsU4', 'Featurette', 1, '2024-12-20 21:31:30', '0000-00-00 00:00:00'),
(119, 2, 205, 'https://www.youtube.com/watch?v=vqTlP-3SlAs', 'The Rock x Thursday Night Football', 'YouTube', 'vqTlP-3SlAs', 'Featurette', 1, '2024-12-20 21:31:30', '0000-00-00 00:00:00'),
(120, 2, 205, 'https://www.youtube.com/watch?v=CzlOv1bJugQ', 'Christmas Ad', 'YouTube', 'CzlOv1bJugQ', 'Teaser', 1, '2024-12-20 21:31:30', '0000-00-00 00:00:00'),
(121, 2, 205, 'https://www.youtube.com/watch?v=2CvdsyN5yKs', 'See it in IMAX', 'YouTube', '2CvdsyN5yKs', 'Featurette', 1, '2024-12-20 21:31:30', '0000-00-00 00:00:00'),
(122, 2, 205, 'https://www.youtube.com/watch?v=BJqPkhWglgk', 'TNT x Red One - Rugby Spot', 'YouTube', 'BJqPkhWglgk', 'Featurette', 1, '2024-12-20 21:31:30', '0000-00-00 00:00:00'),
(123, 2, 205, 'https://www.youtube.com/watch?v=ThJ9XCXLR44', 'Two Turtle Doves Featurette', 'YouTube', 'ThJ9XCXLR44', 'Featurette', 1, '2024-12-20 21:31:30', '0000-00-00 00:00:00'),
(124, 2, 205, 'https://www.youtube.com/watch?v=7l3hfD74X-4', 'Official Trailer 2', 'YouTube', '7l3hfD74X-4', 'Trailer', 1, '2024-12-20 21:31:30', '0000-00-00 00:00:00'),
(125, 2, 205, 'https://www.youtube.com/watch?v=U8XH3W0cMss', 'Official Trailer', 'YouTube', 'U8XH3W0cMss', 'Trailer', 1, '2024-12-20 21:31:30', '0000-00-00 00:00:00'),
(126, 2, 206, 'https://www.youtube.com/watch?v=LjWugS6tsFU', '10 Minute Extended Preview', 'YouTube', 'LjWugS6tsFU', 'Clip', 1, '2024-12-20 21:37:46', '0000-00-00 00:00:00'),
(127, 2, 206, 'https://www.youtube.com/watch?v=m0zbtMTXZog', 'Official UK Trailer', 'YouTube', 'm0zbtMTXZog', 'Trailer', 1, '2024-12-20 21:37:47', '0000-00-00 00:00:00'),
(128, 2, 206, 'https://www.youtube.com/watch?v=dQizVHKL5T0', 'Official Trailer', 'YouTube', 'dQizVHKL5T0', 'Trailer', 1, '2024-12-20 21:37:47', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `casts`
--
ALTER TABLE `casts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `casts`
--
ALTER TABLE `casts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=207;

--
-- AUTO_INCREMENT for table `photos`
--
ALTER TABLE `photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=129;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
