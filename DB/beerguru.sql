-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema beergurudb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `beergurudb` ;

-- -----------------------------------------------------
-- Schema beergurudb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `beergurudb` DEFAULT CHARACTER SET utf8 ;
USE `beergurudb` ;

-- -----------------------------------------------------
-- Table `drink`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `drink` ;

CREATE TABLE IF NOT EXISTS `drink` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `price` DECIMAL(4,2) NULL,
  `tab_id` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bar_tab`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bar_tab` ;

CREATE TABLE IF NOT EXISTS `bar_tab` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `location` VARCHAR(45) NULL,
  `created_at` VARCHAR(45) NOT NULL DEFAULT 'CONVERT( VARCHAR, GETDATE(), 112)',
  `bartender` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS dbuser@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'dbuser'@'localhost' IDENTIFIED BY 'dbuser';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'dbuser'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `drink`
-- -----------------------------------------------------
START TRANSACTION;
USE `beergurudb`;
INSERT INTO `drink` (`id`, `name`, `price`, `tab_id`) VALUES (1, 'Blue Hawaiian', 4, 1);
INSERT INTO `drink` (`id`, `name`, `price`, `tab_id`) VALUES (2, 'Midori Sour', 2, 2);
INSERT INTO `drink` (`id`, `name`, `price`, `tab_id`) VALUES (3, 'Irish Car Bomb', 3, 3);
INSERT INTO `drink` (`id`, `name`, `price`, `tab_id`) VALUES (4, 'Tom Collins', 1.5, 4);
INSERT INTO `drink` (`id`, `name`, `price`, `tab_id`) VALUES (5, 'Guinness draught', 3.75, 5);
INSERT INTO `drink` (`id`, `name`, `price`, `tab_id`) VALUES (6, 'Yuengling bottle', 7.5, 1);
INSERT INTO `drink` (`id`, `name`, `price`, `tab_id`) VALUES (7, 'Thai Terror', 1.25, 2);
INSERT INTO `drink` (`id`, `name`, `price`, `tab_id`) VALUES (8, 'Black Russian', 3, 3);
INSERT INTO `drink` (`id`, `name`, `price`, `tab_id`) VALUES (9, 'Kamikaze', 1.25, 4);
INSERT INTO `drink` (`id`, `name`, `price`, `tab_id`) VALUES (10, 'Yamazaki dram', 3.25, 5);
INSERT INTO `drink` (`id`, `name`, `price`, `tab_id`) VALUES (11, 'Modelo pitcher', 10, 1);
INSERT INTO `drink` (`id`, `name`, `price`, `tab_id`) VALUES (12, 'Long Island Iced Tea', 5.5, 2);
INSERT INTO `drink` (`id`, `name`, `price`, `tab_id`) VALUES (13, 'Dead Guy IPA can', 3.99, 3);
INSERT INTO `drink` (`id`, `name`, `price`, `tab_id`) VALUES (14, 'Arrogant Bastard bottle', 2.99, 4);
INSERT INTO `drink` (`id`, `name`, `price`, `tab_id`) VALUES (15, 'Summer Shandy can', 0.99, 5);

COMMIT;


-- -----------------------------------------------------
-- Data for table `bar_tab`
-- -----------------------------------------------------
START TRANSACTION;
USE `beergurudb`;
INSERT INTO `bar_tab` (`id`, `location`, `created_at`, `bartender`) VALUES (1, 'The Rusty Spur', DEFAULT, 'Casey');
INSERT INTO `bar_tab` (`id`, `location`, `created_at`, `bartender`) VALUES (2, 'Harry\'s', DEFAULT, 'Jack');
INSERT INTO `bar_tab` (`id`, `location`, `created_at`, `bartender`) VALUES (3, 'New Bohemia', DEFAULT, 'Steve');
INSERT INTO `bar_tab` (`id`, `location`, `created_at`, `bartender`) VALUES (4, 'The Prancing Pony', DEFAULT, 'Dog');
INSERT INTO `bar_tab` (`id`, `location`, `created_at`, `bartender`) VALUES (5, 'Evildrome Boozarama', DEFAULT, 'Ebenezer');

COMMIT;

