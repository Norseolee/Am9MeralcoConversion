-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 12, 2024 at 12:42 PM
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
-- Database: `am9commercial`
--

-- --------------------------------------------------------

--
-- Table structure for table `knex_migrations`
--

CREATE TABLE `knex_migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `batch` int(11) DEFAULT NULL,
  `migration_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `knex_migrations`
--

INSERT INTO `knex_migrations` (`id`, `name`, `batch`, `migration_time`) VALUES
(1, '20240513195624_users_migration.js', 1, '2024-06-07 13:40:10'),
(2, '20240513200519_tenants_table.js', 1, '2024-06-07 13:40:10'),
(3, '20240513200737_meralco_table.js', 1, '2024-06-07 13:40:10'),
(4, '20240516052135_role_table.js', 1, '2024-06-07 13:40:10'),
(5, '20240602171418_payment.js', 1, '2024-06-07 13:40:10'),
(6, '20240602171852_mode_payment.js', 1, '2024-06-07 13:40:10');

-- --------------------------------------------------------

--
-- Table structure for table `knex_migrations_lock`
--

CREATE TABLE `knex_migrations_lock` (
  `index` int(10) UNSIGNED NOT NULL,
  `is_locked` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `knex_migrations_lock`
--

INSERT INTO `knex_migrations_lock` (`index`, `is_locked`) VALUES
(1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `meralco`
--

CREATE TABLE `meralco` (
  `meralco_id` int(11) NOT NULL,
  `tenant_id` int(11) NOT NULL,
  `per_kwh` decimal(10,1) DEFAULT 0.0,
  `due_date` varchar(100) DEFAULT NULL,
  `date_of_reading` varchar(100) DEFAULT NULL,
  `previous_reading` decimal(10,1) DEFAULT NULL,
  `current_reading` decimal(10,1) NOT NULL,
  `consume` decimal(10,1) NOT NULL,
  `is_paid` tinyint(1) DEFAULT NULL,
  `paid_date` date DEFAULT NULL,
  `total_amount` float(10,2) NOT NULL,
  `current_total_amount` float(10,2) NOT NULL,
  `created_at` date DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `meralco`
--

INSERT INTO `meralco` (`meralco_id`, `tenant_id`, `per_kwh`, `due_date`, `date_of_reading`, `previous_reading`, `current_reading`, `consume`, `is_paid`, `paid_date`, `total_amount`, `current_total_amount`, `created_at`, `is_deleted`) VALUES
(1, 2, 15.0, 'DECEMBER 12, 2023', 'DECEMBER 05, 2023', 2032.2, 2102.4, 70.2, NULL, NULL, 0.00, 0.00, '0000-00-00', 0),
(2, 12, 15.0, 'DECEMBER 12, 2023', 'DECEMBER 05, 2023', 4415.3, 4640.6, 225.3, NULL, NULL, 0.00, 0.00, '0000-00-00', 0),
(4, 3, 15.0, 'DECEMBER 12, 2023', 'DECEMBER 05, 2023', 296.5, 377.2, 80.7, NULL, NULL, 0.00, 0.00, '0000-00-00', 0),
(97, 34, 15.0, 'May 10, 2024', 'May 2, 2024', 1289.1, 1365.9, 0.0, NULL, NULL, 0.00, 0.00, '0000-00-00', 0),
(98, 5, 16.0, 'May 10, 2024', 'May 2, 2024', 4104.9, 4176.1, 71.2, NULL, NULL, 0.00, 0.00, '0000-00-00', 0),
(99, 3, 16.0, 'May 10, 2024', 'May 2, 2024', 591.2, 691.1, 99.9, NULL, NULL, 0.00, 0.00, '0000-00-00', 0),
(100, 2, 16.0, 'May 10, 2024', 'May 2, 2024', 2957.1, 3211.2, 254.1, NULL, NULL, 0.00, 0.00, '0000-00-00', 0),
(101, 12, 16.0, 'May 10, 2024', 'May 2, 2024', 5673.3, 5995.1, 321.8, NULL, NULL, 0.00, 0.00, '0000-00-00', 0),
(102, 8, 16.0, 'May 10, 2024', 'May 2, 2024', 1317.0, 1362.1, 45.1, NULL, NULL, 0.00, 0.00, '0000-00-00', 0),
(103, 13, 16.0, 'May 10, 2024', 'May 2, 2024', 602.5, 658.1, 55.6, NULL, NULL, 0.00, 0.00, '0000-00-00', 0),
(104, 7, 16.0, 'May 10, 2024', 'May 2, 2024', 2135.0, 2220.1, 85.1, NULL, NULL, 0.00, 0.00, '0000-00-00', 0),
(105, 11, 16.0, 'May 10, 2024', 'May 2, 2024', 1376.1, 1474.6, 98.5, NULL, NULL, 0.00, 0.00, '0000-00-00', 0),
(106, 10, 16.0, 'May 10, 2024', 'May 2, 2024', 1685.2, 1745.9, 60.7, NULL, NULL, 0.00, 0.00, '0000-00-00', 0),
(107, 14, 16.0, 'May 10, 2024', 'May 2, 2024', 1356.8, 1441.7, 84.9, NULL, NULL, 0.00, 0.00, '0000-00-00', 0),
(108, 9, 16.0, 'may 15, 2024', 'May 12, 2024', 2699.4, 2743.0, 43.6, NULL, NULL, 0.00, 0.00, '0000-00-00', 0),
(109, 33, 16.0, 'may 15, 2024', 'May 12, 2024', 346.8, 516.7, 169.9, NULL, NULL, 0.00, 0.00, '0000-00-00', 0),
(110, 30, 16.0, 'may 15, 2024', 'May 12, 2024', 3175.2, 3245.6, 70.4, NULL, NULL, 0.00, 0.00, '0000-00-00', 0),
(216, 2, 17.0, '2024-06-12', '2024-06-07', 3211.2, 3529.9, 318.7, 0, NULL, 5417.90, 0.00, '2024-06-07', 0),
(217, 3, 17.0, '2024-06-12', '2024-06-07', 855.3, 855.3, 0.0, 0, NULL, 0.00, 0.00, '2024-06-07', 0),
(218, 5, 17.0, '2024-06-12', '2024-06-07', 4176.1, 4256.2, 80.1, 0, NULL, 1361.70, 0.00, '2024-06-07', 0),
(219, 8, 17.0, '2024-06-12', '2024-06-07', 1362.1, 1410.7, 48.6, 0, NULL, 826.20, 0.00, '2024-06-07', 0),
(220, 9, 17.0, '2024-06-12', '2024-06-07', 2743.0, 2792.7, 49.7, 0, NULL, 844.90, 0.00, '2024-06-07', 0),
(221, 10, 17.0, '2024-06-12', '2024-06-07', 1745.9, 1813.5, 67.6, 0, NULL, 1149.20, 0.00, '2024-06-07', 0),
(222, 11, 17.0, '2024-06-12', '2024-06-07', 1474.6, 1590.4, 115.8, 0, NULL, 1968.60, 0.00, '2024-06-07', 0),
(223, 13, 17.0, '2024-06-12', '2024-06-07', 658.1, 736.5, 78.4, 0, NULL, 1332.80, 0.00, '2024-06-07', 0),
(224, 14, 17.0, '2024-06-12', '2024-06-07', 1441.7, 1584.0, 142.3, 0, NULL, 2419.10, 0.00, '2024-06-07', 0),
(225, 33, 17.0, '2024-06-12', '2024-06-07', 516.7, 518.7, 2.0, 0, NULL, 34.00, 0.00, '2024-06-07', 0),
(226, 34, 17.0, '2024-06-12', '2024-06-07', 1289.1, 1365.9, 76.8, 0, NULL, 1305.60, 0.00, '2024-06-07', 0),
(227, 12, 17.0, '2024-06-12', '2024-06-07', 5995.1, 6380.0, 384.9, 0, NULL, 6543.30, 0.00, '2024-06-07', 0),
(228, 27, 17.0, '2024-06-13', '2024-06-08', 376.9, 408.1, 31.2, 0, NULL, 530.40, 0.00, '2024-06-08', 0),
(229, 32, 17.0, '2024-06-13', '2024-06-08', 823.0, 900.4, 77.4, 0, NULL, 1315.80, 0.00, '2024-06-08', 0),
(230, 7, 17.0, '2024-06-13', '2024-06-08', 2220.1, 2345.5, 125.4, 0, NULL, 2131.80, 0.00, '2024-06-08', 0),
(231, 36, 17.0, '2024-06-13', '2024-06-08', 46.7, 46.7, 0.0, 0, NULL, 0.00, 0.00, '2024-06-08', 0),
(232, 37, 17.0, '2024-06-13', '2024-06-08', 351.3, 351.3, 0.0, 0, NULL, 0.00, 0.00, '2024-06-08', 0);

-- --------------------------------------------------------

--
-- Table structure for table `mode_payments`
--

CREATE TABLE `mode_payments` (
  `mode_payment_id` int(10) UNSIGNED NOT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mode_payments`
--

INSERT INTO `mode_payments` (`mode_payment_id`, `type`) VALUES
(1, 'Gcash'),
(2, 'Cash');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `payment_id` int(10) UNSIGNED NOT NULL,
  `tenant_id` int(11) NOT NULL,
  `payment_amount` int(11) NOT NULL,
  `total_amount` int(11) NOT NULL,
  `staff_id` int(11) NOT NULL,
  `mode_payment_id` int(10) UNSIGNED NOT NULL,
  `utility_id` int(11) NOT NULL,
  `payment_type` enum('meralco','maynilad','rent') NOT NULL,
  `created_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`payment_id`, `tenant_id`, `payment_amount`, `total_amount`, `staff_id`, `mode_payment_id`, `utility_id`, `payment_type`, `created_at`) VALUES
(1, 2, 1200, 1200, 1, 2, 223, 'meralco', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int(10) UNSIGNED NOT NULL,
  `roles_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `roles_name`) VALUES
(1, 'admin'),
(2, 'staff'),
(3, 'user');

-- --------------------------------------------------------

--
-- Table structure for table `tenants`
--

CREATE TABLE `tenants` (
  `tenant_id` int(11) NOT NULL,
  `user_id` int(255) DEFAULT NULL,
  `business_name` varchar(200) NOT NULL,
  `unit` varchar(200) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `contact_number` varchar(255) NOT NULL,
  `lease_start` date DEFAULT NULL,
  `lease_end` date DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `signature` longtext DEFAULT NULL,
  `image_contract_01` varchar(255) DEFAULT NULL,
  `image_contract_02` varchar(255) DEFAULT NULL,
  `image_contract_03` varchar(255) DEFAULT NULL,
  `image_id_front` varchar(255) DEFAULT NULL,
  `image_id_back` varchar(255) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT 0,
  `modified` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tenants`
--

INSERT INTO `tenants` (`tenant_id`, `user_id`, `business_name`, `unit`, `full_name`, `email`, `address`, `contact_number`, `lease_start`, `lease_end`, `status`, `signature`, `image_contract_01`, `image_contract_02`, `image_contract_03`, `image_id_front`, `image_id_back`, `created_at`, `is_deleted`, `modified`) VALUES
(2, NULL, 'Z & G Party Needs', 'B2- 1A&1B', 'Jovie Mae Villasis Bautista', '', '', '', NULL, NULL, 'active', NULL, '', '', '', '', '', '0000-00-00', 0, '2024-06-09'),
(3, NULL, 'Racma Store', 'B2-2B', '', '', '', '', NULL, NULL, 'active', NULL, '', '', '', '', '', '0000-00-00', 0, '2024-06-09'),
(5, NULL, 'Aziz Tailoring', 'B2-3B', '', '', '', '', NULL, NULL, 'active', NULL, '', '', '', '', '', '0000-00-00', 0, '2024-06-09'),
(7, NULL, 'Chicken Wings', 'B1-EXC', '', '', '', '', NULL, NULL, 'active', NULL, '', '', '', '', '', '0000-00-00', 0, '2024-06-09'),
(8, NULL, 'Davao Lechon', 'B2-EXC', '', '', '', '', NULL, NULL, 'active', NULL, '', '', '', '', '', '0000-00-00', 0, '2024-06-09'),
(9, NULL, 'Sensei Takoyaki', 'B1-EXE', '', '', '', '', NULL, NULL, 'active', NULL, '', '', '', '', '', '0000-00-00', 0, '2024-06-09'),
(10, NULL, 'Milktea Kopi', 'B1-EXB', '', '', '', '', NULL, NULL, 'active', NULL, '', '', '', '', '', '0000-00-00', 0, '2024-06-09'),
(11, NULL, 'Shawarma', 'B1-EXA', '', '', '', '', NULL, NULL, 'active', NULL, '', '', '', '', '', '0000-00-00', 0, '2024-06-09'),
(12, NULL, 'TGP Pharmacy', 'B1-1A', '', '', '', '', NULL, NULL, 'active', NULL, '', '', '', '', '', '0000-00-00', 0, '2024-06-09'),
(13, NULL, 'Pastil Haus', 'B2-EXA', '', '', '', '', NULL, NULL, 'active', NULL, '', '', '', '', '', '0000-00-00', 0, '2024-06-09'),
(14, NULL, 'Kuya J Lechon', 'B1-EXD', '', '', '', '', NULL, NULL, 'active', NULL, '', '', '', '', '', '0000-00-00', 0, '2024-06-09'),
(27, NULL, 'Baicon', 'Building 1 Stall 5A', '', '', '', '', NULL, NULL, 'active', NULL, '', '', '', '', '', '0000-00-00', 0, '2024-06-09'),
(30, NULL, 'Bapa Talib', 'blk 2 stall 11', '', '', '', '', NULL, NULL, 'active', NULL, '', '', '', '', '', '0000-00-00', 0, '2024-06-09'),
(31, NULL, 'Ktichen ni mama', 'blk 1 stall 10', '', '', '', '', NULL, NULL, 'active', NULL, '', '', '', '', '', '0000-00-00', 0, '2024-06-09'),
(32, NULL, 'Hadiguia', 'DR-AI', '', '', '', '', NULL, NULL, 'active', NULL, '', '', '', '', '', '0000-00-00', 0, '2024-06-09'),
(33, NULL, 'Siomai King', 'Building 1 stall 2', '', '', '', '', NULL, NULL, 'active', NULL, '', '', '', '', '', '0000-00-00', 0, '2024-06-09'),
(34, NULL, 'Barber Shop', 'Building 2, Stall 8A', '', '', '', '', NULL, NULL, 'active', NULL, '', '', '', '', '', '0000-00-00', 0, '2024-06-09'),
(35, NULL, 'expess pay', 'B8 stall B', '', '', '', '', NULL, NULL, 'active', NULL, '', '', '', '', '', '0000-00-00', 0, '2024-06-09'),
(36, NULL, 'Burger', 'Building 3 Stall 2', ' ', '  ', '  ', '  ', '2024-06-05', '2026-06-05', 'active', NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-08', 0, '2024-06-08'),
(37, NULL, 'Al Baraka', 'Building 3 Stall 2 & 3 & 4', 'Aminah Gabuya', ' ', ' ', ' ', '2024-06-05', '2028-06-05', 'active', NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-08', 0, '2024-06-08');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `role_id` int(11) DEFAULT NULL,
  `tenant_id` int(11) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` date DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `role_id`, `tenant_id`, `username`, `password`, `created_at`, `is_deleted`) VALUES
(1, 1, NULL, 'admin', '$2b$10$SmsnR24NRdKnnbIXFfNt9ukMgPlNToqiAD4740/Het5RNBgfcb1cW', NULL, 0),
(2, 1, NULL, 'focenenyby', '$2a$10$yX6swR9hvZbZcMrK1dZWbeia/T760DhIPFe13S3IyOcL3qVFfP2O2', NULL, 0),
(3, 1, NULL, 'xohetuvux', '$2a$10$vW5xLG9a5FljT5/4tX13uuA8RP9033ZV/oTZd3hv9FG84m3xsNi9e', NULL, 0),
(4, 3, NULL, 'xukamuk', '$2a$10$pICuzMfVOI9QrjZPoF7DO.lzQaCbL.1j0gWiVPBoBDtsLRtW72T7a', NULL, 0),
(5, 2, NULL, 'shein', '$2a$10$k5H7X7kNZWH440jYVRRmEO0ky6C1IQvMhbXMFVqwJUB7TEDRg9Dq2', NULL, 0),
(6, 3, NULL, 'user', '$2a$10$3gBLahT4ocSUetG7C5Xkyu2zF4TzYqO9nF.s6LvcPpFuxWcGyKn5m', NULL, 0),
(7, 3, NULL, 'qemasuce', '$2a$10$sJhUUCh9dcy6nuCxpgSjkuJLwnzFLMX1e29Wit0.btGLSOlC.0wli', NULL, 0),
(8, 2, NULL, 'Rawr', '$2a$10$8xrVgv2L2QZpjtq2LEmzrek.1fGQJTdflPgY2O.M15aL/GG3/TdAm', NULL, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `knex_migrations`
--
ALTER TABLE `knex_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `knex_migrations_lock`
--
ALTER TABLE `knex_migrations_lock`
  ADD PRIMARY KEY (`index`);

--
-- Indexes for table `meralco`
--
ALTER TABLE `meralco`
  ADD PRIMARY KEY (`meralco_id`);

--
-- Indexes for table `mode_payments`
--
ALTER TABLE `mode_payments`
  ADD PRIMARY KEY (`mode_payment_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`payment_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `tenants`
--
ALTER TABLE `tenants`
  ADD PRIMARY KEY (`tenant_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_username_unique` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `knex_migrations`
--
ALTER TABLE `knex_migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `knex_migrations_lock`
--
ALTER TABLE `knex_migrations_lock`
  MODIFY `index` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `meralco`
--
ALTER TABLE `meralco`
  MODIFY `meralco_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=233;

--
-- AUTO_INCREMENT for table `mode_payments`
--
ALTER TABLE `mode_payments`
  MODIFY `mode_payment_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `payment_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tenants`
--
ALTER TABLE `tenants`
  MODIFY `tenant_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
