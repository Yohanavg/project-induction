
import { Stats } from './stats.interface';

export interface StatsRepositoryInterface {
  create(stats: Stats): Promise<Stats>;
}
