import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { PaymentStatusProvider } from "../Utils/Enums/PaymentStatusProvider";

@Entity({ name: "Bill" })
export class Bill extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    amount: number;

    @ManyToOne(() => User, (user) => user.id)
    creatorId: number;

    @Column({ nullable: false })
    title: string

    @Column({ nullable: false })
    totalAmount: number

    @Column({
        type: 'enum',
        enum: PaymentStatusProvider,
        default: PaymentStatusProvider.PENDING
    })
    billStatus: PaymentStatusProvider

    @Column({ nullable: false, default: new Date() })
    createdOn: Date
}