export interface IEntity<Properties, PropertiesUpdate> {
  // Definiciones genéricas para las entidades
  // Utilizaremos tipos genéricos Properties y PropertiesUpdate para que sean utilizadas independiente de la entidad
  properties: () => Properties
  delete: () => void
  update: (fields: PropertiesUpdate) => void
}
  