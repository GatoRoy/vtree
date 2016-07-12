import { TreeItemProperties } from './tree-item-properties';

export interface TreeDataServiceActions {
    getTreeData(): TreeItemProperties[];

    getExpandedItemIds(): string[];
    
    getSelectedItemIds(): string[];
}
