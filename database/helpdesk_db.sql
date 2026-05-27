-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: sql111.infinityfree.com
-- Generation Time: May 27, 2026 at 03:10 PM
-- Server version: 11.4.11-MariaDB
-- PHP Version: 7.2.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `if0_42026156_helpdesk_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity_logs`
--

CREATE TABLE `activity_logs` (
  `id` int(11) NOT NULL,
  `ticket_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `action` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activity_logs`
--

INSERT INTO `activity_logs` (`id`, `ticket_id`, `user_id`, `action`, `created_at`) VALUES
(1, 0, 0, '', '2026-05-25 19:21:18'),
(2, 20, 1, 'changed priority to low', '2026-05-25 19:21:18'),
(3, 0, 0, '', '2026-05-25 19:25:02'),
(4, 20, 1, 'changed priority to medium', '2026-05-25 19:25:02'),
(5, 0, 0, '', '2026-05-25 19:30:17'),
(6, 20, 1, 'changed priority to low', '2026-05-25 19:30:17'),
(7, 0, 0, '', '2026-05-25 19:31:14'),
(8, 20, 1, 'changed priority to medium', '2026-05-25 19:31:15'),
(9, 0, 0, '', '2026-05-26 08:28:50'),
(10, 20, 1, 'deleted ticket', '2026-05-26 08:28:50'),
(11, 0, 0, '', '2026-05-26 08:29:15'),
(12, 28, 1, 'changed priority to low', '2026-05-26 08:29:15'),
(13, 0, 0, '', '2026-05-26 08:33:03'),
(14, 30, 1, 'assigned ticket', '2026-05-26 08:33:03'),
(15, 0, 0, '', '2026-05-26 08:33:15'),
(16, 29, 1, 'assigned ticket', '2026-05-26 08:33:15'),
(17, 0, 0, '', '2026-05-26 08:33:28'),
(18, 27, 1, 'assigned ticket', '2026-05-26 08:33:28'),
(19, 0, 0, '', '2026-05-26 08:33:53'),
(20, 30, 1, 'changed status to in_progress', '2026-05-26 08:33:53'),
(21, 0, 0, '', '2026-05-26 08:34:02'),
(22, 29, 1, 'changed status to in_progress', '2026-05-26 08:34:02'),
(23, 0, 0, '', '2026-05-26 08:34:12'),
(24, 27, 1, 'changed status to in_progress', '2026-05-26 08:34:12'),
(25, 0, 0, '', '2026-05-26 08:34:25'),
(26, 26, 1, 'changed status to in_progress', '2026-05-26 08:34:25'),
(27, 26, 1, 'assigned ticket', '2026-05-26 08:34:29'),
(28, 0, 0, '', '2026-05-26 14:49:09'),
(29, 32, 1, 'assigned ticket', '2026-05-26 14:49:10'),
(30, 0, 0, '', '2026-05-26 14:49:26'),
(31, 32, 1, 'changed status to resolved', '2026-05-26 14:49:26'),
(32, 0, 0, '', '2026-05-26 14:49:42'),
(33, 32, 1, 'changed status to closed', '2026-05-26 14:49:42'),
(34, 0, 0, '', '2026-05-26 14:50:29'),
(35, 29, 1, 'changed status to resolved', '2026-05-26 14:50:29'),
(36, 34, 1, 'assigned ticket', '2026-05-26 18:34:26'),
(37, 34, 1, 'changed status to in_progress', '2026-05-26 18:34:53'),
(38, 33, 1, 'changed priority to high', '2026-05-26 18:35:13'),
(39, 33, 1, 'assigned ticket', '2026-05-26 18:35:19'),
(40, 33, 1, 'changed status to in_progress', '2026-05-26 18:35:31'),
(41, 34, 20, 'changed priority to medium', '2026-05-26 19:06:45'),
(42, 34, 20, 'changed priority to high', '2026-05-26 19:06:50'),
(43, 34, 1, 'deleted ticket', '2026-05-26 19:14:33'),
(44, 43, 27, 'changed status to in_progress', '2026-05-27 19:07:17'),
(45, 42, 27, 'changed priority to low', '2026-05-27 19:07:40'),
(46, 44, 27, 'assigned ticket', '2026-05-27 19:07:49'),
(47, 44, 27, 'changed status to in_progress', '2026-05-27 19:08:10'),
(48, 39, 27, 'changed priority to high', '2026-05-27 19:08:34'),
(49, 39, 27, 'assigned ticket', '2026-05-27 19:08:45'),
(50, 42, 27, 'changed status to closed', '2026-05-27 19:09:23'),
(51, 44, 27, 'changed status to resolved', '2026-05-27 19:09:51');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `ticket_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comment` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `priority` enum('low','medium','high') DEFAULT 'low',
  `status` enum('open','in_progress','resolved','closed') DEFAULT 'open',
  `created_by` int(11) DEFAULT NULL,
  `assigned_to` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `attachment` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`id`, `title`, `description`, `priority`, `status`, `created_by`, `assigned_to`, `created_at`, `updated_at`, `attachment`) VALUES
(39, 'Suspicious Login Activity', 'I received alerts of multiple failed login attempts on my account.', 'high', 'open', 28, 27, '2026-05-27 19:01:39', '2026-05-27 19:08:43', '1779908500_Test-Logo.svg.png'),
(40, 'Monitor Flickering Issue', 'External monitor flickers continuously after HDMI connection.', 'medium', 'open', 28, NULL, '2026-05-27 19:02:35', '2026-05-27 19:02:35', ''),
(41, 'Phishing Email Report', 'I received a suspicious email asking for login credentials', 'high', 'open', 28, NULL, '2026-05-27 19:03:14', '2026-05-27 19:03:14', ''),
(42, 'GitHub Repository Access Request', 'Please provide access to the project GitHub repository', 'low', 'closed', 22, NULL, '2026-05-27 19:04:53', '2026-05-27 19:09:21', ''),
(43, 'API Returning 500 Error', 'Login API is returning Internal Server Error after recent updates.', 'medium', 'in_progress', 22, NULL, '2026-05-27 19:05:34', '2026-05-27 19:07:15', ''),
(44, 'New Employee Account Setup', 'A new employee joined. Please create email, system access, and required permissions', 'high', 'resolved', 27, 27, '2026-05-27 19:06:37', '2026-05-27 19:09:49', '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`) VALUES
(22, 'user1', 'user1@test.com', '$2y$10$0WPSP9OECyu7/BuTHj/2B.VacLWPBTR5UpLjOEqsJXSGHXYolcZBS', 'user', '2026-05-27 18:26:18'),
(27, 'Admin', 'admin@test.com', '$2y$10$L2SyjuZ3qGff51FaKbSrH.FcHRcFlhhsfcEGUUzFengUb7WD0s0e6', 'admin', '2026-05-27 18:55:02'),
(28, 'user', 'user@test.com', '$2y$10$g6r5IcmJaGm8taR7IuFDUONdy/0Px7BwBj9tqENHmQ4L4Tnj09dJ6', 'user', '2026-05-27 18:57:35'),
(29, 'user2', 'user2@test.com', '$2y$10$pof1MG29F1saZoTolNuGdugYUYccfJq64uvs.lvloJVz.Qluxqk1K', 'user', '2026-05-27 18:57:44');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ticket_id` (`ticket_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `assigned_to` (`assigned_to`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity_logs`
--
ALTER TABLE `activity_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tickets`
--
ALTER TABLE `tickets`
  ADD CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `tickets_ibfk_2` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
