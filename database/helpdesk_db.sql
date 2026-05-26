-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 26, 2026 at 11:28 AM
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
-- Database: `helpdesk_db`
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
(27, 26, 1, 'assigned ticket', '2026-05-26 08:34:29');

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
(26, 'Email Attachment Upload Failed', 'Unable to send attachments larger than 10MB via email.', 'medium', 'in_progress', 13, 1, '2026-05-26 08:20:41', '2026-05-26 08:34:28', ''),
(27, 'Microphone Not Working in Meetings', 'My microphone is not working in Zoom/Teams even though it is detected.', 'high', 'in_progress', 13, 1, '2026-05-26 08:22:05', '2026-05-26 08:34:11', ''),
(28, 'Software Installation Request', 'I need VS COde and Node.js installed for my development work.', 'low', 'open', 13, NULL, '2026-05-26 08:23:10', '2026-05-26 08:29:13', ''),
(29, 'Wi-Fi Disconnecting Frequently', 'My Wi-Fi keeps disconnecting during meetings and file uploads.', 'high', 'in_progress', 13, 1, '2026-05-26 08:24:23', '2026-05-26 08:34:01', ''),
(30, 'Printer Offline Issue', 'The office printer shows offline for all users in my department.', 'high', 'in_progress', 17, 1, '2026-05-26 08:26:26', '2026-05-26 08:33:51', ''),
(31, 'Outlook Emails Not Syncing', 'New emails are not appearing in Outlook desktop app, but webmail is working fine.', 'medium', 'open', 17, NULL, '2026-05-26 08:27:54', '2026-05-26 08:27:54', '');

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
(1, 'Admin', 'admin@test.com', '12345678', 'admin', '2026-05-21 19:08:48'),
(13, 'User', 'user@test.com', '1234567890', 'user', '2026-05-24 17:00:57'),
(16, '', '', '', 'user', '2026-05-25 12:17:17'),
(17, 'User2', 'user2@test.com', '12345', 'user', '2026-05-25 12:17:17');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

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
