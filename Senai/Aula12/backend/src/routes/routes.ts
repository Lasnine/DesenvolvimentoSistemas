import { Express } from 'express';
import express from 'express'
import product from './productRoutes'
import auth from './auth.ts'
import project from './projectRoutes.ts'

export default function (app: Express) {
    app
    .use(express.json())
    .use('/product', product )
    .use('/usuario', auth) 
    .use('/project', project)
}