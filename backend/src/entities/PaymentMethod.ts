import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { PaymentProvider } from "../Utils/Enums/PaymentProvider";

@Entity({ name: 'payment_method' })
export class PaymentMethod extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User, (usr) => usr.id)
    userId: number;
    
    @Column({
        type: 'enum',
        enum: PaymentProvider,
        default: PaymentProvider.CreditCard,
        nullable: false
    })
    type: PaymentProvider;
}