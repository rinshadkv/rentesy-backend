CREATE TYPE "public"."userRole" AS ENUM('PROPERTY_OWNER', 'PROPERTY_MANAGER', 'PROPERTY_OWER+PROPERTY_MANAGER', 'PROPERTY_COMPANY_MANAGMENT_OWNER', 'COMMUNITY_ASSCOCIATION', 'OTHER');--> statement-breakpoint
CREATE TYPE "public"."PropertyType" AS ENUM('RESEDENTIAL', 'COMMERCIAL', 'RESERVEDIAL+COMMERCIAL', 'COMMUNITY_ASSCOCIATION', 'AFFORDABLE_HOUSING', 'STORAGE', 'SHORT_TERM_RENTAL', 'OTHER');--> statement-breakpoint
CREATE TYPE "public"."Status" AS ENUM('COMPLETED', 'IN_PROGRESS', 'IN_REVIEW', 'REJECTED');--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"phone" varchar(255) NOT NULL,
	"role" "userRole" NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "requestes" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "requestes_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"noOfUnits" integer NOT NULL,
	"propertyType" "PropertyType" NOT NULL,
	"status" "Status" NOT NULL,
	"userId" integer NOT NULL,
	"durationToManage" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tokens" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "tokens_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"token" varchar(255) NOT NULL,
	"userId" integer NOT NULL,
	"expiresAt" timestamp
);
