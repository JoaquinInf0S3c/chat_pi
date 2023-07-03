import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class MessageEntity {
  @PrimaryColumn()
  guid: string

  @Column({ type: 'varchar', length: 255 })
  content: string

  @Column({ type: 'varchar', length: 100 })
  sender: string

  @Column({ type: 'varchar', length: 100 })
  receiver: string

  @Column({ type: 'boolean', default: true })
  active: boolean

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date
}
