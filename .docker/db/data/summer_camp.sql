-- Adminer 4.8.1 MySQL 8.0.32 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;

CREATE DATABASE `summer_camp` /*!40100 DEFAULT CHARACTER SET latin2 COLLATE latin2_czech_cs */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `summer_camp`;

DELIMITER ;;

DROP FUNCTION IF EXISTS `GetAveragePayment`;;
CREATE FUNCTION `GetAveragePayment`() RETURNS decimal(10,2)
    DETERMINISTIC
BEGIN
    DECLARE totalPayment DEC(10,2) DEFAULT 0;

    SELECT AVG(r.is_paid) 
    INTO totalPayment
    FROM registration as r;

RETURN totalPayment;
END;;

DROP FUNCTION IF EXISTS `GetTotalLegRep`;;
CREATE FUNCTION `GetTotalLegRep`() RETURNS int
    DETERMINISTIC
BEGIN
    DECLARE totalUser INT DEFAULT 0;

    SELECT COUNT(l.legal_representativeID) 
    INTO totalUser
    FROM legal_representative as l;

RETURN totalUser;
END;;

DROP FUNCTION IF EXISTS `GetTotalUser`;;
CREATE FUNCTION `GetTotalUser`() RETURNS int
    DETERMINISTIC
BEGIN
    DECLARE totalUser INT DEFAULT 0;

    SELECT COUNT(u.userID) 
    INTO totalUser
    FROM user as u;

RETURN totalUser;
END;;

DROP FUNCTION IF EXISTS `GetTotalWorkers`;;
CREATE FUNCTION `GetTotalWorkers`() RETURNS int
    DETERMINISTIC
BEGIN
    DECLARE totalWorkers INT DEFAULT 0;

    SELECT COUNT(w.workerID) 
    INTO totalWorkers
    FROM worker as w;

RETURN totalWorkers;
END;;

DROP FUNCTION IF EXISTS `NumberOfReg`;;
CREATE FUNCTION `NumberOfReg`(`startDate` datetime, `endDate` datetime) RETURNS int
    DETERMINISTIC
BEGIN
    DECLARE totalReg INT DEFAULT 0;

    SELECT COUNT(l.id) 
    INTO totalReg
    FROM logs_registration as l
    WHERE l.date BETWEEN startDate AND endDate;

    RETURN totalReg;
END;;

DROP PROCEDURE IF EXISTS `pr_form_camp`;;
CREATE PROCEDURE `pr_form_camp`(IN `rep_birthdate` date, IN `rep_email` varchar(50), IN `rep_first_name` varchar(30), IN `rep_last_name` varchar(30), IN `rep_phone_number` varchar(9), IN `rep_pin` varchar(10), IN `rep_city` varchar(30), IN `rep_address` varchar(50), IN `rep_psc` bigint, IN `p_birthdate` date, IN `p_first_name` varchar(30), IN `p_last_name` varchar(30), IN `p_phone_number` varchar(9), IN `p_pin` varchar(10), IN `p_loginID` bigint, IN `campID` int)
    SQL SECURITY INVOKER
BEGIN
DECLARE now DATETIME DEFAULT NOW();
INSERT INTO legal_representative (first_name, last_name, email, phone, birthdate, pin, city, address, zip) VALUES (rep_first_name, rep_last_name, rep_email, rep_phone_number, rep_birthdate, rep_pin, rep_city, rep_address, rep_psc);
INSERT INTO user (first_name, last_name, phone, birthdate, pin, legal_representativeID, loginID) VALUES (p_first_name, p_last_name, p_phone_number, p_birthdate, p_pin, 
LAST_INSERT_ID(), p_loginID);
INSERT INTO registration (date, is_paid, userID, campID)
VALUES (now, 0, LAST_INSERT_ID(), campID);
END;;

DROP PROCEDURE IF EXISTS `pr_menu_food`;;
CREATE PROCEDURE `pr_menu_food`(IN `alergenID` int, IN `campID` int, IN `name` varchar(75), IN `description` varchar(750), IN `type` tinyint, IN `time` datetime)
    SQL SECURITY INVOKER
BEGIN
INSERT INTO menu (time, campID) VALUES (time, campID);
INSERT INTO food (name, alergenID, description, type, menuID) VALUES (name, alergenID, description, type, LAST_INSERT_ID());
END;;

DROP PROCEDURE IF EXISTS `pr_worker_job`;;
CREATE PROCEDURE `pr_worker_job`(IN `w_email` varchar(50), IN `w_first_name` varchar(35), IN `w_last_name` varchar(35), IN `w_phone_number` varchar(9), IN `w_title` varchar(20), IN `j_type` tinyint, IN `w_campID` int, IN `loginID` int, IN `profileID` int)
BEGIN
  DECLARE j_id INT;
  SELECT jobID INTO j_id FROM job WHERE type = j_type;
  IF w_campID = 0 AND loginID = 0 AND profileID = 0 THEN
    INSERT INTO worker (email, first_name, last_name, phone_number, title, jobID)
    VALUES (w_email, w_first_name, w_last_name, w_phone_number, w_title, j_id);
  ELSE
    INSERT INTO worker (email, first_name, last_name, phone_number, title, jobID, campID, loginID, profileID)
    VALUES (w_email, w_first_name, w_last_name, w_phone_number, w_title, j_id, IF(w_campID = 0, NULL, w_campID), IF(loginID = 0, NULL, loginID), IF(profileID = 0, NULL, profileID));
  END IF;
END;;

DELIMITER ;

CREATE TABLE `alergen` (
  `alergenID` int NOT NULL AUTO_INCREMENT,
  `number` varchar(30) COLLATE latin2_czech_cs NOT NULL,
  `name` varchar(50) CHARACTER SET latin2 COLLATE latin2_czech_cs NOT NULL,
  PRIMARY KEY (`alergenID`),
  UNIQUE KEY `number` (`number`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=latin2 COLLATE=latin2_czech_cs;


CREATE TABLE `camp` (
  `date_from` date NOT NULL,
  `date_to` date NOT NULL,
  `description` varchar(4000) CHARACTER SET latin2 COLLATE latin2_czech_cs DEFAULT NULL,
  `name` varchar(50) CHARACTER SET latin2 COLLATE latin2_czech_cs NOT NULL,
  `price` int NOT NULL,
  `campID` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`campID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin2 COLLATE=latin2_czech_cs;


CREATE TABLE `food` (
  `alergenID` int NOT NULL,
  `description` varchar(750) CHARACTER SET latin2 COLLATE latin2_czech_cs DEFAULT NULL,
  `name` varchar(75) CHARACTER SET latin2 COLLATE latin2_czech_cs NOT NULL,
  `type` tinyint NOT NULL,
  `foodID` int NOT NULL AUTO_INCREMENT,
  `menuID` int NOT NULL,
  PRIMARY KEY (`foodID`),
  KEY `alergenID` (`alergenID`),
  KEY `menuID` (`menuID`),
  CONSTRAINT `food_ibfk_1` FOREIGN KEY (`alergenID`) REFERENCES `alergen` (`alergenID`),
  CONSTRAINT `food_ibfk_2` FOREIGN KEY (`menuID`) REFERENCES `menu` (`menuID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin2 COLLATE=latin2_czech_cs;


CREATE TABLE `job` (
  `description` varchar(250) CHARACTER SET latin2 COLLATE latin2_czech_cs DEFAULT NULL,
  `type` tinyint NOT NULL,
  `jobID` int unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`jobID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin2 COLLATE=latin2_czech_cs;


CREATE TABLE `legal_representative` (
  `zip` varchar(5) COLLATE latin2_czech_cs NOT NULL,
  `city` varchar(30) COLLATE latin2_czech_cs NOT NULL,
  `address` varchar(50) CHARACTER SET latin2 COLLATE latin2_czech_cs NOT NULL,
  `birthdate` date NOT NULL,
  `email` varchar(50) CHARACTER SET latin2 COLLATE latin2_czech_cs NOT NULL,
  `first_name` varchar(30) CHARACTER SET latin2 COLLATE latin2_czech_cs NOT NULL,
  `last_name` varchar(30) CHARACTER SET latin2 COLLATE latin2_czech_cs NOT NULL,
  `phone` varchar(9) COLLATE latin2_czech_cs NOT NULL,
  `pin` varchar(10) COLLATE latin2_czech_cs NOT NULL,
  `legal_representativeID` int unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`legal_representativeID`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin2 COLLATE=latin2_czech_cs;


CREATE TABLE `login` (
  `email` varchar(50) CHARACTER SET latin2 COLLATE latin2_czech_cs NOT NULL,
  `role` tinyint NOT NULL,
  `name` varchar(30) CHARACTER SET latin2 COLLATE latin2_czech_cs NOT NULL,
  `password` varchar(60) CHARACTER SET latin2 COLLATE latin2_czech_cs NOT NULL COMMENT 'Změna z 30 na 60',
  `loginID` int unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`loginID`),
  UNIQUE KEY `login` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=latin2 COLLATE=latin2_czech_cs;


DELIMITER ;;

CREATE TRIGGER `login_ai_logs` AFTER INSERT ON `login` FOR EACH ROW
INSERT INTO logs_login_reg VALUES (null, NEW.loginID, 'registrated', NOW());;

DELIMITER ;

CREATE TABLE `logs_login_reg` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `loginID` int NOT NULL,
  `action` varchar(50) CHARACTER SET latin2 COLLATE latin2_czech_cs NOT NULL,
  `date` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin2 COLLATE=latin2_czech_cs;


CREATE TABLE `logs_registration` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `registrationID` int NOT NULL,
  `action` varchar(50) CHARACTER SET latin2 COLLATE latin2_czech_cs NOT NULL,
  `date` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin2 COLLATE=latin2_czech_cs;


CREATE TABLE `menu` (
  `time` datetime NOT NULL,
  `menuID` int NOT NULL AUTO_INCREMENT,
  `campID` int NOT NULL,
  PRIMARY KEY (`menuID`),
  KEY `FK_Menu_Camp` (`campID`),
  CONSTRAINT `menu_ibfk_1` FOREIGN KEY (`campID`) REFERENCES `camp` (`campID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin2 COLLATE=latin2_czech_cs;


CREATE TABLE `profile` (
  `type` varchar(20) CHARACTER SET latin2 COLLATE latin2_czech_cs NOT NULL,
  `upload_date` datetime NOT NULL,
  `image` mediumblob NOT NULL,
  `profileID` int unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`profileID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin2 COLLATE=latin2_czech_cs;


CREATE TABLE `program` (
  `description` varchar(4000) CHARACTER SET latin2 COLLATE latin2_czech_cs DEFAULT NULL,
  `from` datetime NOT NULL,
  `name` varchar(60) CHARACTER SET latin2 COLLATE latin2_czech_cs NOT NULL,
  `to` datetime NOT NULL,
  `programID` int unsigned NOT NULL AUTO_INCREMENT,
  `campID` int NOT NULL,
  PRIMARY KEY (`programID`),
  KEY `FK_Program_Camp` (`campID`),
  CONSTRAINT `program_ibfk_1` FOREIGN KEY (`campID`) REFERENCES `camp` (`campID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin2 COLLATE=latin2_czech_cs;


CREATE TABLE `registration` (
  `date` datetime NOT NULL,
  `is_paid` tinyint(1) NOT NULL,
  `registrationID` int unsigned NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `campID` int NOT NULL,
  PRIMARY KEY (`registrationID`),
  KEY `FK_registration_camp` (`campID`),
  KEY `userID` (`userID`),
  CONSTRAINT `registration_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `registration_ibfk_2` FOREIGN KEY (`campID`) REFERENCES `camp` (`campID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin2 COLLATE=latin2_czech_cs;


DELIMITER ;;

CREATE TRIGGER `registration_ai` AFTER INSERT ON `registration` FOR EACH ROW
INSERT INTO logs_registration VALUES (null, NEW.registrationID, 'Inserted', NOW());;

DELIMITER ;

CREATE TABLE `user` (
  `birthdate` date NOT NULL COMMENT 'Ahoj Domcho',
  `first_name` varchar(30) CHARACTER SET latin2 COLLATE latin2_czech_cs NOT NULL,
  `last_name` varchar(30) CHARACTER SET latin2 COLLATE latin2_czech_cs NOT NULL,
  `phone` varchar(9) COLLATE latin2_czech_cs NOT NULL,
  `pin` varchar(10) COLLATE latin2_czech_cs NOT NULL,
  `userID` int NOT NULL AUTO_INCREMENT,
  `legal_representativeID` int unsigned DEFAULT NULL,
  `loginID` int unsigned DEFAULT NULL,
  PRIMARY KEY (`userID`),
  KEY `FK_User_Legal_representative` (`legal_representativeID`),
  KEY `FK_User_Login` (`loginID`),
  CONSTRAINT `FK_User_Legal_representative` FOREIGN KEY (`legal_representativeID`) REFERENCES `legal_representative` (`legal_representativeID`),
  CONSTRAINT `FK_User_Login` FOREIGN KEY (`loginID`) REFERENCES `login` (`loginID`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin2 COLLATE=latin2_czech_cs;


CREATE TABLE `view_menu_food_alergen` (`id` varchar(36), `number` varchar(30), `alergen_name` varchar(50), `description` varchar(750), `food_name` varchar(75), `type` tinyint, `menuID` int, `time` datetime, `foodID` int, `campID` int);


CREATE TABLE `view_user_representative_login_registration` (`id` varchar(36), `childFirstname` varchar(30), `childSurname` varchar(30), `childBirthdate` date, `childPin` varchar(10), `childPhone` varchar(9), `userID` int, `parentFirstname` varchar(30), `parentSurname` varchar(30), `parentBirthdate` date, `parentPin` varchar(10), `parentEmail` varchar(50), `parentPhone` varchar(9), `parentStreet` varchar(50), `parentCity` varchar(30), `parentZip` varchar(5), `legal_representativeID` int unsigned, `campID` int, `loginID` int unsigned, `login` varchar(30), `registrationID` int unsigned, `isPaid` tinyint(1), `registrationDate` datetime);


CREATE TABLE `view_worker_job_profile` (`id` varchar(36), `surname` varchar(35), `firstname` varchar(35), `jobType` tinyint, `jobDescription` varchar(250), `email` varchar(50), `phone` varchar(9), `title` varchar(20), `workerID` int, `campID` int, `jobID` int unsigned, `profileID` int unsigned, `profileUploadDate` datetime, `profileImageType` varchar(20), `profileImage` mediumblob);


CREATE TABLE `worker` (
  `email` varchar(50) CHARACTER SET latin2 COLLATE latin2_czech_cs NOT NULL,
  `first_name` varchar(35) CHARACTER SET latin2 COLLATE latin2_czech_cs NOT NULL,
  `last_name` varchar(35) CHARACTER SET latin2 COLLATE latin2_czech_cs NOT NULL,
  `phone_number` varchar(9) COLLATE latin2_czech_cs NOT NULL,
  `title` varchar(20) CHARACTER SET latin2 COLLATE latin2_czech_cs DEFAULT NULL,
  `workerID` int NOT NULL AUTO_INCREMENT,
  `campID` int DEFAULT NULL,
  `jobID` int unsigned NOT NULL,
  `loginID` int unsigned DEFAULT NULL,
  `profileID` int unsigned DEFAULT NULL,
  PRIMARY KEY (`workerID`),
  UNIQUE KEY `workerID` (`workerID`),
  KEY `FK_Worker_Camp` (`campID`),
  KEY `FK_Worker_Job` (`jobID`),
  KEY `FK_Worker_Login` (`loginID`),
  KEY `FK_Worker_Profile` (`profileID`),
  CONSTRAINT `FK_Worker_Job` FOREIGN KEY (`jobID`) REFERENCES `job` (`jobID`),
  CONSTRAINT `FK_Worker_Login` FOREIGN KEY (`loginID`) REFERENCES `login` (`loginID`),
  CONSTRAINT `FK_Worker_Profile` FOREIGN KEY (`profileID`) REFERENCES `profile` (`profileID`),
  CONSTRAINT `worker_ibfk_1` FOREIGN KEY (`campID`) REFERENCES `camp` (`campID`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin2 COLLATE=latin2_czech_cs;


DROP TABLE IF EXISTS `view_menu_food_alergen`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `view_menu_food_alergen` AS select uuid() AS `id`,`a`.`number` AS `number`,`a`.`name` AS `alergen_name`,`f`.`description` AS `description`,`f`.`name` AS `food_name`,`f`.`type` AS `type`,`m`.`menuID` AS `menuID`,`m`.`time` AS `time`,`f`.`foodID` AS `foodID`,`c`.`campID` AS `campID` from (((`menu` `m` join `food` `f` on((`m`.`menuID` = `f`.`menuID`))) join `alergen` `a` on((`f`.`alergenID` = `a`.`alergenID`))) join `camp` `c` on((`c`.`campID` = `m`.`campID`))) order by `m`.`time`;

DROP TABLE IF EXISTS `view_user_representative_login_registration`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `view_user_representative_login_registration` AS select uuid() AS `id`,`u`.`first_name` AS `childFirstname`,`u`.`last_name` AS `childSurname`,`u`.`birthdate` AS `childBirthdate`,`u`.`pin` AS `childPin`,`u`.`phone` AS `childPhone`,`u`.`userID` AS `userID`,`l`.`first_name` AS `parentFirstname`,`l`.`last_name` AS `parentSurname`,`l`.`birthdate` AS `parentBirthdate`,`l`.`pin` AS `parentPin`,`l`.`email` AS `parentEmail`,`l`.`phone` AS `parentPhone`,`l`.`address` AS `parentStreet`,`l`.`city` AS `parentCity`,`l`.`zip` AS `parentZip`,`l`.`legal_representativeID` AS `legal_representativeID`,`c`.`campID` AS `campID`,`lo`.`loginID` AS `loginID`,`lo`.`name` AS `login`,`reg`.`registrationID` AS `registrationID`,`reg`.`is_paid` AS `isPaid`,`reg`.`date` AS `registrationDate` from (((((`user` `u` join `legal_representative` `l` on((`u`.`legal_representativeID` = `l`.`legal_representativeID`))) join `registration` `r` on((`r`.`userID` = `u`.`userID`))) join `camp` `c` on((`c`.`campID` = `r`.`campID`))) join `login` `lo` on((`lo`.`loginID` = `u`.`loginID`))) join `registration` `reg` on((`reg`.`userID` = `u`.`userID`))) order by `u`.`last_name`;

DROP TABLE IF EXISTS `view_worker_job_profile`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `view_worker_job_profile` AS select distinct uuid() AS `id`,`w`.`last_name` AS `surname`,`w`.`first_name` AS `firstname`,`j`.`type` AS `jobType`,`j`.`description` AS `jobDescription`,`w`.`email` AS `email`,`w`.`phone_number` AS `phone`,`w`.`title` AS `title`,`w`.`workerID` AS `workerID`,`c`.`campID` AS `campID`,`j`.`jobID` AS `jobID`,`p`.`profileID` AS `profileID`,`p`.`upload_date` AS `profileUploadDate`,`p`.`type` AS `profileImageType`,`p`.`image` AS `profileImage` from (((`worker` `w` join `job` `j` on((`w`.`jobID` = `j`.`jobID`))) join `camp` `c` on((`c`.`campID` = `w`.`campID`))) join `profile` `p` on((`p`.`profileID` = `w`.`profileID`))) order by `w`.`last_name`;

-- 2023-05-17 12:08:29
