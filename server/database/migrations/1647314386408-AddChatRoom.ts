import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class AddChatRoom1647314386408 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table ({
                name: 'chat_room',
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
                    },
                    {
                        name: 'name',
                        type: 'text'
                    }
                ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('chat_room');
    }

}
