import { BaseEntity, Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BankAccount } from "./BankAccount";
import { PaymentMethod } from "./PaymentMethod";

@Entity({ name: "payments" })
export class Payment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;

    @ManyToOne(() => BankAccount, (bank) => bank.id)
    bankID: number;

    @Column()
    paymentDate: Date;

    @OneToOne(() => PaymentMethod, (paymentMethod) => paymentMethod.id)
    paymentMethodId: number;
}