import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Order } from './schemas/order.model';
import { adminGuard } from 'src/guards/admin.guard';
import { orderSearchDto } from "./dto/orderSearch.dto";

@Controller('api/v2/order')
@ApiTags('Order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: "Order qo'shish" })
  @ApiResponse({ status: 201, type: Order })
  @ApiBearerAuth()
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @ApiOperation({ summary: 'Orderlarni olish' })
  @ApiResponse({ status: 200, type: [Order] })
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @ApiOperation({ summary: 'Orderni olish' })
  @ApiResponse({ status: 200, type: Order })
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @ApiOperation({ summary: 'Orderlarni deviceId orqali olish' })
  @ApiResponse({ status: 200, type: Order })
  @Post('device')
  findByDeviceId(@Body() orderSearchDto: orderSearchDto): Promise<Order[]> {
    console.log(orderSearchDto);
    return this.orderService.findByDeviceId(orderSearchDto);
  }

  @ApiOperation({ summary: 'Orderni update qilish' })
  @ApiResponse({ status: 200, type: Order })
  @ApiBearerAuth()
  @Put(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @ApiOperation({ summary: 'Orderni delete qilish' })
  @ApiResponse({ status: 202, type: Number })
  @ApiBearerAuth()
  @UseGuards(adminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
