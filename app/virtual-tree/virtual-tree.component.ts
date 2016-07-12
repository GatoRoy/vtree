import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { DataManager } from './data-manager/data-manager';
import { TreeItemData } from './tree-data/tree-item-data';
import { RenderableTreeData } from './tree-data/renderable-tree-data';
import { TreeViewComponent } from './tree-view/tree-view.component';

@Component({
    selector: 'vtree',
    templateUrl: 'app/virtual-tree/virtual-tree.component.html',
    styleUrls: ['app/virtual-tree/virtual-tree.component.css'],
    directives: [TreeViewComponent],
    providers: []
})
export class VirtualTreeComponent implements OnInit {
    @Input() itemHeight: number;
    @Input() itemIndentationSize: number;

    @ViewChild("vTreeView") vTreeView: TreeViewComponent;

    private dataManager: DataManager;
    private dataToRender: RenderableTreeData;
    
    constructor() {
        this.dataManager = new DataManager();
    }

    get amountOfAllItems(): number {
        return this.dataManager.amountOfCachedItems;
    }

    get amountOfSelectedItems(): number {
        return this.dataManager.amountOfSelectedItems;
    }

    get amountOfShownItems(): number {
        return this.dataToRender.amountOfScrollableItems;
    }

    ngOnInit() {
        this.scrollToItem(0);
    }

    private scrollToItem(itemIndex: number) {
        let amountOfItemsToRender: number = this.vTreeView.amountOfItemsToRender;
        this.dataToRender = this.dataManager.getDataToRender(itemIndex, amountOfItemsToRender);
    }

    private expandTreeItem(treeData: RenderableTreeData) {
        let amountOfItemsToRender: number = this.vTreeView.amountOfItemsToRender;
        let clickedItem: TreeItemData = treeData.items[0];
        this.dataToRender = this.dataManager.expandData(clickedItem.index, treeData.indexOfFirstItemToRender, amountOfItemsToRender);
    }

    private collapseTreeItem(treeData: RenderableTreeData) {
        let amountOfItemsToRender: number = this.vTreeView.amountOfItemsToRender;
        let clickedItem: TreeItemData = treeData.items[0];
        this.dataToRender = this.dataManager.collapseData(clickedItem.index, treeData.indexOfFirstItemToRender, amountOfItemsToRender);
    }

    private selectTreeItem(dataItem: TreeItemData) {
        let isSuccess = this.dataManager.selectData(dataItem);
        
        let itemString: string = `[ id=${dataItem.id}, name=${dataItem.name} ]`;
        let message: string = isSuccess
            ? `${itemString} was ${dataItem.isSelected ? "selected" : "not selected"}`
            : "Failed to change the selection for item: " + itemString;
        console.log(message);
    }

}


