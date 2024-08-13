import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";


@Entity({ name: 'bank_accounts' })
export class BankAccount extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    accountNumber: string;

    @Column({ nullable: false })
    routingNumber: string;

    @Column({ nullable: false })
    bankName: string;

    @Column({ nullable: false })
    balance: number;

    @ManyToOne(() => User, (usr) => usr.id)
    userId: number;
}