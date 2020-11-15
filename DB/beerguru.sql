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
-- Table `beer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `beer` ;

CREATE TABLE IF NOT EXISTS `beer` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL,
  `brewery` VARCHAR(255) NULL,
  `style` VARCHAR(255) NULL,
  `abv` DECIMAL(3,1) NULL,
  `description` VARCHAR(4095) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `drink`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `drink` ;

CREATE TABLE IF NOT EXISTS `drink` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `price` DECIMAL(4,2) NULL,
  `tab_id` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bar_tab`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bar_tab` ;

CREATE TABLE IF NOT EXISTS `bar_tab` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `location` VARCHAR(45) NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
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
-- Data for table `beer`
-- -----------------------------------------------------
START TRANSACTION;
USE `beergurudb`;
INSERT INTO `beer` (`id`, `name`, `brewery`, `style`, `abv`, `description`) VALUES (1, 'A', 'B', 'C', 5.0, 'D');

COMMIT;


-- -----------------------------------------------------
-- Data for table `drink`
-- -----------------------------------------------------
START TRANSACTION;
USE `beergurudb`;
INSERT INTO `drink` (`id`, `name`, `price`, `tab_id`) VALUES (1, 'Blue Hawaiian', 4, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `bar_tab`
-- -----------------------------------------------------
START TRANSACTION;
USE `beergurudb`;
INSERT INTO `bar_tab` (`id`, `location`, `created_at`, `bartender`) VALUES (1, 'The Rusty Spur', DEFAULT, 'Casey');

COMMIT;

