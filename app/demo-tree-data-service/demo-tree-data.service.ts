import { Injectable } from '@angular/core';

import { TreeItemProperties } from '../virtual-tree/tree-item-properties';
import { TreeDataServiceActions } from '../virtual-tree/tree-data-service-actions';

@Injectable()
export class DemoTreeDataService implements TreeDataServiceActions {
    getTreeData(): TreeItemProperties[] {
        return this.generateTreeData();
    }

    getExpandedItemIds(): string[] {
        return ["id1", "id1_0"];
    }
    
    getSelectedItemIds(): string[] {
        return ["id1_0_1", "id1_0_2"];
    }

    private generateTreeData(): TreeItemProperties[] {
        let rootItems: TreeItemProperties[] = [];

        let root: TreeItemProperties = {
            id: "root",
            caption: "root item",
            type: null,
            level: -1,
            children: []
        }

        for (let itemL0Index = 0; itemL0Index < 50; itemL0Index++) {
            let grandParentItem: TreeItemProperties = {
                id: "id" + itemL0Index,
                type: "file",
                caption: "item " + itemL0Index,
                level: 0,
                children: []
            }
            rootItems.push(grandParentItem);

            for (let itemL1Index = 0; itemL1Index < 10; itemL1Index++) {
                let combinedIndices = itemL0Index + "_" + itemL1Index;
                let parentItem: TreeItemProperties = {
                    id: "id" + combinedIndices,
                    type: "file",
                    caption: "item " + combinedIndices,
                    level: 1,
                    children: []
                }
                grandParentItem.children.push(parentItem);

                for (let itemL2Index = 0; itemL2Index < 10; itemL2Index++) {
                    combinedIndices = itemL0Index + "_" + itemL1Index + "_" + itemL2Index;
                    let dataItem: TreeItemProperties = {
                        id: "id" + combinedIndices,
                        type: "file",
                        caption: "item " + combinedIndices,
                        level: 2,
                        children: []
                    }
                    parentItem.children.push(dataItem);
                }
            }
        }

        return rootItems;
    }
}
