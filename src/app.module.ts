import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Admin, Customer, DeliveryPartner } from './mongoose/users.entity.js';
import { MongooseSchemasModule } from './mongoose/mongoose.module.js';
import { ConfigModule } from '@nestjs/config';
import { Model } from 'mongoose';
import * as AdminJSMongoose from '@adminjs/mongoose'
import AdminJS from 'adminjs'
import { Branch } from './mongoose/branch.entity.js';
import { createAuthenticateFunction } from './utils/helper.js';
import { Category } from './mongoose/category.entity.js';
import { Product } from './mongoose/products.entity.js';
import { Counter } from './mongoose/counter.entity.js';
import { Order } from './mongoose/order.entity.js';

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
})

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URL),
    import('@adminjs/nestjs').then(({ AdminModule }) => AdminModule.createAdminAsync({
      imports: [
        MongooseSchemasModule
      ],
      inject: [
        getModelToken('Admin'),
        getModelToken('Customer'),
        getModelToken('DeliveryPartner'),
        getModelToken('Branch'),
        getModelToken('Category'),
        getModelToken('Product'),
        getModelToken('Order'),
        getModelToken('Counter'),
      ],
      useFactory: (
        adminModel: Model<Admin>,
        customerModel: Model<Customer>,
        deliveryPartnerModel: Model<DeliveryPartner>,
        branchModel: Model<Branch>,
        categoryModel: Model<Category>,
        productModel: Model<Product>,
        counterModel: Model<Counter>,
        orderModel: Model<Order>
      ) => ({
        adminJsOptions: {
          rootPath: '/admin',
          resources: [
            {
              resource: adminModel,
              options: {
                listProperties: ['email', 'role', 'isActivated'],
                filterProperties: ['email', 'role']
              }
            },
            {
              resource: customerModel,
              options: {
                listProperties: ['phone', 'role', 'isActivated'],
                filterProperties: ['phone', 'role']
              },
            },
            {
              resource: deliveryPartnerModel,
              options: {
                listProperties: ['phone', 'role', 'isActivated'],
                filterProperties: ['phone', 'role']
              },
            },
            {
              resource: branchModel
            },
            {
              resource: categoryModel
            },
            {
              resource: productModel
            },
            {
              resource: counterModel
            },
            {
              resource: orderModel
            },
          ],
          branding: {
            companyName: 'Blinkit',
            withMadeWithLove: false,
            favicon:
              "https://res.cloudinary.com/dponzgerb/image/upload/v1722852076/s32qztc3slzqukdletgj.png",
            logo: "https://res.cloudinary.com/dponzgerb/image/upload/v1722852076/s32qztc3slzqukdletgj.png"
          }
        },
        auth: {
          authenticate: createAuthenticateFunction(adminModel),
          cookieName: 'adminjs',
          cookiePassword: 'secret'
        },
        sessionOptions: {
          resave: true,
          saveUninitialized: true,
          secret: 'secret'
        },
      }),
    })),
    MongooseSchemasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
