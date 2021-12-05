import {MigrationInterface, QueryRunner} from "typeorm";

export class newEntitiess1638714634829 implements MigrationInterface {
    name = 'newEntitiess1638714634829'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sessions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" character varying NOT NULL, "userId" uuid, CONSTRAINT "REL_57de40bc620f456c7311aa3a1e" UNIQUE ("userId"), CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, "nationality" character varying NOT NULL, "pictureURL" character varying, "bio" character varying, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "body" character varying NOT NULL, "like_count" integer NOT NULL DEFAULT '0', "date" TIMESTAMP NOT NULL DEFAULT now(), "examId" integer, "userId" uuid, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments_users_liked_users" ("commentsId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_62294871c4206879b6ed2b42ae9" PRIMARY KEY ("commentsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3ed6e02761fb0f5d73e518432c" ON "comments_users_liked_users" ("commentsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7f7a6bed1ec325fc7d9c976194" ON "comments_users_liked_users" ("usersId") `);
        await queryRunner.query(`CREATE TABLE "exams_users_liked_users" ("examsId" integer NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_51802f221c4d9d1968d83ace438" PRIMARY KEY ("examsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fb7b9dfd6580cae66e80674d24" ON "exams_users_liked_users" ("examsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_58cbbdd46c7c44d48c9ba77a78" ON "exams_users_liked_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "exams" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "exams" ADD "date" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "exams" ADD "like_count" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "exams" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "exams" DROP CONSTRAINT "FK_3dcd9199b8cd801383e623c3d11"`);
        await queryRunner.query(`ALTER TABLE "exams" DROP CONSTRAINT "FK_a4b572eed2e7293985b93a55eb3"`);
        await queryRunner.query(`ALTER TABLE "exams" ALTER COLUMN "courseId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "exams" ALTER COLUMN "categoryId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "FK_57de40bc620f456c7311aa3a1e6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_cf29555b21206721ffba0f1cd73" FOREIGN KEY ("examId") REFERENCES "exams"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exams" ADD CONSTRAINT "FK_5ec7ff70b19e78f3d412addad4f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exams" ADD CONSTRAINT "FK_3dcd9199b8cd801383e623c3d11" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exams" ADD CONSTRAINT "FK_a4b572eed2e7293985b93a55eb3" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments_users_liked_users" ADD CONSTRAINT "FK_3ed6e02761fb0f5d73e518432c7" FOREIGN KEY ("commentsId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "comments_users_liked_users" ADD CONSTRAINT "FK_7f7a6bed1ec325fc7d9c9761949" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "exams_users_liked_users" ADD CONSTRAINT "FK_fb7b9dfd6580cae66e80674d242" FOREIGN KEY ("examsId") REFERENCES "exams"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "exams_users_liked_users" ADD CONSTRAINT "FK_58cbbdd46c7c44d48c9ba77a787" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exams_users_liked_users" DROP CONSTRAINT "FK_58cbbdd46c7c44d48c9ba77a787"`);
        await queryRunner.query(`ALTER TABLE "exams_users_liked_users" DROP CONSTRAINT "FK_fb7b9dfd6580cae66e80674d242"`);
        await queryRunner.query(`ALTER TABLE "comments_users_liked_users" DROP CONSTRAINT "FK_7f7a6bed1ec325fc7d9c9761949"`);
        await queryRunner.query(`ALTER TABLE "comments_users_liked_users" DROP CONSTRAINT "FK_3ed6e02761fb0f5d73e518432c7"`);
        await queryRunner.query(`ALTER TABLE "exams" DROP CONSTRAINT "FK_a4b572eed2e7293985b93a55eb3"`);
        await queryRunner.query(`ALTER TABLE "exams" DROP CONSTRAINT "FK_3dcd9199b8cd801383e623c3d11"`);
        await queryRunner.query(`ALTER TABLE "exams" DROP CONSTRAINT "FK_5ec7ff70b19e78f3d412addad4f"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_cf29555b21206721ffba0f1cd73"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "FK_57de40bc620f456c7311aa3a1e6"`);
        await queryRunner.query(`ALTER TABLE "exams" ALTER COLUMN "categoryId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "exams" ALTER COLUMN "courseId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "exams" ADD CONSTRAINT "FK_a4b572eed2e7293985b93a55eb3" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exams" ADD CONSTRAINT "FK_3dcd9199b8cd801383e623c3d11" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exams" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "exams" DROP COLUMN "like_count"`);
        await queryRunner.query(`ALTER TABLE "exams" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "exams" DROP COLUMN "description"`);
        await queryRunner.query(`DROP INDEX "IDX_58cbbdd46c7c44d48c9ba77a78"`);
        await queryRunner.query(`DROP INDEX "IDX_fb7b9dfd6580cae66e80674d24"`);
        await queryRunner.query(`DROP TABLE "exams_users_liked_users"`);
        await queryRunner.query(`DROP INDEX "IDX_7f7a6bed1ec325fc7d9c976194"`);
        await queryRunner.query(`DROP INDEX "IDX_3ed6e02761fb0f5d73e518432c"`);
        await queryRunner.query(`DROP TABLE "comments_users_liked_users"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "sessions"`);
    }

}
