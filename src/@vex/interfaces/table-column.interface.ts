export interface TableColumn<T> {
  label: string;
  property: keyof T | string;
  type: 'boolean'|'input'|'cost'|'radio'|'dho'|'dhd'|'TypeStr'|'Trip'|'enum1'|'index'|'enum2'|'text' | 'timer'|'image' | 'badge' | 'progress' | 'checkbox' | 'button' | 'array' | 'array1' | 'array2' | 'array3' | 'array4' | 'array5' | 'array6' | 'object' | 'role' | 'phone' | 'date' |'isActive';
  visible?: boolean;
  cssClasses?: string[];
}
