import { IEntity } from '../../shared/entity.interface'

interface ChannelRequired {
  name: string
}

interface ChannelOptional {
  active: boolean
  readonly guid: string
}

export interface ChannelUpdate {
  name: string
}

export type ChannelProperties = Required<ChannelRequired> & Partial<ChannelOptional>

export default class Channel implements IEntity<ChannelProperties, ChannelUpdate> {
  private name: string
  private active: boolean
  private readonly guid: string

  constructor(channelProperties: ChannelProperties) {
    this.active = true
    Object.assign(this, channelProperties)
  }

  properties(): ChannelProperties {
    return {
      name: this.name,
      active: this.active,
      guid: this.guid,
    }
  }

  update(fields: ChannelUpdate) {
    Object.assign(this, fields)
  }

  delete() {
    this.active = false
  }
}
