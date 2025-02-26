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
-- Table structure for table `manufacturers`
--

DROP TABLE IF EXISTS `manufacturers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manufacturers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manufacturers`
--

LOCK TABLES `manufacturers` WRITE;
/*!40000 ALTER TABLE `manufacturers` DISABLE KEYS */;
INSERT INTO `manufacturers` VALUES (1,'AHSS'),(2,'Alpha Foxtrot'),(3,'Altor Corp'),(4,'American Derringer'),(5,'Anderson Manufacturing'),(6,'Archon'),(7,'AREX Defense'),(8,'Avidity Arms'),(9,'BB Tech'),(10,'Bear Creek Arsenal'),(11,'Beretta'),(12,'Bersa'),(13,'Biofire'),(14,'Bond Arms'),(15,'BRG USA'),(16,'Browning'),(17,'Bubix'),(18,'Bul Armory'),(19,'Canik'),(20,'Chiappa'),(21,'Colt'),(22,'CZ'),(23,'Daewoo Precision Industries'),(24,'Dan Wesson'),(25,'Daniel Defense'),(26,'Diamondback'),(27,'DoubleTap Defense'),(28,'EAA'),(29,'Ed Brown'),(30,'EMTAN Israel'),(31,'Ermox'),(32,'Faxon'),(33,'FB Radom'),(34,'FEG'),(35,'FK BRNO'),(36,'FMK'),(37,'FN Herstal'),(38,'GLOCK'),(39,'Grand Power'),(40,'Heckler & Koch'),(41,'Hudson Manufacturing'),(42,'IWI'),(43,'Kimber'),(44,'Kahr Arms'),(45,'Kel-Tec'),(46,'Korth'),(47,'Luger'),(48,'Magnum Research'),(49,'MKEK'),(50,'Nighthawk Custom'),(51,'North American Arms'),(52,'Norinco'),(53,'Palmetto State Armory'),(54,'Para USA'),(55,'Remington'),(56,'Rock Island Armory'),(57,'Ruger'),(58,'Savage Arms'),(59,'SCCY'),(60,'Sig Sauer'),(61,'Smith & Wesson'),(62,'Springfield Armory'),(63,'Steyr Arms'),(64,'Tisas'),(65,'Walther'),(66,'Wilson Combat'),(67,'Zastava Arms');
/*!40000 ALTER TABLE `manufacturers` ENABLE KEYS */;
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
