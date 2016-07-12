import { TreeItemData } from './tree-item-data';

export interface RenderableTreeData {
    items: TreeItemData[];
    amountOfScrollableItems?: number; 
    indexOfFirstItemToRender: number;
}


