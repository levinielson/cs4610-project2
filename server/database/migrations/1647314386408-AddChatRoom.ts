import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class AddChatRoom1647314386408 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table ({
                name: 'chatRoom',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true
                    },
                    {
                        name: 'yCoordinate',
                        type: 'float',
                        isNullable: false,
                    },
                    {
                        name: 'xCoordinate',
                        type: 'float',
                        isNullable: false,
                    }
                ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('chatRoom');
    }

}
