/*
SQLyog Ultimate v12.09 (64 bit)
MySQL - 5.7.21 : Database - reimburse
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`reimburse` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */;

USE `reimburse`;

/*Table structure for table `department` */

DROP TABLE IF EXISTS `department`;

CREATE TABLE `department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) COLLATE utf8_bin DEFAULT NULL COMMENT '名称',
  `description` varchar(512) COLLATE utf8_bin DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT NULL,
  `update_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=130 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Table structure for table `employment` */

DROP TABLE IF EXISTS `employment`;

CREATE TABLE `employment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) COLLATE utf8_bin DEFAULT NULL COMMENT '名称',
  `password` varchar(64) COLLATE utf8_bin DEFAULT NULL COMMENT '密码',
  `sex` int(1) DEFAULT NULL COMMENT '1:男；2:女',
  `age` int(11) DEFAULT NULL COMMENT '年龄',
  `telephone` varchar(32) COLLATE utf8_bin DEFAULT NULL COMMENT '电话号码',
  `address` varchar(512) COLLATE utf8_bin DEFAULT NULL COMMENT '住址',
  `employment_id` varchar(64) COLLATE utf8_bin DEFAULT NULL COMMENT '工号',
  `department_id` int(11) DEFAULT NULL COMMENT '部门ID',
  `type` int(1) DEFAULT NULL COMMENT '2:管理员；1:普通员工',
  `permission` int(1) DEFAULT NULL COMMENT '1:有审批权限；2:无审批权限',
  `description` varchar(512) COLLATE utf8_bin DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT NULL,
  `update_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Table structure for table `project` */

DROP TABLE IF EXISTS `project`;

CREATE TABLE `project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) COLLATE utf8_bin DEFAULT NULL,
  `description` varchar(512) COLLATE utf8_bin DEFAULT NULL,
  `bianhao` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT NULL,
  `update_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Table structure for table `reimburse_base` */

DROP TABLE IF EXISTS `reimburse_base`;

CREATE TABLE `reimburse_base` (
  `departmentName` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `status` int(2) DEFAULT NULL,
  `dan_hao` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employmentName` varchar(32) COLLATE utf8_bin DEFAULT NULL COMMENT '员工姓名',
  `departmentId` int(11) DEFAULT NULL COMMENT '部门ID',
  `total` varchar(32) COLLATE utf8_bin DEFAULT NULL COMMENT '总额',
  `description` varchar(512) COLLATE utf8_bin DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT NULL,
  `update_time` timestamp NULL DEFAULT NULL,
  `name` varchar(256) COLLATE utf8_bin DEFAULT NULL,
  `project_bianHao` varchar(128) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Table structure for table `reimburse_detail` */

DROP TABLE IF EXISTS `reimburse_detail`;

CREATE TABLE `reimburse_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `begin_time` timestamp NULL DEFAULT NULL COMMENT '费用发生时间',
  `money` varchar(32) COLLATE utf8_bin DEFAULT NULL COMMENT '金额',
  `dan_hao` varchar(64) COLLATE utf8_bin DEFAULT NULL COMMENT '报销ID',
  `description` varchar(512) COLLATE utf8_bin DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT NULL,
  `update_time` timestamp NULL DEFAULT NULL,
  `project_name` varchar(256) COLLATE utf8_bin DEFAULT NULL,
  `type_id` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `type_name` varchar(256) COLLATE utf8_bin DEFAULT NULL,
  `end_time` timestamp NULL DEFAULT NULL,
  `end_time2` timestamp NULL DEFAULT NULL,
  `project_bianHao` varchar(128) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=148 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Table structure for table `type_big` */

DROP TABLE IF EXISTS `type_big`;

CREATE TABLE `type_big` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) COLLATE utf8_bin DEFAULT NULL COMMENT '名称',
  `description` varchar(512) COLLATE utf8_bin DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT NULL,
  `update_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Table structure for table `type_small` */

DROP TABLE IF EXISTS `type_small`;

CREATE TABLE `type_small` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) COLLATE utf8_bin DEFAULT NULL COMMENT '名称',
  `big_type_id` int(32) DEFAULT NULL COMMENT '大类类型',
  `description` varchar(512) COLLATE utf8_bin DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT NULL,
  `update_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

insert  into `department` values (1,'蓝盾信息安全技术有限公司',NULL,NULL,NULL);
insert  into `employment` values (1,'superadmin','superadmin',NULL,NULL,NULL,NULL,'9',1,9,NULL,NULL,NULL,NULL);