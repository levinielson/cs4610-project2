import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addRoomName1647916263974 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'chatRoom',
            new TableColumn({
                name: 'roomName',
                type: 'text',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('chatRoom', 'roomName');
    }

}
