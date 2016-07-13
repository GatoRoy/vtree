import { TreeDataServiceActions } from '../tree-data-service-actions';
import { TreeDataConverter } from '../tree-data-converter/tree-data-converter';
import { TreeItemData } from '../tree-data/tree-item-data';
import { RenderableTreeData } from '../tree-data/renderable-tree-data';

export class TreeDataManager {
    private dataConverter: TreeDataConverter;
    private cachedItems: TreeItemData[];
    private scrollableItems: TreeItemData[];

    constructor(private dataService: TreeDataServiceActions, private isAutoSelect: boolean) {
        this.dataConverter = new TreeDataConverter();
        
        let treeData = this.dataService.getTreeData();
        let expandedItemIds = this.dataService.getExpandedItemIds();
        let selectedItemIds = this.dataService.getSelectedItemIds();

        this.cachedItems = this.dataConverter.convertTreeData(treeData, expandedItemIds, selectedItemIds);

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
        if (this.isAutoSelect) {
            let itemIndex: number = this.cachedItems.indexOf(selectedItem);
            itemIndex++;
            let childItem: TreeItemData = this.cachedItems[itemIndex];
            while (itemIndex < this.cachedItems.length && childItem.level > selectedItem.level) {
                childItem.isSelected = selectedItem.isSelected;
                itemIndex++;
                childItem = this.cachedItems[itemIndex];
            }
        }
        return true;
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


