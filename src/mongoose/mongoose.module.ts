import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSchema, CustomerSchema, DeliveryPartnerSchema } from '../mongoose/users.entity.js';
import { BranchSchema } from './branch.entity.js';
import { CategorySchema } from './category.entity.js';
import { ProductSchema } from './products.entity.js';
import { CounterSchema } from './counter.entity.js';
import { OrderSchema } from './order.entity.js';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Admin', schema: AdminSchema },
            { name: 'Customer', schema: CustomerSchema },
            { name: 'DeliveryPartner', schema: DeliveryPartnerSchema },
            { name: 'Branch', schema: BranchSchema },
            { name: 'Category', schema: CategorySchema },
            { name: 'Product', schema: ProductSchema },
            { name: 'Counter', schema: CounterSchema },
            { name: 'Order', schema: OrderSchema },
        ]),
    ],
    exports: [MongooseModule],
})
export class MongooseSchemasModule { }