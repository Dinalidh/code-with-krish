import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { Product } from 'src/entity/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }

    async createProduct(createProductDto: CreateProductDto): Promise<Product> {
        const product = this.productRepository.create(createProductDto);
        return this.productRepository.save(product);
    }

    async getProductById(id: number): Promise<Product> {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }

    async getAllProducts(): Promise<Product[]> {
        return this.productRepository.find();
    }

    async validateStock(
        id: number,
        quantity: number,): Promise<{ available: boolean }> {
        const product = await this.getProductById(id);
        return { available: product.quantity >= quantity };
    }

    async reduceStock(
        id: number,
        quantity: number,): Promise<{ available: boolean }> {
        const product = await this.getProductById(id);

        if (product.quantity < quantity) {
            throw new BadRequestException('Insufficient stock');
        }

        product.quantity -= quantity;
        await this.productRepository.save(product);

        return { available: true };
    }

    async updateStock(
        id: number,
        quantity: number
    ): Promise<Product> {

        if (!id || isNaN(quantity)){
            throw new BadRequestException('Invalid prodcu ID or quantity');
        }
        const product = await this.getProductById(id);

        if (product.quantity < quantity) {
            throw new BadRequestException('Insufficient stock');
        }

        product.quantity -= quantity;
        await this.productRepository.save(product);

        return product;
        
    }
}
