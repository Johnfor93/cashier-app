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

 Date: 13/08/2023 02:51:16
*/


-- ----------------------------
-- Table structure for dtl_transaksi
-- ----------------------------
DROP TABLE IF EXISTS "public"."dtl_transaksi";
CREATE TABLE "public"."dtl_transaksi" (
  "id" "pg_catalog"."int8" NOT NULL DEFAULT nextval('dtl_transaksi_id_seq'::regclass),
  "id_transaksi" "pg_catalog"."int8" NOT NULL DEFAULT nextval('dtl_transaksi_id_transaksi_seq'::regclass),
  "kodebarang" "pg_catalog"."varchar" COLLATE "pg_catalog"."default",
  "jumlah_barang" "pg_catalog"."int4",
  "subtotal" "pg_catalog"."int4"
)
;

-- ----------------------------
-- Primary Key structure for table dtl_transaksi
-- ----------------------------
ALTER TABLE "public"."dtl_transaksi" ADD CONSTRAINT "dtl_transaksi_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table dtl_transaksi
-- ----------------------------
ALTER TABLE "public"."dtl_transaksi" ADD CONSTRAINT "dtl_transaksi_id_transaksi_fkey" FOREIGN KEY ("id_transaksi") REFERENCES "public"."transaksi" ("id_transaksi") ON DELETE NO ACTION ON UPDATE NO ACTION;
