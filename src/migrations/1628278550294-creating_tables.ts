import {MigrationInterface, QueryRunner} from "typeorm";

export class creatingTables1628278550294 implements MigrationInterface {
    name = 'creatingTables1628278550294'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lecturers" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_4dffa0b38d36bfd09610d64b399" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "courses" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "lecturerId" integer, CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "exams" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "url" character varying NOT NULL, "courseId" integer, "categoryId" integer, CONSTRAINT "PK_b43159ee3efa440952794b4f53e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "FK_991b0b42fb5ca44bf61d3772188" FOREIGN KEY ("lecturerId") REFERENCES "lecturers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exams" ADD CONSTRAINT "FK_3dcd9199b8cd801383e623c3d11" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exams" ADD CONSTRAINT "FK_a4b572eed2e7293985b93a55eb3" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exams" DROP CONSTRAINT "FK_a4b572eed2e7293985b93a55eb3"`);
        await queryRunner.query(`ALTER TABLE "exams" DROP CONSTRAINT "FK_3dcd9199b8cd801383e623c3d11"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "FK_991b0b42fb5ca44bf61d3772188"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "exams"`);
        await queryRunner.query(`DROP TABLE "courses"`);
        await queryRunner.query(`DROP TABLE "lecturers"`);
    }

}
