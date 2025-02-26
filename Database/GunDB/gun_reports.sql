-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: gun
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reports` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `firearm_id` int NOT NULL,
  `ammo_id` int NOT NULL,
  `suppressor` tinyint(1) DEFAULT '0',
  `optic` tinyint(1) DEFAULT '0',
  `modified` tinyint(1) DEFAULT '0',
  `date` date NOT NULL,
  `manufacture_year` int NOT NULL,
  `rounds_fired` int NOT NULL,
  `firing` int DEFAULT '0',
  `unlocking` int DEFAULT '0',
  `extracting` int DEFAULT '0',
  `ejecting` int DEFAULT '0',
  `cocking` int DEFAULT '0',
  `feeding` int DEFAULT '0',
  `chambering` int DEFAULT '0',
  `locking` int DEFAULT '0',
  `magazine` int DEFAULT '0',
  `ammunition` int DEFAULT '0',
  `other` int DEFAULT '0',
  `catastrophic` int DEFAULT '0',
  `comments` text,
  `is_active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `firearm_id` (`firearm_id`),
  KEY `ammo_id` (`ammo_id`),
  CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reports_ibfk_2` FOREIGN KEY (`firearm_id`) REFERENCES `firearms` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reports_ibfk_3` FOREIGN KEY (`ammo_id`) REFERENCES `ammo` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports`
--

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
/*!40000 ALTER TABLE `reports` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-18 10:01:10
