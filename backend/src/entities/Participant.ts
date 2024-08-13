import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Payment } from "./Payment";
import { PaymentStatusProvider } from "../Utils/Enums/PaymentStatusProvider";
import { Bill } from "./Bill";

@Entity({ name: 'participants' })
export class Participants extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;


    @ManyToOne(() => User, (usr) => usr.id)
    userId: number;

    @ManyToOne(() => Payment, (payment) => payment.id) 
    paymentId: number;


    @Column({
        type: 'enum',
        enum: PaymentStatusProvider,
        default: PaymentStatusProvider.PENDING
    })
    status: PaymentStatusProvider

    @Column({ nullable: false })
    owedAmount: number;

    @ManyToMany(() => Bill, (bill) => bill.id)
    billId: number;
}