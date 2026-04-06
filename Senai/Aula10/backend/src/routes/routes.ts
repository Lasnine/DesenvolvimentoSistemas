import { Express } from 'express';
import express from 'express'
import product from '../routes/productRoutes'
import auth from './auth.ts'

export default function (app: Express) {
    app
    .use(express.json())
    .use('/product', product )
    .use('/usuario', auth) 
}