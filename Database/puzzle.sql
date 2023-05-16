-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: bgt2xobcjk6qwovypheb-mysql.services.clever-cloud.com:3306
-- Generation Time: May 16, 2023 at 04:06 AM
-- Server version: 8.0.22-13
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bgt2xobcjk6qwovypheb`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `score` int DEFAULT '0',
  `incorrect` int DEFAULT NULL,
  `accuracy` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `username`, `password`, `email`, `score`, `incorrect`, `accuracy`) VALUES
(1, 'test', 'test', 'test@gmail.com', 5, 0, '100.00'),
(2, 'test1', 'test1', 'test1@gmail.com', 0, 0, '0.00'),
(3, 'test2', 'test2', 'test2@gmail.com', 1, 2, '100.00');

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`, `email`) VALUES
(1, 'admin', 'admin123@', 'admin@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `questionbank`
--

CREATE TABLE `questionbank` (
  `qno` int NOT NULL,
  `question` varchar(2000) NOT NULL,
  `answer` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `questionbank`
--

INSERT INTO `questionbank` (`qno`, `question`, `answer`) VALUES
(1, '\"Who is the billionaire genius that built the Iron Man suit?\"\r\nHint 1: He is known for his witty remarks and his company, Stark Industries.\r\nHint 2: T__y S_a_k', 'Tony Stark'),
(2, '\"Which Avenger is known for his incredible archery skills?\"\r\nHint 1 : He never misses his target. ', 'Hawkeye'),
(3, '\"What is the real name of the Norse god of thunder?\"\r\nHint: He wields a mighty hammer called Mjolnir.', 'Thor'),
(4, '\"What is the name of the powerful artifact that allows its bearer to control space?\"\r\nHint: It is a blue-colored cube.', 'Tesseract'),
(5, '\"Who is the android created by Tony Stark and Bruce Banner?\"\r\nHint: He has a unique ability to lift Thor\'s hammer.', 'Vision');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `questionbank`
--
ALTER TABLE `questionbank`
  ADD PRIMARY KEY (`qno`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
