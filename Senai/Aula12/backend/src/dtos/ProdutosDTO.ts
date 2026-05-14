export interface registerProductDTO{
    name: string
    description: string
    price: number
    stock: boolean
    category: string
}

export interface getProductDTO{
    name: string
}

export interface getIDProductDTO{
    id: string
}

export interface deleteProductDTO{
    id: string
}