-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 03, 2025 at 04:42 PM
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
(2, 2, 19.0, 'January 30, 2025', 'January 28, 2025', 5052.9, 5253.5, 200.6, NULL, NULL, 3811.40, 0.00, '0000-00-00', 0),
(3, 3, 19.0, 'January 30, 2025', 'January 28, 2025', 1655.0, 1748.9, 93.9, NULL, NULL, 1784.10, 0.00, '0000-00-00', 0),
(4, 4, 19.0, 'January 30, 2025', 'January 28, 2025', 4860.1, 4945.5, 85.4, NULL, NULL, 1622.60, 0.00, '0000-00-00', 0),
(5, 5, 19.0, 'January 30, 2025', 'January 28, 2025', 2913.0, 3026.6, 113.6, NULL, NULL, 2158.40, 0.00, '0000-00-00', 0),
(6, 6, 19.0, 'January 30, 2025', 'January 28, 2025', 1638.7, 1657.4, 18.7, NULL, NULL, 355.30, 0.00, '0000-00-00', 0),
(7, 7, 19.0, 'January 30, 2025', 'January 28, 2025', NULL, 0.0, 0.0, NULL, NULL, 0.00, 0.00, '0000-00-00', 0),
(8, 8, 19.0, 'January 30, 2025', 'January 28, 2025', NULL, 0.0, 0.0, NULL, NULL, 0.00, 0.00, '0000-00-00', 0),
(9, 9, 19.0, 'January 30, 2025', 'January 28, 2025', 2282.9, 2390.9, 108.0, NULL, NULL, 2052.00, 0.00, '0000-00-00', 0),
(10, 10, 19.0, 'January 30, 2025', 'January 28, 2025', 1149.8, 1195.0, 45.2, NULL, NULL, 858.80, 0.00, '0000-00-00', 0),
(11, 11, 19.0, 'January 30, 2025', 'January 28, 2025', 834.5, 840.1, 5.6, NULL, NULL, 106.40, 0.00, '0000-00-00', 0),
(12, 12, 19.0, 'January 30, 2025', 'January 28, 2025', 109.0, 236.1, 127.1, NULL, NULL, 2414.90, 0.00, '0000-00-00', 0),
(13, 13, 19.0, 'January 30, 2025', 'January 28, 2025', 1647.4, 1734.1, 86.7, NULL, NULL, 1647.30, 0.00, '0000-00-00', 0),
(15, 15, 19.0, 'January 30, 2025', 'January 28, 2025', 1149.8, 1191.4, 41.6, NULL, NULL, 790.40, 0.00, '0000-00-00', 0),
(16, 16, 19.0, 'January 30, 2025', 'January 28, 2025', 2611.6, 2777.2, 165.6, NULL, NULL, 3146.40, 0.00, '0000-00-00', 0),
(233, 12, 20.0, 'March 4, 2025', 'February 27, 2025', 236.1, 340.1, 104.0, 0, NULL, 2080.00, 2080.00, '2025-02-27', 0),
(234, 5, 20.0, 'March 4, 2025', 'February 27, 2025', 3026.6, 3113.1, 86.5, 0, NULL, 1730.00, 1730.00, '2025-02-27', 0),
(235, 9, 20.0, 'March 4, 2025', 'February 27, 2025', 2390.9, 2489.0, 98.1, 0, NULL, 1962.00, 1962.00, '2025-02-27', 0),
(236, 6, 20.0, 'March 4, 2025', 'February 27, 2025', 1657.4, 1688.0, 30.6, 0, NULL, 612.00, 612.00, '2025-02-27', 0),
(237, 3, 20.0, 'March 4, 2025', 'February 27, 2025', 1748.9, 1818.6, 69.7, 0, NULL, 1394.00, 1394.00, '2025-02-27', 0),
(238, 16, 20.0, 'March 4, 2025', 'February 27, 2025', 2777.2, 2904.9, 127.7, 0, NULL, 2554.00, 2554.00, '2025-02-27', 0),
(239, 13, 20.0, 'March 4, 2025', 'February 27, 2025', 1734.1, 1808.3, 74.2, 0, NULL, 1484.00, 1484.00, '2025-02-27', 0),
(240, 4, 20.0, 'March 4, 2025', 'February 27, 2025', 4945.5, 5012.5, 67.0, 0, NULL, 1340.00, 1340.00, '2025-02-27', 0),
(241, 2, 20.0, 'March 4, 2025', 'February 27, 2025', 5253.5, 5411.7, 158.2, 0, NULL, 3164.00, 3164.00, '2025-02-27', 0),
(242, 8, 20.0, 'March 4, 2025', 'February 27, 2025', 0.0, 2262.0, 2262.0, 0, NULL, 45240.00, 45240.00, '2025-02-27', 0),
(243, 8, 20.0, 'March 4, 2025', 'February 27, 2025', 2262.0, 2309.4, 47.4, 0, NULL, 948.00, 948.00, '2025-02-27', 0),
(244, 5, 19.0, 'April 1, 2025', 'March 27, 2025', 3113.1, 3213.4, 100.3, 0, NULL, 1905.70, 2006.00, '2025-03-27', 0),
(245, 9, 19.0, 'April 1, 2025', 'March 27, 2025', 2489.0, 2585.1, 96.1, 0, NULL, 1825.90, 1922.00, '2025-03-27', 0),
(246, 10, 19.0, 'April 1, 2025', 'March 27, 2025', 1195.0, 1284.1, 89.1, 0, NULL, 1692.90, 1782.00, '2025-03-27', 0),
(247, 11, 19.0, 'April 1, 2025', 'March 27, 2025', 840.1, 903.3, 63.2, 0, NULL, 1200.80, 1264.00, '2025-03-27', 0),
(248, 2, 19.0, 'April 1, 2025', 'March 27, 2025', 5411.7, 5621.6, 209.9, 0, NULL, 3988.10, 4198.00, '2025-03-27', 0),
(249, 3, 19.0, 'April 1, 2025', 'March 27, 2025', 1818.6, 1921.2, 102.6, 0, NULL, 1949.40, 2052.00, '2025-03-27', 0),
(250, 4, 24.0, 'April 1, 2025', 'March 27, 2025', 5012.5, 5065.3, 52.8, 0, NULL, 1267.20, 1161.60, '2025-03-27', 0),
(251, 13, 19.0, 'April 1, 2025', 'March 27, 2025', 1808.3, 1864.4, 56.1, 0, NULL, 1065.90, 1122.00, '2025-03-27', 0),
(252, 15, 19.0, 'April 1, 2025', 'March 27, 2025', 1191.4, 1262.7, 71.3, 0, NULL, 1354.70, 1426.00, '2025-03-27', 0),
(253, 16, 19.0, 'April 1, 2025', 'March 27, 2025', 2904.9, 3016.2, 111.3, 0, NULL, 2114.70, 2226.00, '2025-03-27', 0),
(254, 38, 19.0, 'April 1, 2025', 'March 27, 2025', 0.0, 2254.5, 2254.5, 0, NULL, 42835.50, 45090.00, '2025-03-27', 0),
(255, 38, 19.0, 'April 1, 2025', 'March 27, 2025', 2254.5, 2480.5, 226.0, 0, NULL, 4294.00, 4520.00, '2025-03-27', 0),
(256, 6, 19.0, 'April 1, 2025', 'March 27, 2025', 1688.0, 1720.4, 32.4, 0, NULL, 615.60, 615.60, '2025-03-27', 0),
(257, 13, 19.0, 'May 2, 2025', 'April 27, 2025', 1864.4, 1912.2, 47.8, 0, NULL, 908.20, 908.20, '2025-04-27', 0),
(258, 15, 20.0, 'May 2, 2025', 'April 27, 2025', 1262.7, 1306.9, 44.2, 0, NULL, 884.00, 884.00, '2025-04-27', 0),
(259, 16, 19.0, 'May 2, 2025', 'April 27, 2025', 3016.2, 3201.4, 185.2, 0, NULL, 3518.80, 3518.80, '2025-04-27', 0),
(260, 4, 22.0, 'May 2, 2025', 'April 27, 2025', 5065.3, 5139.1, 73.8, 0, NULL, 1623.60, 1623.60, '2025-04-27', 0),
(261, 3, 19.0, 'May 2, 2025', 'April 27, 2025', 1921.2, 2104.1, 182.9, 0, NULL, 3475.10, 3475.10, '2025-04-27', 0),
(262, 5, 19.0, 'May 2, 2025', 'April 27, 2025', 3213.4, 3337.1, 123.7, 0, NULL, 2350.30, 2350.30, '2025-04-27', 0),
(263, 2, 19.0, 'May 2, 2025', 'April 27, 2025', 5621.6, 5923.7, 302.1, 0, NULL, 5739.90, 5739.90, '2025-04-27', 0),
(264, 6, 19.0, 'May 2, 2025', 'April 27, 2025', 1720.4, 1769.6, 49.2, 0, NULL, 934.80, 934.80, '2025-04-27', 0),
(265, 9, 19.0, 'May 2, 2025', 'April 27, 2025', 2585.1, 2695.2, 110.1, 0, NULL, 2091.90, 2091.90, '2025-04-27', 0),
(266, 10, 19.0, 'May 2, 2025', 'April 27, 2025', 1284.1, 0.0, 0.0, 0, NULL, -24397.90, -24397.90, '2025-04-27', 0),
(267, 10, 19.0, 'May 2, 2025', 'April 27, 2025', 0.0, 10.5, 10.5, 0, NULL, 199.50, 199.50, '2025-04-27', 0),
(268, 11, 19.0, 'May 2, 2025', 'April 27, 2025', 903.3, 987.6, 84.3, 0, NULL, 1601.70, 1601.70, '2025-04-27', 0),
(269, 16, 19.0, 'June 8, 2025', 'June 3, 2025', 3201.4, 3415.9, 214.5, 0, NULL, 4075.50, 4075.50, '2025-06-03', 0),
(270, 13, 19.0, 'June 8, 2025', 'June 3, 2025', 1912.2, 1975.1, 62.9, 0, NULL, 1195.10, 1195.10, '2025-06-03', 0),
(271, 15, 19.0, 'June 8, 2025', 'June 3, 2025', 1306.9, 1377.6, 70.7, 0, NULL, 1343.30, 1343.30, '2025-06-03', 0),
(272, 6, 19.0, 'June 8, 2025', 'June 3, 2025', 1769.6, 1813.7, 44.1, 0, NULL, 837.90, 837.90, '2025-06-03', 0),
(273, 9, 19.0, 'June 8, 2025', 'June 3, 2025', 2695.2, 2798.0, 102.8, 0, NULL, 1953.20, 1953.20, '2025-06-03', 0),
(274, 2, 19.0, 'June 8, 2025', 'June 3, 2025', 5923.7, 6259.5, 335.8, 0, NULL, 6380.20, 6380.20, '2025-06-03', 0),
(275, 5, 19.0, 'June 8, 2025', 'June 3, 2025', 3337.1, 3471.0, 133.9, 0, NULL, 2544.10, 2544.10, '2025-06-03', 0),
(276, 11, 19.0, 'June 8, 2025', 'June 3, 2025', 987.6, 1100.2, 112.6, 0, NULL, 2139.40, 2139.40, '2025-06-03', 0),
(277, 12, 19.0, 'June 8, 2025', 'June 3, 2025', 340.1, 367.5, 27.4, 0, NULL, 520.60, 520.60, '2025-06-03', 0),
(278, 12, 19.0, 'June 8, 2025', 'June 3, 2025', 367.5, 376.8, 9.3, 0, NULL, 176.70, 176.70, '2025-06-03', 0);

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
(4, NULL, 'Aziz Tailoring', 'B2-3B', '', '', '', '', NULL, NULL, 'active', NULL, '', '', '', '', '', '0000-00-00', 0, '2024-06-09'),
(5, NULL, 'Chicken Wings', 'B1-EXC', '', '', '', '', NULL, NULL, 'active', NULL, '', '', '', '', '', '0000-00-00', 0, '2024-06-09'),
(6, NULL, 'Davao Lechon', 'B2-EXC', '', '', '', '', NULL, NULL, 'active', NULL, '', '', '', '', '', '0000-00-00', 0, '2024-06-09'),
(7, NULL, 'Sensei Takoyaki', 'B1-EXE', '', '', '', '', NULL, NULL, 'inactive', NULL, '', '', '', '', '', '0000-00-00', 0, '2025-06-03'),
(8, NULL, 'Milktea Kopi', 'B1-EXB', '', '', '', '', NULL, NULL, 'active', NULL, '', '', '', '', '', '0000-00-00', 0, '2024-06-09'),
(9, NULL, 'Shawarma', 'B1-EXA', '', '', '', '', NULL, NULL, 'active', NULL, '', '', '', '', '', '0000-00-00', 0, '2024-06-09'),
(10, NULL, 'Brew Milktea', 'B1-EX-G', '', '', '', '', NULL, NULL, 'active', NULL, '', '', '', '', '', '0000-00-00', 0, '2024-06-09'),
(11, NULL, 'Lomi Batangas', 'B2-EXA', '', '', '', '', NULL, NULL, 'active', NULL, '', '', '', '', '', '0000-00-00', 0, '2025-06-03'),
(12, NULL, 'Papa Fries', 'B1-EXD', 'Pauline Manuzon', '', '', '', NULL, NULL, 'active', NULL, '', '', '', '', '', '0000-00-00', 0, '2025-06-03'),
(13, NULL, 'Kader Guiamat', 'B2-13', '', '', '', '', NULL, NULL, 'active', NULL, '', '', '', '', '', '0000-00-00', 0, '2024-06-09'),
(14, NULL, 'Ktichen ni mama', 'blk 1 stall 10', '', '', '', '', NULL, NULL, 'active', NULL, '', '', '', '', '', '0000-00-00', 0, '2024-06-09'),
(15, NULL, 'Hadiguia', 'DR-AI', '', '', '', '', NULL, NULL, 'active', NULL, '', '', '', '', '', '0000-00-00', 0, '2024-06-09'),
(16, NULL, 'Barber Shop', 'Building 2, Stall 8A', '', '', '', '', NULL, NULL, 'active', NULL, '', '', '', '', '', '0000-00-00', 0, '2024-06-09'),
(38, NULL, 'balbacua', 'B1-AXC', ' ', ' ', ' ', ' ', '2025-02-01', '2025-03-27', 'active', NULL, NULL, NULL, NULL, NULL, NULL, '2025-03-27', 0, '2025-03-27');

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
  `is_deleted` tinyint(1) DEFAULT 0,
  `view_user` int(11) DEFAULT 0,
  `view_utility` int(11) DEFAULT 0,
  `view_payment` int(11) DEFAULT 0,
  `view_tenant` int(11) DEFAULT 0,
  `add_user` int(11) DEFAULT 0,
  `add_utility` int(11) DEFAULT 0,
  `add_payment` int(11) DEFAULT 0,
  `add_tenant` int(11) DEFAULT 0,
  `edit_user` int(11) DEFAULT 0,
  `edit_utility` int(11) DEFAULT 0,
  `edit_tenant` int(11) DEFAULT 0,
  `delete_user` int(11) DEFAULT 0,
  `delete_tenant` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `role_id`, `tenant_id`, `username`, `password`, `created_at`, `is_deleted`, `view_user`, `view_utility`, `view_payment`, `view_tenant`, `add_user`, `add_utility`, `add_payment`, `add_tenant`, `edit_user`, `edit_utility`, `edit_tenant`, `delete_user`, `delete_tenant`) VALUES
(1, 1, NULL, 'admin', '$2b$10$SmsnR24NRdKnnbIXFfNt9ukMgPlNToqiAD4740/Het5RNBgfcb1cW', NULL, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);

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
  MODIFY `meralco_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=279;

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
  MODIFY `tenant_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
