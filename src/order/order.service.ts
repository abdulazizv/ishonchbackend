import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './schemas/order.model';
import { orderSearchDto } from './dto/orderSearch.dto';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order) private orderRepository: typeof Order) {}

  async create(createOrderDto: CreateOrderDto) {
    const order = await this.orderRepository.create(createOrderDto);
    if (!order) {
      throw new HttpException('Id is incorrect', HttpStatus.NOT_FOUND);
    }
    return order;
  }

  async findAll() {
    const allOrder = await this.orderRepository.findAll({
      include: { all: true },
    });
    if (!allOrder) {
      throw new HttpException(
        'Information not found! Maybe Database is empty',
        HttpStatus.NOT_FOUND,
      );
    }
    return allOrder;
  }

  async findOne(id: number) {
    const oneOrder = await this.orderRepository.findOne({
      where: {
        id: +id,
      },
    });
    if (!oneOrder) {
      throw new HttpException('ID is incorrect', HttpStatus.NOT_FOUND);
    }
    return oneOrder;
  }

  async findByDeviceId(orderSearchDto: orderSearchDto): Promise<Order[]> {
    const { deviceId } = orderSearchDto;
    console.log(deviceId)
    const response = await this.orderRepository.findAll({
      where: {
        device_id: deviceId,
      },
      include: {
        all: true,
      },
    });
    if (!response) {
      throw new HttpException('Information not found', HttpStatus.NOT_FOUND);
    }
    return response;
  }
  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const oneOrder = await this.orderRepository.findOne({
      where: {
        id: +id,
      },
    });
    if (!oneOrder) {
      throw new HttpException(
        'ID is incorrect, Information not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return oneOrder;
  }

  async remove(id: number) {
    const removeOrder = await this.orderRepository.findOne({
      where: {
        id: +id,
      },
    });
    await this.orderRepository.destroy({
      where: {
        id: +id,
      },
    });
    return removeOrder.id;
  }
}
