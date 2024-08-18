import { Column, Entity } from 'typeorm';
import { Base } from '../../utils/base';

@Entity()
export class User extends Base {
  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;
}
