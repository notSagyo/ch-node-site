import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ejsDefaultData } from 'src/config/ejs';
import { productsViewDir } from 'src/utils/paths';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

// Views =====================================================================//
@ApiTags('views')
@Controller('products')
export class ProductControllerViews {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiResponse({ description: 'Renders products view' })
  async getProductsPage(@Res() res: Response) {
    const products = await this.productService.getAllProducts();
    res.render(productsViewDir, {
      ...ejsDefaultData,
      productList: products,
    });
  }
}

// API =======================================================================//
@ApiTags('products')
@Controller('api/products')
export class ProductsControllerApi {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Post()
  postProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productService.getProductById(id);
  }

  @Put(':id')
  putProductById(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProductById(id, updateProductDto);
  }

  @Delete()
  async deleteAllProducts() {
    this.productService.deleteAllProducts();
  }

  @Delete(':id')
  deleteProductById(@Param('id') id: string) {
    return this.productService.deleteProductById(id);
  }
}
