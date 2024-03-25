import { GroupItem } from './group-list.interface';
import { Student } from './student.interface';

export interface CartItem {
  student: Student;
  group: GroupItem;
  group_price: number;
}
