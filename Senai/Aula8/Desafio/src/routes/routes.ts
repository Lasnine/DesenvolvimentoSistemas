import { Express } from 'express';
import express from 'express'
import product from '../routes/productRoutes'

export default function (app: Express) {
    app
    .use(express.json())
    .use('/product', product ) 
}