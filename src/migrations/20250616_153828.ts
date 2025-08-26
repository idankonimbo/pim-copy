import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_products_files_file_type" AS ENUM('text', 'media', 'code');
  CREATE TYPE "public"."enum_products_reviews_rating" AS ENUM('1', '2', '3', '4', '5');
  CREATE TYPE "public"."enum_products_status" AS ENUM('draft', 'visible', 'not_visible', 'archive');
  CREATE TABLE IF NOT EXISTS "products_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "products_images_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar,
  	"caption" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "products_icons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"name" varchar,
  	"label" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "products_files" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"file_type" "enum_products_files_file_type",
  	"url" varchar,
  	"upload_id" integer,
  	"iframe" varchar,
  	"alt" varchar,
  	"caption" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "products_spec_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"value" jsonb
  );
  
  CREATE TABLE IF NOT EXISTS "products_spec" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"group" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "products_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"value" jsonb
  );
  
  CREATE TABLE IF NOT EXISTS "products_terms" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"term" jsonb,
  	"attachment_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "products_reviews" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"customer" varchar,
  	"date" timestamp(3) with time zone,
  	"rating" "enum_products_reviews_rating" NOT NULL,
  	"review" jsonb,
  	"image_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"content" jsonb,
  	"seasonal_expiry_date" timestamp(3) with time zone,
  	"product_group" varchar,
  	"status" "enum_products_status",
  	"main_image_image_id" integer,
  	"main_image_alt" varchar,
  	"main_image_caption" varchar,
  	"material" varchar,
  	"dimensions" varchar,
  	"weight_unit" varchar,
  	"weight_value" numeric,
  	"product_code" varchar,
  	"model_number" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"keywords" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "products_id" integer;
  DO $$ BEGIN
   ALTER TABLE "products_tags" ADD CONSTRAINT "products_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_images_gallery" ADD CONSTRAINT "products_images_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_images_gallery" ADD CONSTRAINT "products_images_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_icons" ADD CONSTRAINT "products_icons_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_icons" ADD CONSTRAINT "products_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_files" ADD CONSTRAINT "products_files_upload_id_media_id_fk" FOREIGN KEY ("upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_files" ADD CONSTRAINT "products_files_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_spec_values" ADD CONSTRAINT "products_spec_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_spec"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_spec" ADD CONSTRAINT "products_spec_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_features" ADD CONSTRAINT "products_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_terms" ADD CONSTRAINT "products_terms_attachment_id_media_id_fk" FOREIGN KEY ("attachment_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_terms" ADD CONSTRAINT "products_terms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_reviews" ADD CONSTRAINT "products_reviews_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_reviews" ADD CONSTRAINT "products_reviews_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products" ADD CONSTRAINT "products_main_image_image_id_media_id_fk" FOREIGN KEY ("main_image_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "products_tags_order_idx" ON "products_tags" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_tags_parent_id_idx" ON "products_tags" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_images_gallery_order_idx" ON "products_images_gallery" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_images_gallery_parent_id_idx" ON "products_images_gallery" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_images_gallery_image_idx" ON "products_images_gallery" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "products_icons_order_idx" ON "products_icons" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_icons_parent_id_idx" ON "products_icons" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_icons_image_idx" ON "products_icons" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "products_files_order_idx" ON "products_files" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_files_parent_id_idx" ON "products_files" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_files_upload_idx" ON "products_files" USING btree ("upload_id");
  CREATE INDEX IF NOT EXISTS "products_spec_values_order_idx" ON "products_spec_values" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_spec_values_parent_id_idx" ON "products_spec_values" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_spec_order_idx" ON "products_spec" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_spec_parent_id_idx" ON "products_spec" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_features_order_idx" ON "products_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_features_parent_id_idx" ON "products_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_terms_order_idx" ON "products_terms" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_terms_parent_id_idx" ON "products_terms" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_terms_attachment_idx" ON "products_terms" USING btree ("attachment_id");
  CREATE INDEX IF NOT EXISTS "products_reviews_order_idx" ON "products_reviews" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_reviews_parent_id_idx" ON "products_reviews" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_reviews_image_idx" ON "products_reviews" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "products_main_image_main_image_image_idx" ON "products" USING btree ("main_image_image_id");
  CREATE INDEX IF NOT EXISTS "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "products_created_at_idx" ON "products" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_images_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_icons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_files" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_spec_values" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_spec" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_terms" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_reviews" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "products_tags" CASCADE;
  DROP TABLE "products_images_gallery" CASCADE;
  DROP TABLE "products_icons" CASCADE;
  DROP TABLE "products_files" CASCADE;
  DROP TABLE "products_spec_values" CASCADE;
  DROP TABLE "products_spec" CASCADE;
  DROP TABLE "products_features" CASCADE;
  DROP TABLE "products_terms" CASCADE;
  DROP TABLE "products_reviews" CASCADE;
  DROP TABLE "products" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_products_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_products_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "products_id";
  DROP TYPE "public"."enum_products_files_file_type";
  DROP TYPE "public"."enum_products_reviews_rating";
  DROP TYPE "public"."enum_products_status";`)
}
