-- MySQL dump 10.13  Distrib 5.7.34, for osx10.16 (x86_64)
--
-- Host: localhost    Database: demo1
-- ------------------------------------------------------
-- Server version	5.7.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `oauth`
--

DROP TABLE IF EXISTS `oauth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `oauth` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `client_id` varchar(50) DEFAULT NULL,
  `openid` varchar(50) DEFAULT NULL COMMENT '一般情况下，可认为openid是唯一的',
  `access_token` varchar(500) DEFAULT NULL,
  `refresh_token` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `oauth_openid_pk` (`openid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='oauth授权记录表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth`
--

LOCK TABLES `oauth` WRITE;
/*!40000 ALTER TABLE `oauth` DISABLE KEYS */;
INSERT INTO `oauth` VALUES (6,10,'2','49454cc32b98d67f27808eadea9b07a4','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6MiwidXNlcklkIjo1LCJ0b2tlbklkIjoiODUwNzhjZWVmNmJlNDhiYWIxZGFiNmQ0OTlhMGRiMjQiLCJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwiaWF0IjoxNzEyNzMwMjM5LCJleHAiOjE3MTI3Mzc0MzksImlzcyI6ImVhc3l1bXMgb2F1dGgifQ.WNUWMkaAmEzt0zvgjY5EvFHezsPuSgOHGR5joIKT1DI','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6MiwidXNlcklkIjo1LCJ0b2tlbklkIjoiODUwNzhjZWVmNmJlNDhiYWIxZGFiNmQ0OTlhMGRiMjQiLCJ0eXBlIjoicmVmcmVzaF90b2tlbiIsImlhdCI6MTcxMjczMDIzOSwiZXhwIjoxNzEzMzM1MDM5LCJpc3MiOiJlYXN5dW1zIG9hdXRoIn0.uD3JPm6qFDicrAVIqk-fZUa8a7SqnMHbZvuSZFU044U');
/*!40000 ALTER TABLE `oauth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token`
--

DROP TABLE IF EXISTS `token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `token` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `access_token` varchar(500) DEFAULT NULL,
  `refresh_token` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token_user_id_pk` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='令牌记录表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token`
--

LOCK TABLES `token` WRITE;
/*!40000 ALTER TABLE `token` DISABLE KEYS */;
INSERT INTO `token` VALUES (4,10,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwiaWF0IjoxNzEyNzMxNDYzLCJleHAiOjE3MTI3Mzg2NjMsImlzcyI6ImVhc3l1bXMgZGVtbyJ9.npIZMmSvArG7lB6LGle3MPWsRl9nr13vnTAtmR2mV6g','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJ0eXBlIjoicmVmcmVzaF90b2tlbiIsImlhdCI6MTcxMjczMTQ2MywiZXhwIjoxNzEzMzM2MjYzLCJpc3MiOiJlYXN5dW1zIGRlbW8ifQ.AO-Ai3f5lA5q0WzHvbKWVY5U2TNmhC4VndQKjyOvtAM');
/*!40000 ALTER TABLE `token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (10,'test1','202cb962ac59075b964b07152d234b70','12345678@qq.com','2024-04-10 14:24:05');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-11  4:55:26
