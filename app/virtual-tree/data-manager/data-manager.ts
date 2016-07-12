import { TreeItemData } from '../tree-data/tree-item-data';
import { RenderableTreeData } from '../tree-data/renderable-tree-data';

export class DataManager {
    private cachedItems: TreeItemData[];
    private scrollableItems: TreeItemData[];

    constructor() {
        
        //load the items

        this.cachedItems = this.generateItems();

        this.updateScrollableItems();
    }

    get amountOfCachedItems(): number {
        return this.cachedItems.length;
    }

    get amountOfSelectedItems(): number {
        return this.getSelectedItems().length;
    }

    getDataToRender(indexOfFirstItemToRender: number, amountOfItems: number): RenderableTreeData {
        return {
            amountOfScrollableItems: this.scrollableItems.length,
            items: this.scrollableItems.slice(indexOfFirstItemToRender, indexOfFirstItemToRender + amountOfItems),
            indexOfFirstItemToRender: indexOfFirstItemToRender
        };
    }

    expandData(itemIndex: number, indexOfFirstItemToRender: number, amountOfItems: number): RenderableTreeData {
        let dataItem: TreeItemData = this.scrollableItems[itemIndex];
        dataItem.isExpanded = true;
        this.updateScrollableItems();
        return this.getDataToRender(indexOfFirstItemToRender, amountOfItems);
    }

    collapseData(itemIndex: number, indexOfFirstItemToRender: number, amountOfItems: number): RenderableTreeData {
        let dataItem: TreeItemData = this.scrollableItems[itemIndex];
        dataItem.isExpanded = false;
        this.updateScrollableItems();
        return this.getDataToRender(indexOfFirstItemToRender, amountOfItems);
    }

    selectData(selectedItem: TreeItemData): boolean {
        let dataItem: TreeItemData = this.scrollableItems[selectedItem.index];
        dataItem.isSelected = selectedItem.isSelected;
        return true;
    }

    private generateItems(): TreeItemData[] {
        let items: TreeItemData[] = [];

        for (let itemL0Index = 0; itemL0Index < 50; itemL0Index++) {
            let dataItem: TreeItemData = {
                index: -1,
                id: "id" + itemL0Index,
                type: "file",
                name: "item " + itemL0Index,
                level: 0,
                hasChildren: true,
                isExpanded: false,
                isSelected: false
            }
            items.push(dataItem);

            for (let itemL1Index = 0; itemL1Index < 10; itemL1Index++) {
                let combinedIndices = itemL0Index + "_" + itemL1Index;
                dataItem = {
                    index: -1,
                    id: "id" + combinedIndices,
                    type: "file",
                    name: "item " + combinedIndices,
                    level: 1,
                    hasChildren: true,
                    isExpanded: false,
                    isSelected: false
                }
                items.push(dataItem);

                for (let itemL2Index = 0; itemL2Index < 10; itemL2Index++) {
                    combinedIndices = itemL0Index + "_" + itemL1Index + "_" + itemL2Index;
                    dataItem = {
                        index: -1,
                        id: "id" + combinedIndices,
                        type: "file",
                        name: "item " + combinedIndices,
                        level: 2,
                        hasChildren: false,
                        isExpanded: false,
                        isSelected: false
                    }
                    items.push(dataItem);
                }
            }
        }

        return items;
    }

    private updateScrollableItems() {
        let updatedScrollableItems: TreeItemData[] = [];
        let cachedItemIndex = 0; 
        let scrollableItemIndex = 0; 
        while (cachedItemIndex < this.cachedItems.length) {
            let currentItem = this.cachedItems[cachedItemIndex];
            currentItem.index = scrollableItemIndex;
            scrollableItemIndex++;
            updatedScrollableItems.push(currentItem);

            cachedItemIndex++;
            
            if (currentItem.hasChildren && !currentItem.isExpanded) {
                let currentLevel = currentItem.level;
                while (cachedItemIndex < this.cachedItems.length && this.cachedItems[cachedItemIndex].level > currentLevel) {
                    cachedItemIndex++;
                }
            }
        }

        this.scrollableItems = updatedScrollableItems;
    }
    
    private getSelectedItems(): TreeItemData[] {
        return this.cachedItems.filter(item => item.isSelected);
    }

}


