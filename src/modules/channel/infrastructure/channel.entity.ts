import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class ChannelEntity {
  @PrimaryColumn()
  guid: string

  @Column({ type: 'varchar', length: 100 })
  name: string

  @Column({ type: 'boolean', default: true })
  active: boolean
}
