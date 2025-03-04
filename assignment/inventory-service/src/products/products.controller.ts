import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { Product } from 'src/entity/product.entity';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) { }

    @Post()
    async createProduct(
        @Body() CreateProductDto: CreateProductDto,): Promise<Product> {
        return this.productsService.createProduct(CreateProductDto)
    }

    @Get(':id')
    async getProductById(@Param('id') id: number): Promise<Product> {
        return this.productsService.getProductById(id);
    }

    @Get()
    async getAllProducts(): Promise<Product[]> {
        return this.productsService.getAllProducts();
    }

    @Get(':id/validate')
    async validateStock(
        @Param('id') id: number,
        @Query('quantity') quantity: number,
    ): Promise<{ available: boolean }> {
        return this.productsService.validateStock(id, quantity);
    }

    @Patch(':id/reduce')
    async reduceStock(
        @Param('id') id: number,
        @Query('quantity') quantity: number,
    ): Promise<{ available: boolean }> {
        return this.productsService.reduceStock(id, quantity);
    }

    @Patch(':id/quantity')
    async updateStock(
        @Param('id') id: number,
        @Query('quantity') quantity: number,
    ): Promise< Product > {
      
        return this.productsService.updateStock(id, quantity);
    }



}
