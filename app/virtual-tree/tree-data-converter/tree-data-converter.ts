import { TreeItemProperties } from '../tree-item-properties';
import { TreeItemData } from '../tree-data/tree-item-data';

export class TreeDataConverter {
    convertTreeData(rootItems: TreeItemProperties[], expandedItemIds: string[], selectedItemIds: string[]): TreeItemData[] {
        let flatData: TreeItemData[] = [];

        let queue: TreeItemProperties[] = rootItems.slice(0);
        let copyOfExpandedItemIds = expandedItemIds.slice(0);
        let copyOfSelectedItemIds = selectedItemIds.slice(0);

        while (queue.length > 0) {
            let firstItem: TreeItemProperties = queue[0];
            
            let hasChildren: boolean = this.hasChildren(firstItem);
            
            let expandedIndex: number = copyOfExpandedItemIds.indexOf(firstItem.id);
            let isExpanded: boolean = expandedIndex >= 0;
            if (isExpanded) {
                copyOfExpandedItemIds[expandedIndex] = null;
            }

            let selectedIndex: number = copyOfSelectedItemIds.indexOf(firstItem.id);
            let isSelected: boolean = selectedIndex >= 0;
            if (isSelected) {
                copyOfSelectedItemIds[selectedIndex] = null;
            }

            let dataItem = this.convertItem(firstItem, hasChildren, isExpanded, isSelected);
            flatData.push(dataItem);
            
            queue = queue.slice(1);
            
            if (hasChildren) {
                queue = firstItem.children.concat(queue);
            }
        }
        
        return flatData;
    }

    private hasChildren(itemProps: TreeItemProperties) {
        return itemProps.children && itemProps.children.length > 0;
    }

    private convertItem(itemProps: TreeItemProperties, hasChildren: boolean, isExpanded: boolean, isSelected: boolean): TreeItemData {
        return {
            index: -1,
            id: itemProps.id,
            caption: itemProps.caption,
            type: itemProps.type,
            level: itemProps.level,
            hasChildren: hasChildren,
            isExpanded: isExpanded,
            isSelected: isSelected
        };
    }

}
