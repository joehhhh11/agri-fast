export class CreateWorkEntryDto {
  type: 'PLANTING' | 'HARVESTING';
  paymentType: 'DAILY' | 'PIECEWORK';
  date: Date;
  workerId: number;
  groupId: number;
  plotId: number;
  present?: boolean;
  quantity?: number;
  unit?: string;
}
