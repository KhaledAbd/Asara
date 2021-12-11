-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema asara
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema asara
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `asara` ;
USE `asara` ;

-- -----------------------------------------------------
-- Table `asara`.`AspNetUsers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `asara`.`AspNetUsers` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Gender` varchar(256) COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  `DateOfBirth` DATETIME(6) NOT NULL,
  `KnownAs` varchar(256) COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  `Created` DATETIME(6) NOT NULL,
  `LastActive` DATETIME(6) NOT NULL,
  `City` varchar(256) COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  `Telephone` varchar(13) COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  `Money` DOUBLE NOT NULL,
  `UserName` VARCHAR(256) COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  `NormalizedUserName` VARCHAR(256) COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  `Email` VARCHAR(256) COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  `NormalizedEmail` VARCHAR(256) COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  `EmailConfirmed` TINYINT(1) NOT NULL,
  `PasswordHash` varchar(256) COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  `SecurityStamp` varchar(256) COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  `ConcurrencyStamp` varchar(256) COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  `PhoneNumber` varchar(256) COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  `PhoneNumberConfirmed` TINYINT(1) NOT NULL,
  `TwoFactorEnabled` TINYINT(1) NOT NULL,
  `LockoutEnd` DATETIME(6) NULL DEFAULT NULL,
  `LockoutEnabled` TINYINT(1) NOT NULL,
  `AccessFailedCount` INT NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `UserNameIndex` (`NormalizedUserName` ASC),
  INDEX `EmailIndex` (`NormalizedEmail` ASC))
;


-- -----------------------------------------------------
-- Table `asara`.`Account`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `asara`.`Account` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Money` DOUBLE NOT NULL,
  `LastUserMoney` DOUBLE NOT NULL,
  `CreatedAt` DATETIME(6) NOT NULL,
  `IsIntial` TINYINT(1) NOT NULL,
  `UserId` INT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `IX_Account_UserId` (`UserId` ASC),
  CONSTRAINT `FK_Account_AspNetUsers_UserId`
    FOREIGN KEY (`UserId`)
    REFERENCES `asara`.`AspNetUsers` (`Id`)
    ON DELETE CASCADE);


-- -----------------------------------------------------
-- Table `asara`.`AspNetRoles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `asara`.`AspNetRoles` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(256) COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  `NormalizedName` VARCHAR(256) COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  `ConcurrencyStamp` varchar(256) COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `RoleNameIndex` (`NormalizedName` ASC))
;


-- -----------------------------------------------------
-- Table `asara`.`AspNetRoleClaims`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `asara`.`AspNetRoleClaims` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `RoleId` INT NOT NULL,
  `ClaimType` varchar(256) COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  `ClaimValue` varchar(256) COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  PRIMARY KEY (`Id`),
  INDEX `IX_AspNetRoleClaims_RoleId` (`RoleId` ASC),
  CONSTRAINT `FK_AspNetRoleClaims_AspNetRoles_RoleId`
    FOREIGN KEY (`RoleId`)
    REFERENCES `asara`.`AspNetRoles` (`Id`)
    ON DELETE CASCADE)
;


-- -----------------------------------------------------
-- Table `asara`.`AspNetUserClaims`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `asara`.`AspNetUserClaims` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `UserId` INT NOT NULL,
  `ClaimType` varchar(256) COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  `ClaimValue` varchar(256) COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  PRIMARY KEY (`Id`),
  INDEX `IX_AspNetUserClaims_UserId` (`UserId` ASC),
  CONSTRAINT `FK_AspNetUserClaims_AspNetUsers_UserId`
    FOREIGN KEY (`UserId`)
    REFERENCES `asara`.`AspNetUsers` (`Id`)
    ON DELETE CASCADE)
;


-- -----------------------------------------------------
-- Table `asara`.`AspNetUserLogins`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `asara`.`AspNetUserLogins` (
  `LoginProvider` VARCHAR(255) COLLATE 'utf8mb4_0900_ai_ci' NOT NULL,
  `ProviderKey` VARCHAR(255) COLLATE 'utf8mb4_0900_ai_ci' NOT NULL,
  `ProviderDisplayName` varchar(256) COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  `UserId` INT NOT NULL,
  PRIMARY KEY (`LoginProvider`, `ProviderKey`),
  INDEX `IX_AspNetUserLogins_UserId` (`UserId` ASC),
  CONSTRAINT `FK_AspNetUserLogins_AspNetUsers_UserId`
    FOREIGN KEY (`UserId`)
    REFERENCES `asara`.`AspNetUsers` (`Id`)
    ON DELETE CASCADE)
;


-- -----------------------------------------------------
-- Table `asara`.`AspNetUserRoles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `asara`.`AspNetUserRoles` (
  `UserId` INT NOT NULL,
  `RoleId` INT NOT NULL,
  PRIMARY KEY (`UserId`, `RoleId`),
  INDEX `IX_AspNetUserRoles_RoleId` (`RoleId` ASC),
  CONSTRAINT `FK_AspNetUserRoles_AspNetRoles_RoleId`
    FOREIGN KEY (`RoleId`)
    REFERENCES `asara`.`AspNetRoles` (`Id`)
    ON DELETE CASCADE,
  CONSTRAINT `FK_AspNetUserRoles_AspNetUsers_UserId`
    FOREIGN KEY (`UserId`)
    REFERENCES `asara`.`AspNetUsers` (`Id`)
    ON DELETE CASCADE)
;


-- -----------------------------------------------------
-- Table `asara`.`AspNetUserTokens`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `asara`.`AspNetUserTokens` (
  `UserId` INT NOT NULL,
  `LoginProvider` VARCHAR(255) COLLATE 'utf8mb4_0900_ai_ci' NOT NULL,
  `Name` VARCHAR(255) COLLATE 'utf8mb4_0900_ai_ci' NOT NULL,
  `Value` varchar(256) COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  PRIMARY KEY (`UserId`, `LoginProvider`, `Name`),
  CONSTRAINT `FK_AspNetUserTokens_AspNetUsers_UserId`
    FOREIGN KEY (`UserId`)
    REFERENCES `asara`.`AspNetUsers` (`Id`)
    ON DELETE CASCADE)
;


-- -----------------------------------------------------
-- Table `asara`.`Bills`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `asara`.`Bills` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `UserId` INT NOT NULL,
  `Cost` DOUBLE NOT NULL,
  `ClientName` varchar(256) COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  `Type` INT NOT NULL,
  `CreatedAt` DATETIME(6) NOT NULL,
  `Paid` DOUBLE NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `IX_Bills_UserId` (`UserId` ASC),
  CONSTRAINT `FK_Bills_AspNetUsers_UserId`
    FOREIGN KEY (`UserId`)
    REFERENCES `asara`.`AspNetUsers` (`Id`)
    ON DELETE CASCADE)
;


-- -----------------------------------------------------
-- Table `asara`.`Units`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `asara`.`Units` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Name` varchar(256) COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  PRIMARY KEY (`Id`))
;


-- -----------------------------------------------------
-- Table `asara`.`Items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `asara`.`Items` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Name` varchar(256) COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  `Price` DOUBLE NOT NULL,
  `Quentity` DOUBLE NOT NULL,
  `Type` INT NOT NULL,
  `UnitId` INT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `IX_Items_UnitId` (`UnitId` ASC),
  CONSTRAINT `FK_Items_Units_UnitId`
    FOREIGN KEY (`UnitId`)
    REFERENCES `asara`.`Units` (`Id`)
    ON DELETE CASCADE)
;


-- -----------------------------------------------------
-- Table `asara`.`BillItems`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `asara`.`BillItems` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Price` DOUBLE NOT NULL,
  `Quentity` DOUBLE NOT NULL,
  `ItemId` INT NOT NULL,
  `BillId` INT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `IX_BillItems_BillId` (`BillId` ASC),
  INDEX `IX_BillItems_ItemId` (`ItemId` ASC),
  CONSTRAINT `FK_BillItems_Bills_BillId`
    FOREIGN KEY (`BillId`)
    REFERENCES `asara`.`Bills` (`Id`)
    ON DELETE CASCADE,
  CONSTRAINT `FK_BillItems_Items_ItemId`
    FOREIGN KEY (`ItemId`)
    REFERENCES `asara`.`Items` (`Id`)
    ON DELETE CASCADE)
;


-- -----------------------------------------------------
-- Table `asara`.`Expenses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `asara`.`Expenses` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Reason` varchar(256) COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  `Paid` DOUBLE NOT NULL,
  `CreatedAt` DATETIME(6) NOT NULL,
  `BillId` INT NOT NULL,
  `UserId` INT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `IX_Expenses_BillId` (`BillId` ASC),
  INDEX `IX_Expenses_UserId` (`UserId` ASC),
  CONSTRAINT `FK_Expenses_AspNetUsers_UserId`
    FOREIGN KEY (`UserId`)
    REFERENCES `asara`.`AspNetUsers` (`Id`)
    ON DELETE CASCADE,
  CONSTRAINT `FK_Expenses_Bills_BillId`
    FOREIGN KEY (`BillId`)
    REFERENCES `asara`.`Bills` (`Id`)
    ON DELETE CASCADE)
;


-- -----------------------------------------------------
-- Table `asara`.`ExtraExpenses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `asara`.`ExtraExpenses` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Reason` varchar(256) COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  `Paid` DOUBLE NOT NULL,
  `CreatedAt` DATETIME(6) NOT NULL,
  `UserId` INT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `IX_ExtraExpenses_UserId` (`UserId` ASC),
  CONSTRAINT `FK_ExtraExpenses_AspNetUsers_UserId`
    FOREIGN KEY (`UserId`)
    REFERENCES `asara`.`AspNetUsers` (`Id`)
    ON DELETE CASCADE)
;


-- -----------------------------------------------------
-- Table `asara`.`Shops`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `asara`.`Shops` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Name` varchar(256) COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  `Address` varchar(256) COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  `Telephone` varchar(256) COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  `Title` varchar(256) COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  PRIMARY KEY (`Id`))
;


-- -----------------------------------------------------
-- Table `asara`.`StockBills`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `asara`.`StockBills` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `UserId` INT NOT NULL,
  `Type` INT NOT NULL,
  `CreatedAt` DATETIME(6) NOT NULL,
  `Worker` varchar(256) COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  PRIMARY KEY (`Id`),
  INDEX `IX_StockBills_UserId` (`UserId` ASC),
  CONSTRAINT `FK_StockBills_AspNetUsers_UserId`
    FOREIGN KEY (`UserId`)
    REFERENCES `asara`.`AspNetUsers` (`Id`)
    ON DELETE CASCADE)
;


-- -----------------------------------------------------
-- Table `asara`.`StockItems`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `asara`.`StockItems` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Quentity` DOUBLE NOT NULL,
  `ItemId` INT NOT NULL,
  `StockBillId` INT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `IX_StockItems_ItemId` (`ItemId` ASC),
  INDEX `IX_StockItems_StockBillId` (`StockBillId` ASC),
  CONSTRAINT `FK_StockItems_Items_ItemId`
    FOREIGN KEY (`ItemId`)
    REFERENCES `asara`.`Items` (`Id`)
    ON DELETE CASCADE,
  CONSTRAINT `FK_StockItems_StockBills_StockBillId`
    FOREIGN KEY (`StockBillId`)
    REFERENCES `asara`.`StockBills` (`Id`)
    ON DELETE CASCADE)
;


-- -----------------------------------------------------
-- Table `asara`.`__EFMigrationsHistory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `asara`.`__EFMigrationsHistory` (
  `MigrationId` VARCHAR(150) COLLATE 'utf8mb4_0900_ai_ci' NOT NULL,
  `ProductVersion` VARCHAR(32) COLLATE 'utf8mb4_0900_ai_ci' NOT NULL,
  PRIMARY KEY (`MigrationId`))
;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
