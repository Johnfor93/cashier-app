/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : PostgreSQL
 Source Server Version : 150003
 Source Host           : localhost:5432
 Source Catalog        : cashier-app
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 150003
 File Encoding         : 65001

 Date: 13/08/2023 02:51:28
*/


-- ----------------------------
-- Table structure for transaksi
-- ----------------------------
DROP TABLE IF EXISTS "public"."transaksi";
CREATE TABLE "public"."transaksi" (
  "id_transaksi" "pg_catalog"."int8" NOT NULL DEFAULT nextval('transaksi_id_transaksi_seq'::regclass),
  "tanggal_transaksi" "pg_catalog"."timestamp",
  "total_transaksi" "pg_catalog"."int4"
)
;

-- ----------------------------
-- Primary Key structure for table transaksi
-- ----------------------------
ALTER TABLE "public"."transaksi" ADD CONSTRAINT "transaksi_pkey" PRIMARY KEY ("id_transaksi");
