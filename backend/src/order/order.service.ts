import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderEntity } from "./order.entity";
import { EventEntity } from '../event/event.entity';
import { User } from '../user/user.entity';
import { Ticket } from '../ticket/ticket.entity';
import { CreateOrderDto } from './DTO/create-order.input';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  async findByUser(userId: number): Promise<OrderEntity[]> {
    return this.orderRepository.find({
      where: { userId },
      relations: ["event"],
    });
  }

  async create(data: CreateOrderDto): Promise<OrderEntity> {
    return await this.orderRepository.manager.transaction(async (transactionalEntityManager) => {
      const user = await transactionalEntityManager.findOneByOrFail(User, { id: data.userId });
      const event = await transactionalEntityManager
        .createQueryBuilder(EventEntity, 'event')
        .setLock('pessimistic_write')
        .where('event.id = :id', { id: data.eventId })
        .getOneOrFail();

      if (event.ticketsSold + data.numberOfTickets > event.ticketLimit) {
        const ticketsLeft = event.ticketLimit - event.ticketsSold;
        throw new BadRequestException(`Failed to complete order, remaining ${ticketsLeft} tickets`)
      }

      event.ticketsSold += data.numberOfTickets;
      const order = await transactionalEntityManager.save(OrderEntity, {
        eventId: event.id,
        userId: user.id,
        cost: 250,
        numberOfTickets: data.numberOfTickets,
      });

      const query = `
          WITH series AS (
              SELECT generate_series(1, $1) AS repeat_count  -- $1 is the number of repetitions
          )
          INSERT INTO ticket ("userId", "orderId", "eventId")
          SELECT $2, $3, $4
          FROM series;
        `;

      await transactionalEntityManager.query(query, [data.numberOfTickets, user.id, order.id, event.id]);

      await transactionalEntityManager.save(EventEntity, event);
      return order;
    });
  }
}